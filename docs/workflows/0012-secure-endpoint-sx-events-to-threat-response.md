---
layout: page
title: Secure Endpoint - Threat Hunting Events to Incidents
permalink: /workflows/0012-secure-endpoint-sx-events-to-threat-response
parent: Workflows
---

# Secure Endpoint - Threat Hunting Events to Incidents
<div markdown="1">
Workflow #0012
{: .label }
</div>

This workflow monitors a Secure Endpoint (AMP) instance for SecureX Threat Hunting events. Events are checked every 5 minutes. When an event is received, the workflow collects information from the event and creates a casebook, incident, and any relevent sightings in Threat Response.

[<i class="fab fa-github"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows0012-Workflow-Name__definition_workflow_unique_id){: .btn-cisco-outline }

---

## Requirements
* The following atomic actions must be imported before you can import this workflow:
	* Threat Response v2 - Create Casebook ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
	* Threat Response v2 - Create Incident ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
	* Threat Response v2 - Create Relationship ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
	* Threat Response v2 - Create Sighting ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
	* Threat Response v2 - Generate Access Token ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))

Note: To ensure the best experience with this workflow, be sure to import the latest version of this atomic from the `GitHub_Target_Atomics` repository!

---

## Important Notes
* See [this page]({{ site.baseurl }}/notes) for other important information about SecureX orchestration.

---

## Workflow Steps
This workflow is designed to be triggered by a [schedule]({{ site.baseurl }}/schedules) and then add it as a [trigger]({{ site.baseurl }}/workflows/triggers) within the workflow.

1. Calculate and format the dates needed to look for events
1. Fetch any matching events that occured in the last 5 minutes
	* No events returned
		* End workflow
1. Iterate through each result and build a table of attributes from the event:
	* Endpoint information
	* Threat hunting event details
1. Assemble the text for the Threat Response description and summary:
	* Casebook
    * Incident
1. Create the Threat Response Incident and Relate the following:
	* Casebook
	* Incident
	* Sightings

---

## Configuration
* If you want the workflow to run on a schedule, you need to create a [schedule]({{ site.baseurl }}/schedules) and then add it as a [trigger]({{ site.baseurl }}/workflows/triggers) within the workflow

### Local Variables
* Set `Variable Name` to the <description of value>

### Activities
* Set `Input Variable Name` on `Name of Activity`

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