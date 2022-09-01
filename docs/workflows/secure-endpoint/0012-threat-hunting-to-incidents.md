---
layout: page
title: Threat Hunting Events to Incidents
permalink: /workflows/secure-endpoint/0012-threat-hunting-to-incidents
redirect_from:
  - /workflows/0012
parent: Cisco Secure Endpoint
grand_parent: Workflows
---

# Threat Hunting Events to Incidents
<div markdown="1">
Workflow #0012
{: .label }
</div>

This workflow periodically checks Cisco Secure Endpoint for SecureX Threat Hunting events. When an event is returned, the workflow collects information from it and creates a casebook and incident in Cisco SecureX to document what happened. This workflow is designed to run every 5 minutes on a schedule.

<div class="cisco-alert cisco-alert-info"><i class="fa fa-info-circle mr-1 cisco-icon-info"></i> This workflow has been updated to use the new "SecureX Token" account key. For more information about this, please see <a href="{{ site.baseurl }}/account-keys/securex-token">this page</a>. If you want to use legacy authentication, you can import an older version of the workflow.</div>

[<i class="fab fa-github"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0012-SecureEndpoint-ThreatHuntingEventsToIncidents__definition_workflow_01M2FIQ8COLYA7BMDsc3UeOgYjJxoF9WFZ1){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Feb 19, 2021 | - Initial release |
| Sep 10, 2021 | - Updated to use the new [system atomics]({{ site.baseurl }}/atomics/system) |
| Aug 31, 2022 | - Updated to support [SecureX Tokens]({{ site.baseurl }}/account-keys/securex-token) |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* Threat Response - Create Casebook
	* Threat Response - Create Incident
	* Threat Response - Create Relationship
	* Threat Response - Create Sighting
* The following atomic actions must be imported before you can import this workflow:
	* None
* The [targets](#targets) and [account keys](#account-keys) listed at the bottom of the page
* Cisco Secure Endpoint

---

## Workflow Steps
1. Detect the region/environment being used
1. Calculate date/times
1. Fetch events from Secure Endpoint
1. Check if events were returned, if not end the workflow
1. For each event:
	* Extract the event's information
	* Format the information for SecureX
	* Create an incident, casebook, and sighting

---

## Configuration
* By default, the workflow is configured to run every 5 minutes using the **0012 - Secure Endpoint - Threat Hunting Events to Incidents** [schedule]({{ site.baseurl }}/schedules/). When you import the workflow, the schedule trigger will be disabled. To enable the schedule:
	* Open the workflow in the workflow editor
	* Scroll down to the **Triggers** section of the workflow's properties and click **Secure Endpoint Event Polling**
	* Uncheck the **Disable Trigger** box and click **Save**

### Activities
* If you change the schedule for this workflow, you will need to adjust the `Calculate time 5 minutes ago` activity's `Adjustment` input variable to match the new schedule. As in, if you change the schedule to every 10 minutes, you would need to subtract `600` seconds instead of `300`
* All of the Threat Response activities default to a `TLP Value` of `amber`. You can modify this if you want to use different values

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| [AMP_Target]({{ site.baseurl }}/targets/default#amp_target) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `api.amp.cisco.com`<br />_Path:_ `/v1` | AMP_Credentials | Created by default |
| [Private_CTIA_Target]({{ site.baseurl }}/targets/default#private_ctia_target) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `private.intel.amp.cisco.com`<br />_Path:_ None | CTR_Credentials | Created by default |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| [AMP_Credentials]({{ site.baseurl }}/account-keys/default#amp_credentials) | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Created by default |
| [CTR_Credentials]({{ site.baseurl }}/account-keys/default#ctr_credentials) | SecureX Token | | See [this page]({{ site.baseurl }}/account-keys/securex-token) |
