---
layout: page
title: Take Forensic Snapshot and Isolate
permalink: /workflows/response/take-snapshot-isolate
redirect_from:
  - /workflows/D003
parent: Response Workflows
grand_parent: Workflows
---

# Take Forensic Snapshot and Isolate
<div markdown="1">
Out of Box
{: .label }

Response Workflow
{: .label }
</div>

This workflow initiates a Cisco Orbital forensic snapshot for the endpoint identified by the provided observable and then attempts to enable host isolation using Cisco Secure Endpoint. Supported observables: `ip`, `mac_address`, `amp_computer_guid`

---

## Change Log

| Date | Notes |
|:-----|:------|
| Jun 29, 2020 | - Initial release |
| September 2021 | - Updated to use the new [system atomics]({{ site.baseurl }}/atomics/system) |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* Orbital - Query Endpoint
	* Secure Endpoint - Get Connector GUID
	* Secure Endpoint - Isolate Host
	* Threat Response - Generate Access Token
* The following atomic actions must be imported before you can import this workflow:
	* None
* The [targets](#targets) and [account keys](#account-keys) listed below
*  Cisco Secure Endpoint with Orbital

---

## Workflow Steps
1. Make sure the observable is supported and set the corresponding local variable
1. If the observable wasn't a computer GUID, try getting a GUID from Secure Endpoint
1. Generate an access token for Orbital
1. Execute a forensic snapshot
1. If a GUID was found, request host isolation

---

## Configuration
* If you want to change the name of this workflow in the pivot menu, change its display name

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| [AMP_Target]({{ site.baseurl }}/targets/default#amp_target) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `api.amp.cisco.com`<br />_Path:_ `/v1` | AMP_Credentials | Created by default |
| [Orbital_For_Access_Token]({{ site.baseurl }}/targets/default#orbital_for_access_token) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `visibility.amp.cisco.com`<br />_Path:_ `/iroh` | Orbital_Credentials | Created by default |
| [Orbital_Target]({{ site.baseurl }}/targets/default#orbital_target) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `orbital.amp.cisco.com`<br />_Path:_ `/v0` | None | Created by default |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| [AMP_Credentials]({{ site.baseurl }}/account-keys/default#amp_credentials) | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Created by default |
| [Orbital_Credentials]({{ site.baseurl }}/account-keys/default#orbital_credentials) | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Created by default |
