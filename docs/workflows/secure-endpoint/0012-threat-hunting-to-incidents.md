---
layout: page
title: Threat Hunting Events to Incidents
permalink: /workflows/secure-endpoint/0012-threat-hunting-to-incidents
parent: Cisco Secure Endpoint
grand_parent: Workflows
---

# Threat Hunting Events to Incidents
<div markdown="1">
Workflow #0012
{: .label }
</div>

This workflow periodically checks a Secure Endpoint (formerly AMP for Endpoints) instance for SecureX Threat Hunting events. When an event is returned, the workflow collects information from it and creates a casebook and incident in Threat Response to document what happened. This workflow is designed to run every 5 minutes on a schedule.

[<i class="fab fa-github"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0012-SecureEndpoint-ThreatHuntingEventsToIncidents__definition_workflow_01M2FIQ8COLYA7BMDsc3UeOgYjJxoF9WFZ1){: .btn-cisco-outline }

---

## Requirements
* The following atomic actions must be imported before you can import this workflow:
	* Threat Response v2 - Create Casebook ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
	* Threat Response v2 - Create Incident ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
	* Threat Response v2 - Create Relationship ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
	* Threat Response v2 - Create Sighting ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
	* Threat Response v2 - Generate Access Token ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))

---

## Workflow Steps

1. Detect the region/environment being used
1. Calculate date/times
1. Fetch events from Secure Endpoint
1. Check if events were returned, if not end the workflow
1. For each event:
	* Extract the event's information
	* Format the information for Threat Response
	* Create an incident, casebook, and sighting

---

## Configuration
* By default, the workflow is configured to run every 5 minutes using the **0012 - Secure Endpoint - Threat Hunting Events to Incidents** [schedule]({{ site.baseurl }}/schedules). When you import the workflow, the schedule trigger will be disabled. To enable the schedule:
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
| [CTR_API]({{ site.baseurl }}/targets/default#ctr_api) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `visibility.amp.cisco.com`<br />_Path:_ `/iroh` | None | Created by default |
| [CTR_For_Access_Token]({{ site.baseurl }}/targets/default#ctr_for_access_token) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `visibility.amp.cisco.com`<br />_Path:_ `/iroh` | CTR_Credentials | Created by default |
| [Private_CTIA_Target]({{ site.baseurl }}/targets/default#private_ctia_target) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `private.intel.amp.cisco.com`<br />_Path:_ None | None | Created by default |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| [AMP_Credentials]({{ site.baseurl }}/account-keys/default#amp_credentials) | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Created by default |
| [CTR_Credentials]({{ site.baseurl }}/account-keys/default#ctr_credentials) | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Created by default |