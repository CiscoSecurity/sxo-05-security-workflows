---
layout: page
title: Ransomware Alerts to SecureX
permalink: /workflows/cohesity/0043-ransomware-alerts-to-securex
redirect_from:
  - /workflows/0043
parent: Cohesity Helios
grand_parent: Workflows
---

# Ransomware Alerts to SecureX
<div markdown="1">
Workflow #0043
{: .label }
</div>

<div class="cisco-alert cisco-alert-info"><i class="fa fa-info-circle mr-1 cisco-icon-info"></i> This workflow was developed and is supported by Cohesity</div>

This workflow pushes Cohesity Helios ransomware alerts to SecureX Threat Response incidents with matching sightings.

[<i class="fab fa-github"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0043-CohesityHelios-RansomwareAlertsToSecureX__definition_workflow_01RKLTSUWK0265kieDhzvjJkjC2VvL2cQW7){: .btn-cisco-outline }

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
	* None
* Cohesity Helios

---

## Workflow Steps
1. Execute a Python script to fetch alerts from Cohesity and create corresponding incidents in SecureX

---

## Configuration
* Set the `Helios API Key` local variable to your Cohesity Helios API key
* Set the `SecureX API Client ID` and `SecureX API Secret` local variables to your API client's ID and secret ([more information]({{ site.baseurl }}/workflows/response/tr-api#generating-an-api-client))
* Set the `Number of Hours` local variable to the number of hours ago you want to start fetching alerts from
* If you want the workflow to run automatically, enable the `Cohesity Ransomware Alerts` [trigger]({{ site.baseurl }}/workflows/triggers) in the workflow's property to enable it to run on a [schedule]({{ site.baseurl }}/schedules)
