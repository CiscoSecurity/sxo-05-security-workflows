---
layout: page
title: Microsoft Online Dynamic Object Update (SSE)
permalink: /workflows/secure-firewall/0071-microsoft-online-object-update-sse
redirect_from:
  - /workflows/0071
parent: Cisco Secure Firewall
grand_parent: Workflows
---

# Microsoft Online Dynamic Object Update (SSE)
<div markdown="1">
Workflow #0071
{: .label }
</div>

Microsoft provides a JSON-formatted feed of their networks and domains for their various cloud services. This workflow demonstrates fetching that JSON, reformatting it, and updating a dynamic object group on Cisco Secure Firewall.

<div class="cisco-alert cisco-alert-info"><i class="fa fa-info-circle mr-1 cisco-icon-info"></i> There are two different ways to integrate Secure Firewall with orchestration. For more information about these two methods and which to use, please see <a href="{{ site.baseurl }}/workflows/secure-firewall/api-types">this page</a>.</div>

<div class="cisco-alert cisco-alert-info"><i class="fa fa-info-circle mr-1 cisco-icon-info"></i> This workflow expects the new "SecureX Token" account key. For more information about this, please see <a href="{{ site.baseurl }}/account-keys/securex-token">this page</a>.</div>

[<i class="fab fa-github"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0071-SecureFirewall-MicrosoftOnlineDynamicObjectUpdateSSE__definition_workflow_01ZHJHOG8P15X1mOQ7ROXavXCDGx40495f9){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Sep 7, 2022 | - Initial release |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* Secure Firewall - SSE - Create Dynamic Object Group
	* Secure Firewall - SSE - Get Dynamic Object Group Mappings
	* Secure Firewall - SSE - Update Dynamic Object Group Mappings
* The following atomic actions must be imported before you can import this workflow:
	* None
* The [targets](#targets) and [account keys](#account-keys) listed at the bottom of the page
* Cisco Secure Firewall (software version 7.2 or newer)

---

## Workflow Steps
1. Get the existing dynamic object group mappings
1. Check if fetching the mappings succeeded (if not, create a new dynamic object group)
1. Fetch the JSON from Microsoft and generate a list of records to add and to remove
1. Check if any records need to be added (if so, add them)
1. Check if any records need to be removed (if so, remove them)

---

## Configuration
* Go to [Microsoft's website](http://aka.ms/ipurlws) to get the URL for the worldwide endpoint JSON. Click the link on the second bullet to `https://endpoints.office.com/endpoints/worldwide` and copy the URL into the `Microsoft Endpoints URL` local variable in the workflow
* Set the `Dynamic Object Group Name` local variable to the name of the object group you want to update. Note that this group must be created on Firewall Management Center prior to running the workflow
* Set the `Domain UUID` to the UUID of the FMC domain you want the workflow to make changes to. If you're using the default domain, you can leave the default value
* Set the `Device ID` to the ID of the device to send the command to in SSE. This can be obtained from the device's summary page in SSE, the Devices page in the Administration section of SecureX, or by using the "SecureX - SSE Proxy - List Devices" atomic

---

## Targets

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| [CTR_API]({{ site.baseurl }}/targets/default#ctr_api) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `visibility.amp.cisco.com`<br />_Path:_ `/iroh` | CTR_Credentials | Created by default |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| [CTR_Credentials]({{ site.baseurl }}/account-keys/default#ctr_credentials) | SecureX Token | | See [this page]({{ site.baseurl }}/account-keys/securex-token) |
