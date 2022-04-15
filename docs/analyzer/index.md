---
layout: page
title: Workflow Analyzer
permalink: /analyzer
use_jquery: true
is_analyzer: true
nav_order: 69
---

# Workflow Analyzer
This tool allows you to check if your workflow or atomic action conforms to our best practices. Note that this analyzer doesn't check for EVERY possible best practice, nor does it perform the same validation that SecureX orchestration does when you click the **Validate** button in the workflow editor. To use this tool, simply export your workflow or atomic action to JSON and copy/paste the JSON below.

<form id="analyzer">
	<label for="workflowJson">Workflow or Atomic Action JSON</label>:<br />
	<textarea id="workflowJson" class="analyzer-textarea mb-3" rows="15"></textarea>
	<button type="submit" class="btn-cisco-sky-blue">Analyze</button>
</form>

## Analysis Results
<div id="analyzerOutput">
	<div class="cisco-alert cisco-alert-info"><i class="fa fa-info-circle mr-1 cisco-icon-info"></i> Ready</div>
</div>

<script>
	$(function()
	{
		$('body').on('click', '.more-info-toggle', function()
		{
			$('#more-info-' + $(this).attr('data-index')).slideToggle();
		});
		
		$('#analyzer').submit(function(event)
		{
			$(this).find('button[type="submit"]').prop('disabled', true);
			$('#analyzerOutput').html('<div class="cisco-alert cisco-alert-success"><i class="fa fa-info-circle mr-1 cisco-icon-success"></i> Running...</div>');
			
			if($('#workflowJson').val().length == 0)
			{
				$('#analyzerOutput').html('<div class="cisco-alert cisco-alert-danger"><i class="fa fa-exclamation-circle mr-1 cisco-icon-danger"></i> You must provide the JSON for a workflow or atomic action</div>');
			}
			else
			{
				var analysisResult = '';
				
				try {
					analysisResult = analyzeWorkflowLocal($('#workflowJson').val());
					
					if(analysisResult['success'])
					{
						$('#analyzerOutput').html(analysisResult['response']);
					}
					else
					{
						$('#analyzerOutput').html('<div class="cisco-alert cisco-alert-danger"><i class="fa fa-exclamation-circle mr-1 cisco-icon-danger"></i> ' + analysisResult['response'] + '</div>');
					}
					
					analysisResult = null;
					
					$('html,body').animate( { scrollTop: $("a[href='#analysis-results']").offset().top }, 'slow');
				}
				catch(e)
				{
					console.log(e);
					$('#analyzerOutput').html('<div class="cisco-alert cisco-alert-danger"><i class="fa fa-exclamation-circle mr-1 cisco-icon-danger"></i> Something went wrong during workflow analysis: ' + e.message + '</div>');
				}
			}
			
			$(this).find('button[type="submit"]').prop('disabled', false);
			
			return false;
		});
	});
</script>