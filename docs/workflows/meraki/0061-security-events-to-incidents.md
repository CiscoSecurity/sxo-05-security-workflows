---
layout: page
title: MX Security Events to Incidents
permalink: /workflows/umbrella/0061-security-events-to-incidents
redirect_from:
  - /workflows/0061
parent: Cisco Meraki
grand_parent: Workflows
---

# MX Security Events to Incidents
<div markdown="1">
Workflow #0061
{: .label }
</div>

This workflow fetches security events for the last hour from Meraki for a specific organization. If there are any Malware Downloaded or IDS Priority 1 events, a sighting and incident are created in Threat Response and a Webex message is sent.

Contributed by: [Christopher van der Made](https://github.com/chrivand/)

<div class="cisco-alert cisco-alert-info"><i class="fa fa-info-circle mr-1 cisco-icon-info"></i> This workflow has been updated to use the new "SecureX Token" account key. For more information about this, please see <a href="{{ site.baseurl }}/account-keys/securex-token">this page</a>. If you want to use legacy authentication, you can import an older version of the workflow.</div>

[<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0061-Meraki-MX-SecurityEventsToIncidents__definition_workflow_01S26OGJ17BMU4bSaWxdgVB4MNvHmqUY3S2){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Apr 25, 2022 | - Initial release |
| Sep 7, 2022 | - Updated to support [SecureX Tokens]({{ site.baseurl }}/account-keys/securex-token) |

_See the [Important Notes]({{ site.baseurl }}/notes#workflows) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* Threat Response - Create Incident
	* Threat Response - Create Relationship
	* Threat Response - Create Sighting
	* Webex - Post Message to Room
	* Webex - Search for Room
* The following atomic actions must be imported before you can import this workflow:
	* None
* The [targets](#targets) and [account keys](#account-keys) listed at the bottom of the page
* Cisco Meraki MX Firewall
* (Optional) Cisco Webex

---

## Workflow Steps
1. Fetch global variables
1. Calculate the time 1 hour ago
1. Make sure the Webex room exists
1. Fetch security events from Meraki
1. Check if the events were retrieved successfully:
1. If not, end the workflow
1. If they were:
	* Loop through each event checking if it's an event type we care about
	* If it is, strip the ports from the IPs, create the Threat Response objects, and send a Webex message

---

## Configuration
* Set the `Meraki Organization ID` local variable to the ID of the organization you want to fetch security events for
* Provide the workflow your Meraki API key by either:
	* Storing your token in a [global variable]({{ site.baseurl }}/variables/global) and using the `Fetch Global Variables` group at the beginning of the workflow to update the `Meraki API Key` local variable; or
	* Disable the `Fetch Global Variables` group and add your token directly to the `Meraki API Key` local variable
* See [this page]({{ site.baseurl }}/atomics/configuration/webex#configuring-our-workflows) for information on configuring the workflow for Webex

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| Cisco Meraki | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `api.meraki.com`<br />_Path:_ `/api` | None | |
| [Private_CTIA_Target]({{ site.baseurl }}/targets/default#private_ctia_target) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `private.intel.amp.cisco.com`<br />_Path:_ None | None | Created by default |
| Webex Teams | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `webexapis.com`<br />_Path:_ None | None | Not necessary if Webex activities are removed |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| [CTR_Credentials]({{ site.baseurl }}/account-keys/default#ctr_credentials) | SecureX Token | | See [this page]({{ site.baseurl }}/account-keys/securex-token) |
