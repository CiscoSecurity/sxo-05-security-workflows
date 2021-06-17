var rowIndex = 1;

function buildRow(rowType, col1, col2, moreInfo = '') {
	rowIndex++;

	var icons = {
		'success': 'check',
		'info': 'info',
		'error': 'times',
		'warning': 'exclamation-triangle'
	};

	var moreInfo = (moreInfo.length > 0 ? ' <div id="more-info-' + rowIndex + '" class="more-info">' + moreInfo + '</div>' : '');
	var moreInfoIcon = (moreInfo.length > 0 ? ' <small><a class="more-info-toggle" data-index="' + rowIndex + '">(details)</a></small>' : '');

	return '<tr><td class="item-row">' + col1 + '</td><td class="analyzer-row ' + (rowType.length > 0 ? rowType : '') + '">' + (rowType.length > 0 ? '<i class="fa fa-fw fa-' + icons[rowType] + ' mr-1"></i> ' : '') + col2 + moreInfoIcon + moreInfo + '</td></tr>';
}

function analyzeWorkflow(workflowJson) {
	var workflow = '';
	var lineCount = 0;
	var charCount = 0;
	var actionCount = 0;
	var actionTypes = [];

	var response = {
		'summary': {
			'info': 0,
			'success': 0,
			'warning': 0,
			'error': 0
		},
		'details': {
			'properties': [],
			'variables': [],
			'triggers': [],
			'targets': [],
			'account-keys': [],
			'schedules': [],
			'calendars': [],
			'activities': [],
			'atomics': [],
			'fun': []
		}
	};

	// Attempt to read/parse the JSON
	try {
		workflow = JSON.parse(workflowJson);
	}
	catch (e) {
		return { 'success': false, 'response': 'Failed to parse the input provided. Are you sure you copied the complete JSON for your workflow or atomic action?' };
	}

	lineCount = workflowJson.split("\n").length;
	charCount = workflowJson.length;
	workflowJson = null;

	// Check if this is an atomic action or normal workflow
	var isAtomic = workflow['workflow']['properties']['atomic']['is_atomic'];

	// Check the workflow properties
	response['details']['properties'].push({ 'type': '', 'title': 'Workflow Name', 'description': workflow['workflow']['properties']['display_name'], 'moreInfo': '' });
	response['details']['properties'].push({ 'type': '', 'title': 'Definition Type', 'description': (isAtomic ? 'Atomic Action' : 'Workflow'), 'moreInfo': '' });

	// Check for categories
	if ('categories' in workflow && workflow['categories'] != null) {
		var categories = [];

		for (var category in workflow['categories']) {
			categories.push(workflow['categories'][category]['name']);
		}

		if (categories.length == 0) {
			response['details']['properties'].push({ 'type': '', 'title': 'Categories', 'description': 'This workflow doesn\'t have any categories', 'moreInfo': '' });
		}
		else {
			response['details']['properties'].push({ 'type': '', 'title': 'Categories', 'description': categories.join(', '), 'moreInfo': '' });
		}
	}
	else {
		response['details']['properties'].push({ 'type': '', 'title': 'Categories', 'description': 'This workflow doesn\'t have any categories', 'moreInfo': '' });
	}

	// Check for a description
	if ('description' in workflow['workflow']['properties'] && workflow['workflow']['properties']['description'].length > 10) {
		response['details']['properties'].push({ 'type': 'success', 'title': 'Description', 'description': 'Passed', 'moreInfo': '' });
	}
	else {
		response['details']['properties'].push({ 'type': 'error', 'title': 'Description', 'description': 'Description missing', 'moreInfo': 'All workflows and atomic actions should have a meaningful description' });
	}

	// Make sure the workflow isn't set to self destruct
	if (!workflow['workflow']['properties']['delete_workflow_instance']) {
		response['details']['properties'].push({ 'type': 'success', 'title': 'Workflow Instance Cleanup', 'description': 'Passed', 'moreInfo': '"Clean up after successful execution" is not checked (which is what we typically recommend)' });
	}
	else {
		response['details']['properties'].push({ 'type': 'warning', 'title': 'Workflow Instance Cleanup', 'description': 'Clean up enabled', 'moreInfo': 'If you check "Clean up after successful execution", your workflow or atomic action\'s instances will be deleted if they\'re successful. This means you won\'t be able to view them for debugging purposes' });
	}

	// Special conditions for atomic actions
	if (isAtomic) {
		// Target configuration
		if ('no_target' in workflow['workflow']['properties']['target'] && workflow['workflow']['properties']['target']['no_target']) {
			response['details']['properties'].push({ 'type': 'info', 'title': 'Target', 'description': 'No target specified', 'moreInfo': 'Not having a target is ok for an atomic action if it doesn\'t need to communicate with anything' });
		}
		else {
			if ('specify_on_workflow_start' in workflow['workflow']['properties']['target'] && workflow['workflow']['properties']['target']['specify_on_workflow_start']) {
				response['details']['properties'].push({ 'type': 'success', 'title': 'Target', 'description': 'Passed', 'moreInfo': 'The target for the atomic will be provided by the parent workflow calling it' });
			}
			else {
				response['details']['properties'].push({ 'type': 'error', 'title': 'Target', 'description': 'Failed', 'moreInfo': 'All atomic actions should have their target set to "Specify Target On Workflow Start". This allows the atomic to be more portable since the workflow using it can specify the target' });
			}
		}

		// Account key configuration
		if ('target_default' in workflow['workflow']['properties']['runtime_user'] && workflow['workflow']['properties']['runtime_user']['target_default']) {
			response['details']['properties'].push({ 'type': 'success', 'title': 'Account Key', 'description': 'Passed', 'moreInfo': 'The default account key for whatever target the parent workflow provides at runtime will be used' });
		}
		else {
			response['details']['properties'].push({ 'type': 'error', 'title': 'Account Key', 'description': 'Failed', 'moreInfo': 'All atomic actions should have their account key set to "Use Target\'s Default Account Keys". This allows the atomic to inherit whatever account key is associated with the target provided by the parent workflow' });
		}
	}
	// Conditions for normal workflows
	else {
		// Target configuration
		if ('no_target' in workflow['workflow']['properties']['target'] && workflow['workflow']['properties']['target']['no_target']) {
			response['details']['properties'].push({ 'type': 'info', 'title': 'Target', 'description': 'No target specified', 'moreInfo': 'Not having a target is ok for a workflow if it doesn\'t need to communicate with anything' });
		}
		else {
			// Make sure a target group is being used
			if ('execute_on_target_group' in workflow['workflow']['properties']['target'] && workflow['workflow']['properties']['target']['execute_on_target_group']) {
				response['details']['properties'].push({ 'type': 'success', 'title': 'Target', 'description': 'Passed', 'moreInfo': 'Your workflow is configured to use a target group (which is what we recommend for workflow portability)' });

				// Check if the Default TargetGroup is selected
				if (workflow['workflow']['properties']['target']['target_group']['target_group_id'] == 'target_group_01EJ0TQWPQWBD0qiWqClJKj9FOzwiZRfOFH') {
					response['details']['properties'].push({ 'type': 'success', 'title': 'Target Group', 'description': 'Passed', 'moreInfo': 'Using the "Default TargetGroup" is best since you can generally assume everyone has it' });
				}
				else {
					response['details']['properties'].push({ 'type': 'warning', 'title': 'Target Group', 'description': 'Warning', 'moreInfo': 'We recommend using the "Default TargetGroup" since every SecureX orchestration tenant should have it by default. If you use your own target group, it will be created during workflow import' });
				}

				// Check if run on all targets is selected
				if (!workflow['workflow']['properties']['target']['target_group']['run_on_all_targets']) {
					response['details']['properties'].push({ 'type': 'success', 'title': 'Target Group "Run On"', 'description': 'Passed', 'moreInfo': 'Being specific with targets is usually best which is why we don\'t recommend using this option' });
				}
				else {
					response['details']['properties'].push({ 'type': 'error', 'title': 'Target Group "Run On"', 'description': 'Failed', 'moreInfo': 'We do not recommend checking "All Targets in this Group" as it limits your ability to define target selection criteria' });
				}

				// Check if choose first with matching criteria is selected
				if (workflow['workflow']['properties']['target']['target_group']['use_criteria']['choose_target_using_algorithm'] == 'choose_first_with_matching_criteria') {
					response['details']['properties'].push({ 'type': 'success', 'title': 'Target Group Criteria', 'description': 'Passed', 'moreInfo': '"Choose first with matching criteria" is selected (which is what we recommend)' });
				}
				else {
					response['details']['properties'].push({ 'type': 'warning', 'title': 'Target Group Critera', 'description': 'Warning', 'moreInfo': 'This should be "Choose first with matching critera" unless you want the workflow to execute once for each matching target in the group' });
				}

				// Make sure there is criteria for the target selection
				if (workflow['workflow']['properties']['target']['target_group']['use_criteria']['conditions'].length > 0) {
					// Check if the operator for the criteria is "eqi"
					if (workflow['workflow']['properties']['target']['target_group']['use_criteria']['conditions'][0]['operator'] == 'eqi') {
						response['details']['properties'].push({ 'type': 'success', 'title': 'Target Group Criteria Operator', 'description': 'Passed', 'moreInfo': 'The most common criteria selection operator is "Equals Case-Insensitive"' });
					}
					else {
						response['details']['properties'].push({ 'type': 'warning', 'title': 'Target Group Criteria Operator', 'description': 'Warning', 'moreInfo': 'This is typically "Equals Case-Insensitive" but other operators are fine if you\'re doing something specific' });
					}
				}
				else {
					response['details']['properties'].push({ 'type': 'warning', 'title': 'Target Group Criteria', 'description': 'Warning', 'moreInfo': 'There isn\'t any target group criteria. This will cause issues with workflow operation' });
				}
			}
			else {
				response['details']['properties'].push({ 'type': 'error', 'title': 'Target', 'description': 'Failed', 'moreInfo': 'Workflows that are meant to be shared and require targets should use a Target Group. More information about target groups can be found <a href="{{ site.baseurl }}/targets/groups">here</a>' });
			}
		}
	}

	// Check for global variables
	if ('variables' in workflow && workflow['variables'] != null) {
		response['details']['variables'].push({ 'type': 'error', 'title': 'Global Variables', 'description': 'Failed', 'moreInfo': 'Global variables should not be used in workflows or atomic actions meant to be shared. Instead, use a "Set Variables" activity to copy global variables to local variables within the workflow. Before exporting, simply remove the global variables so the other user can select their own' });
	}
	else {
		response['details']['variables'].push({ 'type': 'success', 'title': 'Global Variables', 'description': 'Passed', 'moreInfo': 'The workflow does not appear to be using any global variables' });
	}

	// Check for custom table types
	if ('table_types' in workflow && workflow['table_types'] != null) {
		response['details']['variables'].push({ 'type': 'error', 'title': 'Custom Table Types', 'description': 'Failed', 'moreInfo': 'We do not recommend using tables to pass data between objects as they\'re inefficient and don\'t always scale well. It\'s better to exchange JSON instead' });
	}
	else {
		response['details']['variables'].push({ 'type': 'success', 'title': 'Custom Table Types', 'description': 'Passed', 'moreInfo': 'The workflow does not appear to be using any custom table types' });
	}

	// Check the workflow's input/output/local/static variables
	if ('variables' in workflow['workflow'] && workflow['workflow']['variables'] != null && workflow['workflow']['variables'].length > 0) {
		workflow['workflow']['variables'].forEach(variable => {
			// If the variable is a secure string, check if it has a default value
			if (variable['properties']['type'] == 'datatype.secure_string' && variable['properties']['value'].length != 0)
				response['details']['variables'].push({ 'type': 'warning', 'title': variable['properties']['name'] + '<br /><small>' + variable['properties']['type'] + '</small>', 'description': 'Warning', 'moreInfo': 'If a Secure String variable has a value when exported, it will prompt the user for its value during import. If you want to avoid this, clear the Secure String\'s value before exporting the workflow' });

			// Make sure the variable has a description
			if (!('description' in variable['properties']) || variable['properties']['description'].length == 0)
				response['details']['variables'].push({ 'type': 'warning', 'title': variable['properties']['name'] + '<br /><small>' + variable['properties']['type'] + '</small>', 'description': 'No description', 'moreInfo': 'All variables should have a meaningful description to help the end user understand its purpose and, if a value needs to be provided, where the user should get it' });
		});
	}

	if ('triggers' in workflow && workflow['triggers'] != null) {
		var triggers = [];

		for (var trigger in workflow['triggers']) {
			triggers.push(workflow['triggers'][trigger]['name'] + ' (' + workflow['triggers'][trigger]['type'] + ')');
		}

		if (triggers.length == 0) {
			response['details']['triggers'].push({ 'type': '', 'title': 'Triggers', 'description': 'This workflow doesn\'t have any triggers', 'moreInfo': '' });
		}
		else {
			response['details']['triggers'].push({ 'type': '', 'title': 'Triggers', 'description': triggers.join(', '), 'moreInfo': '' });
		}
	}
	else {
		response['details']['triggers'].push({ 'type': '', 'title': 'Triggers', 'description': 'This workflow doesn\'t have any triggers', 'moreInfo': '' });
	}

	// Check for embedded targets
	if ('targets' in workflow && workflow['targets'] != null) {
		response['details']['targets'].push({ 'type': 'error', 'title': 'Targets', 'description': 'Failed', 'moreInfo': 'Workflows should not have any hard-coded targets' });
	}
	else {
		response['details']['targets'].push({ 'type': 'success', 'title': 'Targets', 'description': 'Passed', 'moreInfo': 'The workflow does not appear to have any targets embedded in it' });
	}

	// Check for embedded account keys
	if ('runtime_users' in workflow && workflow['runtime_users'] != null) {
		response['details']['account-keys'].push({ 'type': 'error', 'title': 'Account Keys', 'description': 'Failed (there should not be any hard-coded account keys)', 'moreInfo': '' });
	}
	else {
		response['details']['account-keys'].push({ 'type': 'success', 'title': 'Account Keys', 'description': 'Passed', 'moreInfo': 'The workflow does not appear to have any account keys embedded in it' });
	}

	// Check for embedded target groups
	if ('target_groups' in workflow && workflow['target_groups'] != null) {
		for (var group in workflow['target_groups']) {
			workflow['target_groups'][group]['targets'].forEach(target => {
				// Make sure the target group doesn't have any manually added targets
				if ('selected_target_ids' in target && target['selected_target_ids'].length > 0)
					response['details']['targets'].push({ 'type': 'warning', 'title': 'Target Group<br /><small>' + workflow['target_groups'][group]['name'] + '</small>', 'description': 'Should not contain manually selected targets', 'moreInfo': 'In the target group configuration, you probably added a specific target manually. We don\'t recommend doing this unless you have a specific use case and suggest you consider using target group criteria instead' });

				// Check for non-standard target types if using Default TargetGroup
				if (group == 'target_group_01EJ0TQWPQWBD0qiWqClJKj9FOzwiZRfOFH' && !['web-service.endpoint', 'email.smtp_endpoint'].includes(target['data_target_type']))
					response['details']['targets'].push({ 'type': 'warning', 'title': 'Target Group<br /><small>' + workflow['target_groups'][group]['name'] + '</small>', 'description': 'Non-default target type (' + target['data_target_type'] + ')', 'moreInfo': 'By default, the Default TargetGroup doesn\'t contain target types besides HTTP Endpoint and SMTP Endpoint. If you need additional target types for your workflow, the end user may need to add them to the target group configuration before running the workflow' });
			});
		}
	}

	// Check for embedded schedules
	if ('schedules' in workflow && workflow['schedules'] != null) {
		response['details']['schedules'].push({ 'type': '', 'title': 'Schedules', 'description': 'This workflow contains ' + Object.keys(workflow['schedules']).length + ' schedule(s)', 'moreInfo': '' });
	}
	else {
		response['details']['schedules'].push({ 'type': '', 'title': 'Schedules', 'description': 'No schedules were found in this workflow', 'moreInfo': '' });
	}

	// Check for embedded calendars
	if ('calendars' in workflow && workflow['calendars'] != null) {
		var systemCalendars = ['calendar_recurring_1BMfMVuAObCmHIsuW7x3IDSg7Ex',
			'calendar_recurring_1BMfMWvgiDhSjBQ7hTSyvz3NyVZ', 'calendar_recurring_1BMfMW5GeLXecZJo0Q2KrjwQQIv', 'calendar_recurring_1BMfMeHT9BLcMorjZ6d827zXeaV',
			'calendar_recurring_1BMfMcNhIKsalUwsjCDmSfUnmXW', 'calendar_recurring_1BMfMfZOtVKaTB6BaLDrNQK52Fc', 'calendar_recurring_1BMfMd3fofpISGMRps4BWyiLLLF',
			'calendar_recurring_1BMfMhDJAkJOyFHVPdAlXhGhG4r', 'calendar_recurring_1BMfMqhskK5gwxWWa4onJC9Zr85', 'calendar_recurring_1BMfMjHOpvnqfcYuwbNrCaNw9VG',
			'calendar_recurring_1BMfMkExf4yIRuj23K0kmAAPc6T', 'calendar_recurring_1BMfMpqnrsC6VJEyYW4URsw7LBb', 'calendar_recurring_1BMfMm9xzHRuS6K7B48zgAz9JZX',
			'calendar_recurring_1BMfMth9lq7gy3wE8OW10vuzhPw', 'calendar_recurring_1BMfMr25ZvcGOTMtbZwzH46TxaH', 'calendar_recurring_1BMfMwZ4tmMYLJBxY4PFZf0e377',
			'calendar_recurring_1BMfMviA3g4f1iDN74e6ytY2iuI', 'calendar_datelist_1BMfMrFF1Br99a6ow9x1ZyhMnK4', 'calendar_datelist_1BMfMrejiPkeY95fLvoFCuKaPLq',
			'calendar_group_1BMfN3vifXosz1cwBFXN6N7yQge', 'calendar_group_1BMfN6Cjp6x5yy0NdCh9PJC9KGo'];

		for (var calendar in workflow['calendars']) {
			if (calendar['unique_name'] in systemCalendars) {
				response['details']['calendars'].push({ 'type': 'info', 'title': 'Calendars', 'description': 'This workflow is using one of the default calendars', 'moreInfo': '' });
			}
			else {
				response['details']['calendars'].push({ 'type': 'warning', 'title': 'Calendars', 'description': 'Warning', 'moreInfo': 'We don\'t typically recommend using a custom calendar unless you have a specific reason to. It\'s better to use one of the default calendars if possible' });
			}
		}
	}
	else {
		response['details']['calendars'].push({ 'type': '', 'title': 'Calendars', 'description': 'No calendars were found in this workflow', 'moreInfo': '' });
	}

	// Placeholder for atomic action info
	var atomicActions = [];

	function checkActions(actions) {
		actions.forEach(action => {
			actionCount++;
			if (action['type'] == 'workflow.atomic_workflow' && !actionTypes.includes(action['properties']['workflow_id'])) {
				actionTypes.push(action['properties']['workflow_id']);
			}
			else if (!actionTypes.includes(action['type'])) {
				actionTypes.push(action['type']);
			}

			// Build a display name for the activity
			var displayName = action['properties']['display_name'] + '<br /><small>' + action['type'] + '</small>';

			// Check for atomics and subworkflows
			if (action['type'] == 'workflow.atomic_workflow') {
				atomicActions[action['properties']['workflow_id']] = action['name'];
			} else if (action['type'] == 'workflow.sub_workflow') {
				response['details']['activities'].push({ 'type': 'warning', 'title': displayName, 'description': 'We do not recommend using subworkflows as they complicate the import/export process. You may want to consider using some atomic actions instead depending on what your subworkflow does', 'moreInfo': '' });
			}

			// Check if the activity is being skipped
			if (action['properties']['skip_execution'])
				response['details']['activities'].push({ 'type': 'info', 'title': displayName, 'description': '"Skip Activity Execution" is checked', 'moreInfo': 'Skipping execution for an activity means the activity will not run at all' });

			// Special handling for web requests
			if (action['type'] == 'web-service.http_request') {
				if (action['properties']['continue_on_failure'])
					response['details']['activities'].push({ 'type': 'warning', 'title': displayName, 'description': '"Continue Workflow Execution on Failure" is checked', 'moreInfo': 'You probably want "Continue on HTTP error status code" instead' });

				if (!action['properties']['continue_on_error_status_code'])
					response['details']['activities'].push({ 'type': 'warning', 'title': displayName, 'description': '"Continue on HTTP error status code" is not checked', 'moreInfo': 'You should check this and use a Condition Block to handle HTTP error codes' });
			}
			// Special handling for JSON path query
			else if (action['type'] == 'corejava.jsonpathquery') {
				if (!action['properties']['continue_on_failure']) {
					response['details']['activities'].push({ 'type': 'warning', 'title': displayName, 'description': '"Continue Workflow Execution on Failure" is not checked', 'moreInfo': 'If the JSON path query you look for isn\'t found, the activity will fail and your workflow will fail with it. If you want to avoid this, you can check continue on failure and use a Condition Block to check if the path query was successful' });
				}
				else {
					response['details']['activities'].push({ 'type': 'info', 'title': displayName, 'description': '"Continue Workflow Execution on Failure" is checked', 'moreInfo': 'Setting continue workflow execution on failure means the workflow will continue running even if this activity fails. It\'s ok to use this if you\'re using a Condition Block to do some error handling' });
				}
			}
			else {
				if (action['properties']['continue_on_failure'])
					response['details']['activities'].push({ 'type': 'info', 'title': displayName, 'description': '"Continue Workflow Execution on Failure" is checked', 'moreInfo': 'Setting continue workflow execution on failure means the workflow will continue running even if this activity fails. It\'s ok to use this if you\'re using a Condition Block to do some error handling' });
			}

			// Target Configuration
			if ('target' in action['properties']) {
				if (isAtomic) {
					if (!action['properties']['target']['use_workflow_target'])
						response['details']['activities'].push({ 'type': 'warning', 'title': displayName, 'description': 'Should be "Use Workflow Target"', 'moreInfo': 'All activities in an atomic action that use a target should be set to "Use Workflow Target"' });
				}
				else {
					if (!('override_workflow_target_group_criteria' in action['properties']['target']) && !('use_workflow_target_group' in action['properties']['target'])) {
						response['details']['activities'].push({ 'type': 'warning', 'title': displayName, 'description': 'Target Configuration', 'moreInfo': 'Should be "Use Workflow Target Group" or "Override Workflow Target Group Criteria"' });
					}
					else {
						if (('override_workflow_target_group_criteria' in action['properties']['target'] && !action['properties']['target']['override_workflow_target_group_criteria']) || ('use_workflow_target_group' in action['properties']['target'] && !action['properties']['target']['use_workflow_target_group']))
							response['details']['activities'].push({ 'type': 'warning', 'title': displayName, 'description': 'Target Configuration', 'moreInfo': 'Should be "Use Workflow Target Group" or "Override Workflow Target Group Criteria"' });
					}
				}
			}

			// Account Key Configuration
			if ('runtime_user' in action['properties']) {
				if (!('target_default' in action['properties']['runtime_user']) || !action['properties']['runtime_user']['target_default'])
					response['details']['activities'].push({ 'type': 'warning', 'title': displayName, 'description': 'Account Key Configuration', 'moreInfo': 'Most activities should have their account key set to "Use Target\'s Default Account Keys." It\'s uncommon that a target\'s account keys should be overriden' });
			}

			// Handle nested objects
			if ('blocks' in action && action['blocks'] != null && action['blocks'].length > 0)
				checkActions(action['blocks']);

			if ('actions' in action && action['actions'] != null && action['actions'].length > 0)
				checkActions(action['actions']);
		});
	}

	// Parse all of the workflow's actions
	if ('actions' in workflow['workflow']) {
		checkActions(workflow['workflow']['actions']);
	}
	else {
		response['details']['activities'].push({ 'type': 'info', 'title': 'No Activities Found', 'description': 'N/A', 'moreInfo': '' });
	}

	// Check if the workflow is using any atomics
	if ('atomic_workflows' in workflow && workflow['atomic_workflows'].length > 0) {
		workflow['atomic_workflows'].forEach(atomic => {
			// Check if the atomic was an activity found previously
			if (atomic in atomicActions) {
				response['details']['atomics'].push({ 'type': 'info', 'title': atomicActions[atomic], 'description': 'Resolved', 'moreInfo': '' });
			}
			else {
				response['details']['atomics'].push({ 'type': 'error', 'title': atomic, 'description': 'Failed to Resolve', 'moreInfo': '' });
			}
		});
	}
	else {
		response['details']['atomics'].push({ 'type': 'info', 'title': 'No Atomic Actions Found', 'description': 'N/A', 'moreInfo': '' });
	}

	response['details']['fun'].push({ 'type': 'info', 'title': 'Total Number of Lines', 'description': lineCount.toLocaleString(), 'moreInfo': '' });
	response['details']['fun'].push({ 'type': 'info', 'title': 'Total Number of Characters', 'description': charCount.toLocaleString(), 'moreInfo': '' });
	response['details']['fun'].push({ 'type': 'info', 'title': 'Total Number of Activities', 'description': actionCount.toLocaleString(), 'moreInfo': '' });
	response['details']['fun'].push({ 'type': 'info', 'title': 'Number of Distinct Activities', 'description': (actionTypes.length).toLocaleString(), 'moreInfo': '' });

	// Clean up
	workflow = null;

	// Aggregate statistics
	for (var item in response['details']) {
		response['details'][item].forEach(item => {
			if (item['type'].length > 0)
				response['summary'][item['type']]++;
		});
	}

	return { 'success': true, 'response': response };
}

