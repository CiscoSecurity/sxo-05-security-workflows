---
layout: page
title: Alerts to SecureX Incidents
permalink: /workflows/secure-cloud-insights/0059-alerts-to-incidents
redirect_from:
  - /workflows/0059
parent: Cisco Secure Cloud Insights
grand_parent: Workflows
---

# Alerts to SecureX Incidents
<div markdown="1">
Workflow #0059
{: .label }
</div>

This workflow is triggered by a webhook for an alert from Cisco Secure Cloud Insights. When a webhook is received, the alert data is parsed and a new SecureX incident is created.

[<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0059-SecureCloudInsights-AlertsToSecureXIncidents__definition_workflow_01U5UAE90VQDP6U6FZxNrl82NTm006epOzo){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Feb 10, 2022 | - Initial release |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* Threat Response - Create Incident
	* Threat Response - Generate Access Token
* The following atomic actions must be imported before you can import this workflow:
	* None
* The [targets](#targets) and [account keys](#account-keys) listed below
* Cisco Secure Cloud Insights

---

## Workflow Steps
1. Extract the data from the alert JSON
1. Check if extraction was successful
	* If not, end the workflow
1. Format the event data
1. Fetch an access token for the Threat Response API
1. Create a new incident

---

## Configuration
* When you import this workflow, a [webhook]({{ site.baseurl}}/webhooks/), [event]({{ site.baseurl }}/events/), and [trigger]({{ site.baseurl }}/workflows/triggers}}) will be created. You'll need to go to the webhooks section of SecureX orchestration to get your webhook's URL. Then, you need to configure Secure Cloud Insights to send alerts to this URL.

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| [CTR_For_Access_Token]({{ site.baseurl }}/targets/default#ctr_for_access_token) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `visibility.amp.cisco.com`<br />_Path:_ `/iroh` | CTR_Credentials | Created by default |
| [Private_CTIA_Target]({{ site.baseurl }}/targets/default#private_ctia_target) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `private.intel.amp.cisco.com`<br />_Path:_ None | None | Created by default |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| [CTR_Credentials]({{ site.baseurl }}/account-keys/default#ctr_credentials) | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Created by default |
