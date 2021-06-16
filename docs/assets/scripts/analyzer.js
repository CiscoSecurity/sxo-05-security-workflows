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
	var response = { 'success': true, 'response': '' };
	var workflow = '';
	var summaryOut = '';
	var lineCount = 0;
	var charCount = 0;
	var actionCount = 0;
	var actionTypes = [];

	// Attempt to read/parse the JSON
	try {
		workflow = JSON.parse(workflowJson);
	}
	catch (e) {
		response['success'] = false;
		response['response'] = 'Failed to parse the input provided. Are you sure you copied the complete JSON for your workflow or atomic action?';

		return response;
	}

	lineCount = workflowJson.split("\n").length;
	charCount = workflowJson.length;

	// Check if this is an atomic action or normal workflow
	var isAtomic = workflow['workflow']['properties']['atomic']['is_atomic'];

	// Check the workflow properties
	summaryOut += '<hr />';
	summaryOut += '<h3>Workflow Properties</h3>';
	summaryOut += '<table><thead><tr><th>Item</th><th>Result</th></tr></thead><tbody>';

	summaryOut += buildRow('', 'Workflow Name', workflow['workflow']['properties']['display_name']);
	summaryOut += buildRow('', 'Definition Type', (isAtomic ? 'Atomic Action' : 'Workflow'));

	// Check for categories
	if ('categories' in workflow && workflow['categories'] != null) {
		var categories = [];

		for (category in workflow['categories']) {
			categories.push(workflow['categories'][category]['name']);
		}

		if (categories.length == 0) {
			summaryOut += buildRow('', 'Categories', 'This workflow doesn\'t have any categories');
		}
		else {
			summaryOut += buildRow('', 'Categories', categories.join(', '));
		}
	}
	else {
		summaryOut += buildRow('', 'Categories', 'This workflow doesn\'t have any categories');
	}

	// Check for a description
	if ('description' in workflow['workflow']['properties'] && workflow['workflow']['properties']['description'].length > 10) {
		summaryOut += buildRow('success', 'Description', 'Passed');
	}
	else {
		summaryOut += buildRow('error', 'Description', 'Description missing', 'All workflows and atomic actions should have a meaningful description');
	}

	// Make sure the workflow isn't set to self destruct
	if (!workflow['workflow']['properties']['delete_workflow_instance']) {
		summaryOut += buildRow('success', 'Workflow Instance Cleanup', 'Passed', '"Clean up after successful execution" is not checked (which is what we typically recommend)');
	}
	else {
		summaryOut += buildRow('warning', 'Workflow Instance Cleanup', 'Clean up enabled', 'If you check "Clean up after successful execution", your workflow or atomic action\'s instances will be deleted if they\'re successful. This means you won\'t be able to view them for debugging purposes');
	}

	// Special conditions for atomic actions
	if (isAtomic) {
		// Target configuration
		if ('no_target' in workflow['workflow']['properties']['target'] && workflow['workflow']['properties']['target']['no_target']) {
			summaryOut += buildRow('info', 'Target', 'No target specified', 'Not having a target is ok for an atomic action if it doesn\'t need to communicate with anything');
		}
		else {
			if ('specify_on_workflow_start' in workflow['workflow']['properties']['target'] && workflow['workflow']['properties']['target']['specify_on_workflow_start']) {
				summaryOut += buildRow('success', 'Target', 'Passed', 'The target for the atomic will be provided by the parent workflow calling it');
			}
			else {
				summaryOut += buildRow('error', 'Target', 'Failed', 'All atomic actions should have their target set to "Specify Target On Workflow Start". This allows the atomic to be more portable since the workflow using it can specify the target');
			}
		}

		// Account key configuration
		if ('target_default' in workflow['workflow']['properties']['runtime_user'] && workflow['workflow']['properties']['runtime_user']['target_default']) {
			summaryOut += buildRow('success', 'Account Key', 'Passed', 'The default account key for whatever target the parent workflow provides at runtime will be used');
		}
		else {
			summaryOut += buildRow('error', 'Account Key', 'Failed', 'All atomic actions should have their account key set to "Use Target\'s Default Account Keys". This allows the atomic to inherit whatever account key is associated with the target provided by the parent workflow');
		}
	}
	// Conditions for normal workflows
	else {
		// Target configuration
		if ('no_target' in workflow['workflow']['properties']['target'] && workflow['workflow']['properties']['target']['no_target']) {
			summaryOut += buildRow('info', 'Target', 'No target specified', 'Not having a target is ok for a workflow if it doesn\'t need to communicate with anything');
		}
		else {
			// Make sure a target group is being used
			if ('execute_on_target_group' in workflow['workflow']['properties']['target'] && workflow['workflow']['properties']['target']['execute_on_target_group']) {
				summaryOut += buildRow('success', 'Target', 'Passed', 'Your workflow is configured to use a target group (which is what we recommend for workflow portability)');

				// Check if the Default TargetGroup is selected
				if (workflow['workflow']['properties']['target']['target_group']['target_group_id'] == 'target_group_01EJ0TQWPQWBD0qiWqClJKj9FOzwiZRfOFH') {
					summaryOut += buildRow('success', 'Target Group', 'Passed', 'Using the "Default TargetGroup" is best since you can generally assume everyone has it');
				}
				else {
					summaryOut += buildRow('warning', 'Target Group', 'Warning', 'We recommend using the "Default TargetGroup" since every SecureX orchestration tenant should have it by default. If you use your own target group, it will be created during workflow import');
				}

				// Check if run on all targets is selected
				if (!workflow['workflow']['properties']['target']['target_group']['run_on_all_targets']) {
					summaryOut += buildRow('success', 'Target Group "Run On"', 'Passed', 'Being specific with targets is usually best which is why we don\'t recommend using this option');
				}
				else {
					summaryOut += buildRow('error', 'Target Group "Run On"', 'Failed', 'We do not recommend checking "All Targets in this Group" as it limits your ability to define target selection criteria');
				}

				// Check if choose first with matching criteria is selected
				if (workflow['workflow']['properties']['target']['target_group']['use_criteria']['choose_target_using_algorithm'] == 'choose_first_with_matching_criteria') {
					summaryOut += buildRow('success', 'Target Group Criteria', 'Passed', '"Choose first with matching criteria" is selected (which is what we recommend)');
				}
				else {
					summaryOut += buildRow('warning', 'Target Group Critera', 'Warning', 'This should be "Choose first with matching critera" unless you want the workflow to execute once for each matching target in the group');
				}

				// Make sure there is criteria for the target selection
				if (workflow['workflow']['properties']['target']['target_group']['use_criteria']['conditions'].length > 0) {
					// Check if the operator for the criteria is "eqi"
					if (workflow['workflow']['properties']['target']['target_group']['use_criteria']['conditions'][0]['operator'] == 'eqi') {
						summaryOut += buildRow('success', 'Target Group Criteria Operator', 'Passed', 'The most common criteria selection operator is "Equals Case-Insensitive"');
					}
					else {
						summaryOut += buildRow('warning', 'Target Group Criteria Operator', 'Warning', 'This is typically "Equals Case-Insensitive" but other operators are fine if you\'re doing something specific');
					}
				}
				else {
					summaryOut += buildRow('warning', 'Target Group Criteria', 'Warning', 'There isn\'t any target group criteria. This will cause issues with workflow operation');
				}
			}
			else {
				summaryOut += buildRow('error', 'Target', 'Failed', 'Workflows that are meant to be shared and require targets should use a Target Group. More information about target groups can be found <a href="{{ site.baseurl }}/targets/groups">here</a>');
			}
		}
	}

	summaryOut += '</tbody></table> <hr />';
	summaryOut += '<h3>Variables</h3>';
	summaryOut += '<table><thead><tr><th>Item</th><th>Result</th></tr></thead><tbody>';

	// Check for global variables
	if ('variables' in workflow && workflow['variables'] != null) {
		summaryOut += buildRow('error', 'Global Variables', 'Failed', 'Global variables should not be used in workflows or atomic actions meant to be shared. Instead, use a "Set Variables" activity to copy global variables to local variables within the workflow. Before exporting, simply remove the global variables so the other user can select their own');
	}
	else {
		summaryOut += buildRow('success', 'Global Variables', 'Passed', 'The workflow does not appear to be using any global variables');
	}

	// Check for custom table types
	if ('table_types' in workflow && workflow['table_types'] != null) {
		summaryOut += buildRow('error', 'Custom Table Types', 'Failed', 'We do not recommend using tables to pass data between objects as they\'re inefficient and don\'t always scale well. It\'s better to exchange JSON instead');
	}
	else {
		summaryOut += buildRow('success', 'Custom Table Types', 'Passed', 'The workflow does not appear to be using any custom table types');
	}

	// Check the workflow's input/output/local/static variables
	if ('variables' in workflow['workflow'] && workflow['workflow']['variables'] != null && workflow['workflow']['variables'].length > 0) {
		workflow['workflow']['variables'].forEach(variable => {
			// If the variable is a secure string, check if it has a default value
			if (variable['properties']['type'] == 'datatype.secure_string' && variable['properties']['value'].length != 0)
				summaryOut += buildRow('warning', variable['properties']['name'] + '<br /><small>' + variable['properties']['type'] + '</small>', 'Warning', 'If a Secure String variable has a value when exported, it will prompt the user for its value during import. If you want to avoid this, clear the Secure String\'s value before exporting the workflow');

			// Make sure the variable has a description
			if (!('description' in variable['properties']) || variable['properties']['description'].length == 0)
				summaryOut += buildRow('warning', variable['properties']['name'] + '<br /><small>' + variable['properties']['type'] + '</small>', 'No description', 'All variables should have a meaningful description to help the end user understand its purpose and, if a value needs to be provided, where the user should get it');
		});
	}

	summaryOut += '</tbody></table> <hr />';
	summaryOut += '<h3>Triggers</h3>';
	summaryOut += '<table><thead><tr><th>Item</th><th>Result</th></tr></thead><tbody>';

	if ('triggers' in workflow && workflow['triggers'] != null) {
		var triggers = [];

		for (trigger in workflow['triggers']) {
			triggers.push(workflow['triggers'][trigger]['name'] + ' (' + workflow['triggers'][trigger]['type'] + ')');
		}

		if (triggers.length == 0) {
			summaryOut += buildRow('', 'Triggers', 'This workflow doesn\'t have any triggers');
		}
		else {
			summaryOut += buildRow('', 'Triggers', triggers.join(', '));
		}
	}
	else {
		summaryOut += buildRow('', 'Triggers', 'This workflow doesn\'t have any triggers');
	}

	// Make sure there aren't any hard-coded account keys or targets
	summaryOut += '</tbody></table> <hr />';
	summaryOut += '<h3>Targets and Account Keys</h3>';
	summaryOut += '<table><thead><tr><th>Item</th><th>Result</th></tr></thead><tbody>';

	// Check for embedded targets
	if ('targets' in workflow && workflow['targets'] != null) {
		summaryOut += buildRow('error', 'Targets', 'Failed', 'Workflows should not have any hard-coded targets');
	}
	else {
		summaryOut += buildRow('success', 'Targets', 'Passed', 'The workflow does not appear to have any targets embedded in it');
	}

	// Check for embedded account keys
	if ('runtime_users' in workflow && workflow['runtime_users'] != null) {
		summaryOut += buildRow('error', 'Account Keys', 'Failed (there should not be any hard-coded account keys)');
	}
	else {
		summaryOut += buildRow('success', 'Account Keys', 'Passed', 'The workflow does not appear to have any account keys embedded in it');
	}

	// Check for embedded target groups
	if ('target_groups' in workflow && workflow['target_groups'] != null) {
		for (group in workflow['target_groups']) {
			workflow['target_groups'][group]['targets'].forEach(target => {
				// Make sure the target group doesn't have any manually added targets
				if ('selected_target_ids' in target && target['selected_target_ids'].length > 0)
					summaryOut += buildRow('warning', 'Target Group<br /><small>' + workflow['target_groups'][group]['name'] + '</small>', 'Should not contain manually selected targets', 'In the target group configuration, you probably added a specific target manually. We don\'t recommend doing this unless you have a specific use case and suggest you consider using target group criteria instead');
			});
		}
	}

	// Validate any embedded schedules or calendars
	summaryOut += '</tbody></table> <hr />';
	summaryOut += '<h3>Schedules and Calendars</h3>';
	summaryOut += '<table><thead><tr><th>Item</th><th>Result</th></tr></thead><tbody>';

	// Check for embedded schedules
	if ('schedules' in workflow && workflow['schedules'] != null) {
		summaryOut += buildRow('', 'Schedules', 'This workflow contains ' + Object.keys(workflow['schedules']).length + ' schedule(s)');
	}
	else {
		summaryOut += buildRow('', 'Schedules', 'No schedules were found in this workflow');
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

		for (calendar in workflow['calendars']) {
			if (calendar['unique_name'] in systemCalendars) {
				summaryOut += buildRow('info', 'Calendars', 'This workflow is using one of the default calendars');
			}
			else {
				summaryOut += buildRow('warning', 'Calendars', 'Warning', 'We don\'t typically recommend using a custom calendar unless you have a specific reason to. It\'s better to use one of the default calendars if possible');
			}
		}
	}
	else {
		summaryOut += buildRow('', 'Calendars', 'No calendars were found in this workflow');
	}

	// Check for embedded target groups
	if ('target_groups' in workflow && workflow['target_groups'] != null) {
		for (group in workflow['target_groups']) {
			workflow['target_groups'][group]['targets'].forEach(target => {
				// Make sure the target group doesn't have any manually added targets
				if ('selected_target_ids' in target && target['selected_target_ids'].length > 0)
					summaryOut += buildRow('warning', 'Target Group<br /><small>' + workflow['target_groups'][group]['name'] + '</small>', 'Should not contain manually selected targets', 'In the target group configuration, you probably added a specific target manually. We don\'t recommend doing this unless you have a specific use case and suggest you consider using target group criteria instead');
			});
		}
	}

	// Validate activity configurations
	summaryOut += '</tbody></table> <hr />';
	summaryOut += '<h3>Activities</h3>';
	summaryOut += '<table><thead><tr><th>Item</th><th>Result</th></tr></thead><tbody>';

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
				summaryOut += buildRow('warning', displayName, 'We do not recommend using subworkflows as they complicate the import/export process. You may want to consider using some atomic actions instead depending on what your subworkflow does');
			}

			// Check if the activity is being skipped
			if (action['properties']['skip_execution'])
				summaryOut += buildRow('info', displayName, '"Skip Activity Execution" is checked', 'Skipping execution for an activity means the activity will not run at all');

			// Special handling for web requests
			if (action['type'] == 'web-service.http_request') {
				if (action['properties']['continue_on_failure'])
					summaryOut += buildRow('warning', displayName, '"Continue Workflow Execution on Failure" is checked', 'You probably want "Continue on HTTP error status code" instead');

				if (!action['properties']['continue_on_error_status_code'])
					summaryOut += buildRow('warning', displayName, '"Continue on HTTP error status code" is not checked', 'You should check this and use a Condition Block to handle HTTP error codes');
			}
			// Special handling for JSON path query
			else if (action['type'] == 'corejava.jsonpathquery') {
				if (!action['properties']['continue_on_failure']) {
					summaryOut += buildRow('warning', displayName, '"Continue Workflow Execution on Failure" is not checked', 'If the JSON path query you look for isn\'t found, the activity will fail and your workflow will fail with it. If you want to avoid this, you can check continue on failure and use a Condition Block to check if the path query was successful');
				}
				else {
					summaryOut += buildRow('info', displayName, '"Continue Workflow Execution on Failure" is checked', 'Setting continue workflow execution on failure means the workflow will continue running even if this activity fails. It\'s ok to use this if you\'re using a Condition Block to do some error handling');
				}
			}
			else {
				if (action['properties']['continue_on_failure'])
					summaryOut += buildRow('info', displayName, '"Continue Workflow Execution on Failure" is checked', 'Setting continue workflow execution on failure means the workflow will continue running even if this activity fails. It\'s ok to use this if you\'re using a Condition Block to do some error handling');
			}

			// Target Configuration
			if ('target' in action['properties']) {
				if (isAtomic) {
					if (!action['properties']['target']['use_workflow_target'])
						summaryOut += buildRow('warning', displayName, 'Should be "Use Workflow Target"', 'All activities in an atomic action that use a target should be set to "Use Workflow Target"');
				}
				else {
					if (!'override_workflow_target_group_criteria' in action['properties']['target'] && !'use_workflow_target_group' in action['properties']['target']) {
						summaryOut += buildRow('warning', displayName, 'Target Configuration', 'Should be "Use Workflow Target Group" or "Override Workflow Target Group Criteria"');
					}
					else {
						if (('override_workflow_target_group_criteria' in action['properties']['target'] && !action['properties']['target']['override_workflow_target_group_criteria']) || ('use_workflow_target_group' in action['properties']['target'] && !action['properties']['target']['use_workflow_target_group']))
							summaryOut += buildRow('warning', displayName, 'Target Configuration', 'Should be "Use Workflow Target Group" or "Override Workflow Target Group Criteria"');
					}
				}
			}

			// Account Key Configuration
			if ('runtime_user' in action['properties']) {
				if (!'target_default' in action['properties']['runtime_user'] || !action['properties']['runtime_user']['target_default'])
					summaryOut += buildRow('warning', displayName, 'Account Key Configuration', 'Most activities should have their account key set to "Use Target\'s Default Account Keys." It\'s uncommon that a target\'s account keys should be overriden');
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
		summaryOut += buildRow('info', 'No Activities Found', 'N/A');
	}

	// Validate atomic action dependencies
	summaryOut += '</tbody></table> <hr />';
	summaryOut += '<h3>Required Atomic Actions</h3>';
	summaryOut += 'Note: These are the display names as configured within the workflow are are just for reference';
	summaryOut += '<table><thead><tr><th>Item</th><th>Result</th></tr></thead><tbody>';

	// Check if the workflow is using any atomics
	if ('atomic_workflows' in workflow && workflow['atomic_workflows'].length > 0) {
		workflow['atomic_workflows'].forEach(atomic => {
			// Check if the atomic was an activity found previously
			if (atomic in atomicActions) {
				summaryOut += buildRow('info', atomicActions[atomic], 'Resolved');
			}
			else {
				summaryOut += buildRow('error', atomic, 'Failed to Resolve');
			}
		});
	}
	else {
		summaryOut += buildRow('info', 'No Atomic Actions Found', 'N/A');
	}

	// Just for fun...
	summaryOut += '</tbody></table> <hr />';
	summaryOut += '<h3>Just for Fun</h3>';
	summaryOut += '<table><thead><tr><th>Item</th><th>Result</th></tr></thead><tbody>';

	summaryOut += buildRow('info', 'Total Number of Lines', lineCount.toLocaleString());
	summaryOut += buildRow('info', 'Total Number of Characters', charCount.toLocaleString());
	summaryOut += buildRow('info', 'Total Number of Activities', actionCount.toLocaleString());
	summaryOut += buildRow('info', 'Number of Distinct Activities', (actionTypes.length).toLocaleString());

	summaryOut += '</tbody></table>';

	// Clean up
	workflow = null;
	workflowJson = null;

	response['response'] = summaryOut;
	return response;
}