function analyzeWorkflowLocal(workflowJson) {
	var analysisResults = analyzeWorkflow(workflowJson);

	if (!analysisResults['success'])
		return analysisResults;

	var summaryOut = '';

	summaryOut += '<hr />';
	summaryOut += '<h3>Workflow Properties</h3>';
	summaryOut += '<table><thead><tr><th>Item</th><th>Result</th></tr></thead><tbody>';

	analysisResults['response']['details']['properties'].forEach(item => {
		summaryOut += buildRow(item['type'], item['title'], item['description'], item['moreInfo']);
	});

	summaryOut += '</tbody></table> <hr />';
	summaryOut += '<h3>Variables</h3>';
	summaryOut += '<table><thead><tr><th>Item</th><th>Result</th></tr></thead><tbody>';

	analysisResults['response']['details']['variables'].forEach(item => {
		summaryOut += buildRow(item['type'], item['title'], item['description'], item['moreInfo']);
	});

	summaryOut += '</tbody></table> <hr />';
	summaryOut += '<h3>Triggers</h3>';
	summaryOut += '<table><thead><tr><th>Item</th><th>Result</th></tr></thead><tbody>';

	analysisResults['response']['details']['triggers'].forEach(item => {
		summaryOut += buildRow(item['type'], item['title'], item['description'], item['moreInfo']);
	});

	summaryOut += '</tbody></table> <hr />';
	summaryOut += '<h3>Targets and Account Keys</h3>';
	summaryOut += '<table><thead><tr><th>Item</th><th>Result</th></tr></thead><tbody>';

	analysisResults['response']['details']['targets'].forEach(item => {
		summaryOut += buildRow(item['type'], item['title'], item['description'], item['moreInfo']);
	});

	analysisResults['response']['details']['account-keys'].forEach(item => {
		summaryOut += buildRow(item['type'], item['title'], item['description'], item['moreInfo']);
	});

	summaryOut += '</tbody></table> <hr />';
	summaryOut += '<h3>Schedules and Calendars</h3>';
	summaryOut += '<table><thead><tr><th>Item</th><th>Result</th></tr></thead><tbody>';

	analysisResults['response']['details']['schedules'].forEach(item => {
		summaryOut += buildRow(item['type'], item['title'], item['description'], item['moreInfo']);
	});

	analysisResults['response']['details']['calendars'].forEach(item => {
		summaryOut += buildRow(item['type'], item['title'], item['description'], item['moreInfo']);
	});

	summaryOut += '</tbody></table> <hr />';
	summaryOut += '<h3>Activities</h3>';
	summaryOut += '<table><thead><tr><th>Item</th><th>Result</th></tr></thead><tbody>';

	analysisResults['response']['details']['activities'].forEach(item => {
		summaryOut += buildRow(item['type'], item['title'], item['description'], item['moreInfo']);
	});

	summaryOut += '</tbody></table> <hr />';
	summaryOut += '<h3>Required Atomic Actions</h3>';
	summaryOut += 'Note: These are the display names as configured within the workflow are are just for reference';
	summaryOut += '<table><thead><tr><th>Item</th><th>Result</th></tr></thead><tbody>';

	analysisResults['response']['details']['atomics'].forEach(item => {
		summaryOut += buildRow(item['type'], item['title'], item['description'], item['moreInfo']);
	});

	summaryOut += '</tbody></table> <hr />';
	summaryOut += '<h3>Just for Fun</h3>';
	summaryOut += '<table><thead><tr><th>Item</th><th>Result</th></tr></thead><tbody>';

	analysisResults['response']['details']['fun'].forEach(item => {
		summaryOut += buildRow(item['type'], item['title'], item['description'], item['moreInfo']);
	});

	summaryOut += '</tbody></table>';

	analysisResults['response'] = summaryOut;

	return analysisResults;
}