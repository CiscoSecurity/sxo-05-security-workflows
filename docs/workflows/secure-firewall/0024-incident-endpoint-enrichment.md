---
layout: page
title: Incident Endpoint Enrichment
permalink: /workflows/secure-firewall/0024-incident-endpoint-enrichment
redirect_from:
  - /workflows/0024
parent: Cisco Secure Firewall
grand_parent: Workflows
---

# Incident Endpoint Enrichment
<div markdown="1">
Workflow #0024
{: .label }
</div>

This workflow fetches Cisco Secure Firewall incidents and conducts automated enrichment to see if additional data can be found about the endpoint that caused the event. The source of the event is searched in Cisco Secure Endpoint and if a matching endpoint is found, a casebook and sighting are created with more details.

[<i class="fab fa-github"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0024-SecureFirewall-IncidentEndpointEnrichment__definition_workflow_01NPOZ03BG2940UfR9fu52FEB9vU797YVBd){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Apr 19, 2021 | - Initial release |
| Sep 10, 2021 | - Updated to use the new [system atomics]({{ site.baseurl }}/atomics/system) |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* Secure Endpoint - Get Computer by GUID
	* Secure Endpoint - Get Connector GUID
	* Threat Response - Generate Access Token
	* Threat Response - Create Casebook
	* Threat Response - Create Relationship
	* Threat Response - Create Sighting
* The following atomic actions must be imported before you can import this workflow:
	* None
* The [targets](#targets) and [account keys](#account-keys) listed below
* Cisco Secure Endpoint

---

## Workflow Steps
1. Generate an access token for Threat Response
1. Fetch incidents for the past hour
1. Loop through each incident:
	* Get the incident's relationships
	* Refresh the Threat Response token (if necessary)
	* Loop through each relationship:
		* Extract the sighting ID and fetch it
		* Extract the target IP from the sighting
		* Check if we got an IP address:
			* Search the IP in Secure Endpoint
			* If an endpoint was found:
				* Fetch its details
				* Create a casebook and more detailed sighting

---

## Configuration
* By default, the workflow is configured to run every hour using the **0024 - Secure Firewall - Incident Endpoint Enrichment** [schedule]({{ site.baseurl }}/schedules/). When you import the workflow, the schedule trigger will be disabled. To enable the schedule:
	* Open the workflow in the workflow editor
	* Scroll down to the **Triggers** section of the workflow's properties and click **Firewall Incident Polling**
	* Uncheck the **Disable Trigger** box and click **Save**

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| [AMP_Target]({{ site.baseurl }}/targets/default#amp_target) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `api.amp.cisco.com`<br />_Path:_ `/v1` | AMP_Credentials | Created by default |
| [CTR_For_Access_Token]({{ site.baseurl }}/targets/default#ctr_for_access_token) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `visibility.amp.cisco.com`<br />_Path:_ `/iroh` | CTR_Credentials | Created by default |
| [Private_CTIA_Target]({{ site.baseurl }}/targets/default#private_ctia_target) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `private.intel.amp.cisco.com`<br />_Path:_ None | None | Created by default |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| [AMP_Credentials]({{ site.baseurl }}/account-keys/default#amp_credentials) | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Created by default |
| [CTR_Credentials]({{ site.baseurl }}/account-keys/default#ctr_credentials) | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Created by default |