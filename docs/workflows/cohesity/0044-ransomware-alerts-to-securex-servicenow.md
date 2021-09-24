---
layout: page
title: Ransomware Alerts to SecureX and ServiceNow
permalink: /workflows/cohesity/0044-ransomware-alerts-to-securex-servicenow
redirect_from:
  - /workflows/0044
parent: Cohesity Helios
grand_parent: Workflows
---

# Ransomware Alerts to SecureX and ServiceNow
<div markdown="1">
Workflow #0044
{: .label }
</div>

<div class="cisco-alert cisco-alert-info"><i class="fa fa-info-circle mr-1 cisco-icon-info"></i> This workflow was developed and is supported by Cohesity</div>

This workflow pushes Cohesity Helios ransomware alerts to SecureX Threat Response incidents with matching sightings and ServiceNow incidents.

[<i class="fab fa-github"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0044-CohesityHelios-RansomwareAlertsToSecureXServiceNow__definition_workflow_01OVNVYV935GN5mlOJNnVegUF8EKrhZudRi){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Sep 24, 2021 | - Initial release |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* None
* The following atomic actions must be imported before you can import this workflow:
	* ServiceNow - Create Incident ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
* The [targets](#targets) and [account keys](#account-keys) listed below
* Cohesity Helios
* ServiceNow

---

## Workflow Steps
1. Execute a Python script to fetch alerts from Cohesity and create corresponding incidents in SecureX
1. Convert the list of alerts to a table
1. For each alert:
  * Create a ServiceNow incident

---

## Configuration
* Set the `Helios API Key` local variable to your Cohesity Helios API key
* Set the `SecureX API Client ID` and `SecureX API Secret` local variables to your API client's ID and secret ([more information]({{ site.baseurl }}/workflows/response/tr-api#generating-an-api-client))
* Set the `Number of Hours` local variable to the number of hours ago you want to start fetching alerts from
* Set the `ServiceNow User ID` local variable to the username you want incidents opened as. This can either match the username in your ServiceNow **Account Key** or, if the account has the appropriate permissions, can be a different user
* If you want the workflow to run automatically, enable the `Cohesity Ransomware Alerts` [trigger]({{ site.baseurl }}/workflows/triggers) in the workflow's property to enable it to run on a [schedule]({{ site.baseurl }}/schedules)

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| ServiceNow | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `<instance>.service-now.com`<br />_Path:_ `/api` | ServiceNow_Credentials | Be sure to use your instance URL |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| ServiceNow_Credentials | HTTP Basic Authentication | _Username:_ ServiceNow User ID<br />_Password:_ ServiceNow Password | |
