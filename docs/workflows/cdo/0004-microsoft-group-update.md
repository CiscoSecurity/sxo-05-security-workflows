---
layout: page
title: Microsoft Online Object Group Update
permalink: /workflows/cdo/0004-microsoft-group-update
redirect_from:
  - /workflows/0004-microsoft-cdo-group-update
  - /workflows/0004
parent: Cisco Defense Orchestrator
grand_parent: Workflows
---

# Microsoft Online Object Group Update
<div markdown="1">
Workflow #0004
{: .label }
</div>

Microsoft provides a JSON-formatted feed of their networks and domains for their various cloud services. This workflow fetches that JSON, filters it, compares it to an existing network object group in Cisco Defense Orchestrator, and then updates the group as needed.

[<i class="fa fa-video mr-1"></i> Overview](https://www.youtube.com/watch?v=8sNQ7t3oPqA&list=PLPFIie48Myg2tu2gHbgm-moYg8LDaXsSo){: .btn-cisco-outline .mr-2 } [<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0004-MicrosoftOnline-CDOGroupUpdate__definition_workflow_01FTPWFQOJ7TE3SJcsVpnuC4e8ZEEReN1iF){: .btn-cisco-outline }

---

## Requirements
* The [targets](#targets) listed below
* Access to Cisco Defense Orchestrator (CDO)
* A CDO API token (Can be generated on your [CDO settings page](https://www.defenseorchestrator.com/settings))

---

## Workflow Steps
1. Fetch the online services information JSON from Microsoft
1. Get the existing object group from CDO
1. Figure out what changes are needed
1. Check if any changes are needed
	* If not, end the workflow
1. Create each new network object
1. Generate the JSON to update the object group
1. Update the object group using the CDO API

---

## Configuration
* If you want the workflow to run on a schedule, you need to create a [schedule]({{ site.baseurl }}/schedules) and then add it as a [trigger]({{ site.baseurl }}/workflows/triggers) within the workflow
* Provide the workflow your CDO API token by either:
	* Storing your token in a [global variable]({{ site.baseurl }}/variables/global) and using the `Fetch Global Variables` group at the beginning of the workflow to update the `CDO Bearer Token` local variable; or
	* Leave the `Fetch Global Variables` group disabled and add your token directly to the `CDO Bearer Token` local variable
* Validate the name of the network object group that'll be updated in CDO in the `CDO Object Group Name` local variable
* Go to [Microsoft's website](http://aka.ms/ipurlws) to get the URL for the worldwide endpoint JSON. Click the link on the second bullet to `https://endpoints.office.com/endpoints/worldwide` and copy the URL into the `Microsoft Endpoints URL` local variable in the workflow

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| Cisco Defense Orchestrator | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `defenseorchestrator.com`<br />_Path:_ `/aegis/rest/v1/` | None |  |
