---
layout: page
title: Repeat Incident Alerting
permalink: /workflows/securex/0070-repeat-incident-alerting
redirect_from:
  - /workflows/0070
parent: Cisco SecureX
grand_parent: Workflows
---

# Repeat Incident Alerting
<div markdown="1">
Workflow #0070
{: .label }
</div>

This workflow sends alerts via Webex if a specific quantity of similar incidents are generated in SecureX within a specified period of time. Alerting can be done for all incidents (by leaving "Aggregation Field" blank) or can be done by aggregating incidents by a certain field (specified in "Aggregation Field").

[<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0070-SecureX-RepeatIncidentAlerting__definition_workflow_01YYV4BH6JGPE5EjyBNbK1piyMmiT3iruXo){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Aug 16, 2022 | - Initial release |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* Threat Response - Generate Access Token
	* Threat Response - Search Incidents
	* Webex - Post Message to Room
	* Webex - Search for Room
* The following atomic actions must be imported before you can import this workflow:
	* None
* The [targets](#targets) and [account keys](#account-keys) listed at the bottom of the page
* (Optional) Cisco Webex

---

## Workflow Steps
1. Fetch global variables and detect region
1. Calculate/format the date to search from
1. Generate an access token for SecureX and search incidents
1. Aggregate the results and generate a list of alerts to send
1. For each alert generated, send a Webex message

---

## Configuration
* This workflow is designed to run on a schedule. You need to create a [schedule]({{ site.baseurl }}/schedules/) and then add it as a [trigger]({{ site.baseurl }}/workflows/triggers) within the workflow
* Set the `Aggregation Field` local variable to the field to aggregate the number of incidents by. If you leave this blank, all incidents will count towards the threshold. If you provide a field here, such as "title," an alert will only generate if there are `Alert Threshold` incidents with the same `Aggregation Field` in `Time Period`
* Set the `Alert Threshold` local variable to the number of incidents that must occur within the `Time Period` before an alert is generated
* Set the `Time Period` local variable to the number of minutes within which to aggregate results. As in, if there are `Alert Threshold` incidents within this time period an alert will be generated
* See [this page]({{ site.baseurl }}/atomics/configuration/webex#configuring-our-workflows) for information on configuring the workflow for Webex

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| [CTR_For_Access_Token]({{ site.baseurl }}/targets/default#ctr_for_access_token) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `visibility.amp.cisco.com`<br />_Path:_ `/iroh` | CTR_Credentials | Created by default |
| [Private_CTIA_Target]({{ site.baseurl }}/targets/default#private_ctia_target) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `private.intel.amp.cisco.com`<br />_Path:_ None | None | Created by default |
| Webex Teams | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `webexapis.com`<br />_Path:_ None | None | Not necessary if Webex activities are removed |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| [CTR_Credentials]({{ site.baseurl }}/account-keys/default#ctr_credentials) | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Created by default |
