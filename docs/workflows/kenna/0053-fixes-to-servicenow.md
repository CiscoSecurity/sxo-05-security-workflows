---
layout: page
title: Fixes to ServiceNow Incidents
permalink: /workflows/kenna/0053-fixes-to-servicenow
redirect_from:
  - /workflows/0053
parent: Kenna Security
grand_parent: Workflows
---

# Fixes to ServiceNow Incidents
<div markdown="1">
Workflow #0053
{: .label }
</div>

This workflow fetches all Kenna vulnerabilities for a given asset group and creates a ServiceNow ticket for each unique asset with vulnerabilities and fixes available.

Note: By default, this workflow is configured to create a maximum of 100 ServiceNow incident tickets per execution. You can change this using the `Ticket Limit` local variable.

[<i class="fa fa-video mr-1"></i> Overview](https://www.youtube.com/watch?v=kpWu3q2hA88&list=PLPFIie48Myg2tu2gHbgm-moYg8LDaXsSo){: .btn-cisco-outline .mr-2 } [<i class="fab fa-github"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0053-Kenna-FixesToServiceNowIncidents__definition_workflow_01TI80GVBHOMI4pXUbvUFnsZYT5uOcXvtGt){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Dec 16, 2021 | - Initial release |
| Jan 24, 2022 | - Updated to end successfully if the ticket limit is reached, as opposed to ending and failing |
| Feb 10, 2022 | - Updated the default values for the `ServiceNow User ID` and `Ticket Limit` local variables |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* None
* The following atomic actions must be imported before you can import this workflow:
	* ServiceNow - Create Incident ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
* The [targets](#targets) and [account keys](#account-keys) listed below
* Kenna Security
* ServiceNow

---

## Workflow Steps
1. Make sure the required inputs were provided
1. Fetch global variables
1. Get a list of assets for the risk meter group and read them to a table
1. Check if assets were found:
	* If not, end the workflow
	* If so, loop through each asset:
		* If the ticket limit has been reached, end the workflow
		* Get fixes for the asset
		* Get vulnerabilities for the asset (where a fix is available, a due date is set, and there's no ServiceNow ticket association)
		* Parse vulnerabilities and fixes into text for ServiceNow
		* Create a ServiceNow incident
		* Update the vulnerabilities in Kenna with the ServiceNow ticket

---

## Configuration
* Add your Kenna API token to the `API Token` local variable (or, if you have an API key in a global variable already, set the local variable to the global's value using the `Fetch Global Variables` group at the beginning of the workflow)
* Set the `Kenna Instance URL` local variable to the URL of your Kenna instance (for example: `customer.kennasecurity.com`)
* Set the `Risk Meter Group ID` local variable to the ID of the risk meter group you want the workflow to process
* Set the `Risk Score Threshold` local variable to the minimum risk score you want the workflow to process. Anything with a risk score less than this value will be ignored
* Set the `ServiceNow User ID` local variable to the username you want incidents opened as. This can either match the username in your ServiceNow **Account Key** or, if the account has the appropriate permissions, can be a different user
* (Optional) Update the `Ticket Limit` local variable with the maximum number of ServiceNow tickets you want the workflow to create per execution
* By default, this workflow will not run automatically. [Click here]({{ site.baseurl }}/schedules/) to learn about scheduling it to run on its own

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| Kenna_Target | HTTP Endpoint | _Protocol:_ `HTTPS` <br/> _Host:_ `api.kennasecurity.com` <br/> _Path_: None | None | |
| ServiceNow | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `<instance>.service-now.com`<br />_Path:_ `/api` | ServiceNow_Credentials | Be sure to use your instance URL |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| ServiceNow_Credentials | HTTP Basic Authentication | _Username:_ ServiceNow User ID<br />_Password:_ ServiceNow Password | |
