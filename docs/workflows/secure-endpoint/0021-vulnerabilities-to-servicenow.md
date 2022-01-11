---
layout: page
title: Vulnerabilities to ServiceNow Incidents
permalink: /workflows/secure-endpoint/0021-vulnerabilities-to-servicenow
redirect_from:
  - /workflows/0021
  - /workflows/secure-endpoint/0021-vulnerabilites-to-servicenow
parent: Cisco Secure Endpoint
grand_parent: Workflows
---

# Vulnerabilities to ServiceNow Incidents
<div markdown="1">
Workflow #0021
{: .label }
</div>

This workflow periodically checks for "Vulnerable Application Detected" events in Cisco Secure Endpoint. If events are found, the associated CVEs are checked to see if they meet the threshold configured in the workflow. If the threshold is met for at least one of the endpoint's vulnerabilities, a ServiceNow incident is opened.

[<i class="fab fa-github"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0021-SecureEndpoint-VulnerabilitiesToServiceNowIncidents__definition_workflow_01NLOGX5XZWH36I4ILmqUiBywWOAxnScesV){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Apr 8, 2021 | - Initial release |
| Sep 10, 2021 | - Updated to use the new [system atomics]({{ site.baseurl }}/atomics/system) |
| Jan 11, 2022 | - Fixed an issue with a Python script not converting numbers to strings properly |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* Secure Endpoint - Get Events
* The following atomic actions must be imported before you can import this workflow:
	* ServiceNow - Create Incident ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
* The [targets](#targets) and [account keys](#account-keys) listed below
* Cisco Secure Endpoint
* ServiceNow

---

## Workflow Steps
1. Calculate the time 24 hours ago
1. While there are events to process:
	* Get events from Secure Endpoint
	* Convert the events to a table
	* Loop through each event:
		* Extract attributes from the event
		* Convert the list of vulnerabilities to text
		* Check if the CVE threshold was met. If it was, open a ServiceNow incident
	* Check if there's another page of events
		* If there is, update the paging variables and continue
		* If there isn't, end the workflow

---

## Configuration
* Set the `CVE Score Threshold` local variable to the minimum CVE score you want to generate incidents for. This is 6.5 by default
* By default, the workflow is configured to run once a day using the **0021 - Secure Endpoint - Vulnerabilities to ServiceNow Incidents** [schedule]({{ site.baseurl }}/schedules). When you import the workflow, the schedule trigger will be disabled. To enable the schedule:
	* Open the workflow in the workflow editor
	* Scroll down to the **Triggers** section of the workflow's properties and click **Secure Endpoint Event Polling**
	* Uncheck the **Disable Trigger** box and click **Save**
* Update the `ServiceNow - Create Incident` activity with the username you want incidents opened as (in addition to any other changes to the ticket properties you want)
* If you change the schedule for this workflow, you will need to adjust the `Calculate time 24 hours ago` activity's `Adjustment` input variable to match the new schedule. As in, if you change the schedule to every 2 days, you would need to subtract `172800` seconds instead of `86400`

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| [AMP_Target]({{ site.baseurl }}/targets/default#amp_target) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `api.amp.cisco.com`<br />_Path:_ `/v1` | AMP_Credentials | Created by default |
| ServiceNow | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `<instance>.service-now.com`<br />_Path:_ `/api` | ServiceNow_Credentials | Be sure to use your instance URL |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| [AMP_Credentials]({{ site.baseurl }}/account-keys/default#amp_credentials) | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Created by default |
| ServiceNow_Credentials | HTTP Basic Authentication | _Username:_ ServiceNow User ID<br />_Password:_ ServiceNow Password | |
