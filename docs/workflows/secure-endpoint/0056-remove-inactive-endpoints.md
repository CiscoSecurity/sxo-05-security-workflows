---
layout: page
title: Remove Inactive Endpoints
permalink: /workflows/secure-endpoint/0056-remove-inactive-endpoints
redirect_from:
  - /workflows/0056
parent: Cisco Secure Endpoint
grand_parent: Workflows
---

# Remove Inactive Endpoints
<div markdown="1">
Workflow #0056
{: .label }
</div>

This workflow looks for endpoints in Cisco Secure Endpoint that have been inactive for a specified number of days. If inactive endpoints are found, a list is compiled and they are deleted. An optional approval task can be used to request approval prior to deletion.

Note: This workflow will only remove as many endpoints as your global `AO_LOOP_LIMIT` variable is set to. By default, this is 500.

[<i class="fab fa-github"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0056-SecureEndpoint-RemoveInactiveEndpoints__definition_workflow_01PQR5C3JYUAU20O6OId88VDKYnGqkWh0E3){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Jan 24, 2022 | - Initial release |
| Mar 3, 2022 | - Fixed the condition that checks for the approval result (should have looked for "Approve" instead of "Approved") |

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* Webex Teams - Post Message to Room
	* Webex Teams - Search for Room
* The following atomic actions must be imported before you can import this workflow:
	* None
* The [targets](#targets) and [account keys](#account-keys) listed below
* Cisco Secure Endpoint
* Cisco Webex

---

## Workflow Steps
1. Fetch global variables
1. Search for the Webex Teams room
1. Calculate the date before which endpoints will be removed
1. Fetch computers from Secure Endpoint:
	* Parse each computer and add it to the list to remove if it's old
	* Update the local variables with the new lists
	* Check if there's a next page to parse
1. Check if there are endpoints to remove:
	* If not, end the workflow
	* If there are:
		* Check if approval is required (if so, request it and wait)
		* Loop through each computer:
			* Attempt to delete the computer and check if the request was successful

---

## Configuration
* Set the `Inactivity Threshold` local variable to the number of days after which a computer is considered inactive (if it isn't seen)
* Set the `Require Approval` local variable to whether or not you want someone to have to approve deletions before they happen
* If you want the workflow to run on a schedule, you need to create a [schedule]({{ site.baseurl }}/schedules/) and then add it as a [trigger]({{ site.baseurl }}/workflows/triggers) within the workflow. By default, this workflow is designed to run every 24 hours
* (If Using Approval) Set the `Task Requestor` local variable to the email address of the user who should be listed as the requestor for the approval task
* (If Using Approval) Set the `Task Owner` local variable to the email address of the user who should be listed as the owner for the approval task
* (If Using Approval) Set the `Task Assignee` local variable to the email address of the user who should be listed as the assignee for the approval task
* (If Using Approval) By default, the workflow waits 23 hours for approval. After that, the task expires and the workflow will end. You can change this timeout by editing the `Approval to Remove Endpoints from Cisco Secure Endpoint` and `Wait for approval` activities
* See [this page]({{ site.baseurl }}/atomics/configuration/webex#configuring-our-workflows) for information on configuring the workflow for Webex Teams

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| [AMP_Target]({{ site.baseurl }}/targets/default#amp_target) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `api.amp.cisco.com`<br />_Path:_ `/v1` | AMP_Credentials | Created by default |
| Webex Teams | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `webexapis.com`<br />_Path:_ None | None | Not necessary if Webex Teams activities are removed |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| [AMP_Credentials]({{ site.baseurl }}/account-keys/default#amp_credentials) | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Created by default |
