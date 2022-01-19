---
layout: page
title: Excessive Requests to Incidents
permalink: /workflows/umbrella/0023-excessive-requests-to-incident
redirect_from:
  - /workflows/0023
parent: Cisco Umbrella
grand_parent: Workflows
---

# Excessive Requests to Incidents
<div markdown="1">
Workflow #0023
{: .label }
</div>

This workflow fetches request per category statistics from Cisco Umbrella for a 1 hour window. If any of the categories had a request count higher than the threshold configured in the workflow, an incident is created in Cisco SecureX.

[<i class="fab fa-github"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0023-Umbrella-ExcessiveRequestsToIncidents__definition_workflow_01NOZNOLQGMUL2K59yNj2rcOYLAsvxkoKuD){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Apr 13, 2021 | - Initial release |
| Jun 14, 2021 | - Additional error handling |
| Sep 10, 2021 | - Updated to use the new [system atomics]({{ site.baseurl }}/atomics/system) |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* Threat Response - Create Incident
	* Threat Response - Generate Access Token
	* Umbrella - Reporting v2 - Get Token
* The following atomic actions must be imported before you can import this workflow:
	* None
* The [targets](#targets) and [account keys](#account-keys) listed below
* Cisco Umbrella

---

## Workflow Steps
1. Get a token for the Umbrella API
1. Request statistics for DNS categories
1. Check if the request was successful:
	* If it wasn't, output an error and end the workflow
	* If it was:
		* Convert the statistics to a table
		* Loop through the table checking if any of the categories are in scope. If it is, add it to the ticket text
1. Check if any categories exceeded the threshold (overall)
	* If none of them did, end the workflow
1. Generate an access token for SecureX and create an incident

---

## Configuration
* Set the `Umbrella Organization ID` local variable to your Umbrella organization's ID (found in your Umbrella dashboard's URL)
* Set the `Categories to Alert On` local variable to the list of categories you want to alert on (ex: Cryptomining,Illegal Downloads,Illegal Activity,Phishing)
* Set the `Request Threshold` local variable to the threshold of requests per hour you want to alert on. This is 1,000 by default
* By default, the workflow is configured to run once an hour using the **0023 - Umbrella - Excessive Requests to Incidents** [schedule]({{ site.baseurl }}/schedules/). When you import the workflow, the schedule trigger will be disabled. To enable the schedule:
	* Open the workflow in the workflow editor
	* Scroll down to the **Triggers** section of the workflow's properties and click **Umbrella Report Polling**
	* Uncheck the **Disable Trigger** box and click **Save**
* If you change the schedule for this workflow, you will need to adjust the relative URL in the `Request category statistics` activity to match the new schedule. As in, if you change the schedule to every 2 hours, you would need `from=-2hours` instead of `from=-1hours` in the URL

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| [CTR_For_Access_Token]({{ site.baseurl }}/targets/default#ctr_for_access_token) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `visibility.amp.cisco.com`<br />_Path:_ `/iroh` | CTR_Credentials | Created by default |
| [Private_CTIA_Target]({{ site.baseurl }}/targets/default#private_ctia_target) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `private.intel.amp.cisco.com`<br />_Path:_ None | None | Created by default |
| Umbrella OAuth | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `management.api.umbrella.com`<br />_Path:_ None | Umbrella Reporting | |
| Umbrella Reporting v2 | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `reports.api.umbrella.com`<br />_Path:_ None | None | |


---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| [CTR_Credentials]({{ site.baseurl }}/account-keys/default#ctr_credentials) | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Created by default |
| Umbrella Reporting | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Must be an API client for the reporting API |