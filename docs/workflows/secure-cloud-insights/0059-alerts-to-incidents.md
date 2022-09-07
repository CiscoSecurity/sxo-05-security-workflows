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

<div class="cisco-alert cisco-alert-info"><i class="fa fa-info-circle mr-1 cisco-icon-info"></i> This workflow has been updated to use the new "SecureX Token" account key. For more information about this, please see <a href="{{ site.baseurl }}/account-keys/securex-token">this page</a>. If you want to use legacy authentication, you can import an older version of the workflow.</div>

[<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0059-SecureCloudInsights-AlertsToSecureXIncidents__definition_workflow_01U5UAE90VQDP6U6FZxNrl82NTm006epOzo){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Feb 10, 2022 | - Initial release |
| Sep 7, 2022 | - Updated to support [SecureX Tokens]({{ site.baseurl }}/account-keys/securex-token) |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* Threat Response - Create Incident
* The following atomic actions must be imported before you can import this workflow:
	* None
* The [targets](#targets) and [account keys](#account-keys) listed at the bottom of the page
* Cisco Secure Cloud Insights

---

## Workflow Steps
1. Extract the data from the alert JSON
1. Check if extraction was successful
	* If not, end the workflow
1. Format the event data
1. Create a new incident

---

## Configuration
* When you import this workflow, a [webhook]({{ site.baseurl}}/webhooks/), [event]({{ site.baseurl }}/events/), and [trigger]({{ site.baseurl }}/workflows/triggers}}) will be created. You'll need to go to the webhooks section of SecureX orchestration to get your webhook's URL. Then, you need to configure Secure Cloud Insights to send alerts to this URL.

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| [Private_CTIA_Target]({{ site.baseurl }}/targets/default#private_ctia_target) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `private.intel.amp.cisco.com`<br />_Path:_ None | CTR_Credentials | Created by default |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| [CTR_Credentials]({{ site.baseurl }}/account-keys/default#ctr_credentials) | SecureX Token | | See [this page]({{ site.baseurl }}/account-keys/securex-token) |
