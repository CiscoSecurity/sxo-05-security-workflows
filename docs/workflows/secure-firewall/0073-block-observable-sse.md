---
layout: page
title: Block Observable (SSE)
permalink: /workflows/secure-firewall/0073-block-observable-sse
redirect_from:
  - /workflows/0073
parent: Cisco Secure Firewall
grand_parent: Workflows
---

# Block Observable (SSE)
<div markdown="1">
Workflow #0073
{: .label }

Response Workflow
{: .label }
</div>

This workflow takes a URL, domain, IP, or IPv6 observable as input and blocks it on the Secure Firewall Management Center. The observable is added to a new object and the new object is added to an existing object group. A confirmation is sent via Webex. Supported observables: `url`, `ip`, `ipv6`, `domain`

<div class="cisco-alert cisco-alert-info"><i class="fa fa-info-circle mr-1 cisco-icon-info"></i> There are two different ways to integrate Secure Firewall with orchestration. For more information about these two methods and which to use, please see <a href="{{ site.baseurl }}/workflows/secure-firewall/api-types">this page</a>.</div>

<div class="cisco-alert cisco-alert-info"><i class="fa fa-info-circle mr-1 cisco-icon-info"></i> This workflow expects the new "SecureX Token" account key. For more information about this, please see <a href="{{ site.baseurl }}/account-keys/securex-token">this page</a>.</div>

[<i class="fab fa-github"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0073-SecureFirewall-BlockObservableSSE__definition_workflow_01ZGR1J34II7K4n5GOI9XQI9Aydicwr9Zm4){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Sep 7, 2022 | - Initial release |

_See the [Important Notes](/sxo-05-security-workflows/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics](/sxo-05-security-workflows/atomics/system) are used by this workflow:
	* Secure Firewall - SSE - Add Network Object to Network Group
	* Secure Firewall - SSE - Add URL Object to URL Group
	* Secure Firewall - SSE - Create Object
	* Secure Firewall - SSE - Get Network Group by Name
	* Secure Firewall - SSE - Get URL Group by Name
	* Secure Firewall - SSE - Search object by Value
	* Webex - Post Message to Room
	* Webex - Search for Room
* The [targets](#targets) and [account keys](#account-keys) listed at the bottom of the page
* Cisco Secure Firewall (software version 7.2 or newer)
* Cisco Webex

---

## Workflow Steps
1. Fetch global variables
1. Set the workflow run URL based on region
1. Search for the Webex room provided
1. Validate required variables are provided
1. Set the object types based on the observable type
1. Search for existing objects for this observable
1. Check if an object already exists:
	* If it does, use the existing object
	* If it doesn't, create a new object
1. Check if we're working with network or URL objects:
	* If network objects:
		* Get the network group and check if the object is already in it (if so, end the workflow)
		* Add the object to the group and send a confirmation
	* If URL objects:
		* Get the URL group and check if the object is already in it (if so, end the workflow)
		* Add the object to the group and send a confirmation

---

## Configuration

* Configure the following local variables with the options you want for your Secure Firewall Management Center:
	* Access Control Policy
	* Access Rule
	* Object Name Prefix
	* URL Group
	* Network Group
* Set the `Domain UUID` to the UUID of the FMC domain you want the workflow to make changes to. If you're using the default domain, you can leave the default value
* Set the `Device ID` to the ID of the device to send the command to in SSE. This can be obtained from the device's summary page in SSE, the Devices page in the Administration section of SecureX, or by using the "SecureX - SSE Proxy - List Devices" atomic
* If you want to change the name of this workflow in the pivot menu, change its display name
* See [this page]({{ site.baseurl }}/atomics/configuration/webex#configuring-our-workflows) for information on configuring the workflow for Webex

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| [CTR_API]({{ site.baseurl }}/targets/default#ctr_api) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `visibility.amp.cisco.com`<br />_Path:_ `/iroh` | CTR_Credentials | Created by default |
| Webex Teams | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `webexapis.com`<br />_Path:_ None | None | |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| [CTR_Credentials]({{ site.baseurl }}/account-keys/default#ctr_credentials) | SecureX Token | | See [this page]({{ site.baseurl }}/account-keys/securex-token) |
