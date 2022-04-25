---
layout: page
title: Isolate Endpoints from Alerts
permalink: /workflows/secure-cloud-analytics/0014-isolate-endpoints-from-alerts
redirect_from:
  - /workflows/0014
parent: Cisco Secure Cloud Analytics
grand_parent: Workflows
---

# Isolate Endpoints from Alerts
<div markdown="1">
Workflow #0014
{: .label }
</div>

This workflow fetches alerts from Cisco Secure Cloud Analytics (SCA) for the past 24 hours based on the alert name and status provided. Observations are extracted from the alerts and devices are searched for in Cisco Secure Endpoint. If an endpoint is found, host isolation is enabled. Finally, a Webex Teams message is sent with a summary.

[<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0014-SCA-IsolateEndpointsFromAlerts__definition_workflow_01JQ060DZK6NK5xH8K3RAQLb9kkLPppMrQU){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Feb 25, 2021 | - Initial release |
| Sep 10, 2021 | - Updated to use the new [system atomics]({{ site.baseurl }}/atomics/system) |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following atomic actions must be imported before you can import this workflow:
	* Secure Endpoint - Get Connector GUID ([System Atomic]({{ site.baseurl }}/atomics/system))
	* Secure Endpoint - Isolate Host ([System Atomic]({{ site.baseurl }}/atomics/system))
	* SCA - Get Alerts ([System Atomic]({{ site.baseurl }}/atomics/system))
	* SCA - Get Device Details by ID ([System Atomic]({{ site.baseurl }}/atomics/system))
	* SCA - Get Observation Details by ID ([System Atomic]({{ site.baseurl }}/atomics/system))
	* Webex Teams - Post Message to Room ([System Atomic]({{ site.baseurl }}/atomics/system))
	* Webex Teams - Search for Room ([System Atomic]({{ site.baseurl }}/atomics/system))
* The [targets](#targets) and [account keys](#account-keys) listed at the bottom of the page
* A Webex Teams access token and room name to post messages to
* Cisco Secure Cloud Analytics (SCA)
* Cisco Secure Endpoint

---

## Workflow Steps
1. Fetch global variables
1. Calculate dates
1. Fetch alerts from Secure Cloud Analytics
1. Extract observations from the alerts
1. For each observation:
	* Fetch the observation's details and devices
	* Check if the device was already processed:
		* If it was, skip it
		* If it wasn't:
			* Get the device's details
			* Attempt to locate it in Secure Endpoint and, if it's found, isolate it
1. Send a Webex Teams message with a summary

---

## Configuration
* Set the `Secure Cloud Analytics Alert Name` local variable to the name of the alert type you want to respond to
* Set the `Secure Cloud Analytics Alert Status` local variable to the alert status you want to response to
* See [this page]({{ site.baseurl }}/atomics/configuration/webex#configuring-our-workflows) for information on configuring the workflow for Webex Teams

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| [AMP_Target]({{ site.baseurl }}/targets/default#amp_target) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `api.amp.cisco.com`<br />_Path:_ `/v1` | AMP_Credentials | Created by default |
| Secure Cloud Analytics | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `your-tenant.obsrvbl.com`<br />_Path:_ `api` | None | |
| Webex Teams | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `webexapis.com`<br />_Path:_ None | None | Not necessary if Webex Teams activities are removed |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| [AMP_Credentials]({{ site.baseurl }}/account-keys/default#amp_credentials) | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Created by default |
