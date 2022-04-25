---
layout: page
title: Take Orbital Forensic Snapshot
permalink: /workflows/default/D002-take-forensic-snapshot
redirect_from:
  - /workflows/D002
  - /workflows/response/take-snapshot
parent: Out of the Box Workflows
grand_parent: Workflows
---

# Take Orbital Forensic Snapshot
<div markdown="1">
Out of Box
{: .label }

Response Workflow
{: .label }
</div>

This workflow initiates a Cisco Orbital forensic snapshot for the endpoint identified by the provided observable. Supported observables: `ip`, `mac_address`, `amp_computer_guid`

---

## Change Log

| Date | Notes |
|:-----|:------|
| Jun 29, 2020 | - Initial release |
| Sep 10, 2021 | - Updated to use the new [system atomics]({{ site.baseurl }}/atomics/system) |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* Orbital - Query Endpoint
	* Threat Response - Generate Access Token
* The following atomic actions must be imported before you can import this workflow:
	* None
* The [targets](#targets) and [account keys](#account-keys) listed at the bottom of the page
* Cisco Secure Endpoint with Orbital

---

## Workflow Steps
1. Make sure the observable is supported and set the corresponding local variable
1. Generate an access token for Orbital
1. Execute a forensic snapshot

---

## Configuration
* If you want to change the name of this workflow in the pivot menu, change its display name

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| [Orbital_For_Access_Token]({{ site.baseurl }}/targets/default#orbital_for_access_token) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `visibility.amp.cisco.com`<br />_Path:_ `/iroh` | Orbital_Credentials | Created by default |
| [Orbital_Target]({{ site.baseurl }}/targets/default#orbital_target) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `orbital.amp.cisco.com`<br />_Path:_ `/v0` | None | Created by default |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| [Orbital_Credentials]({{ site.baseurl }}/account-keys/default#orbital_credentials) | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Created by default |
