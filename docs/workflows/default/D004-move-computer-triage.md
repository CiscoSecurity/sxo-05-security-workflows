---
layout: page
title: Move Computer to Triage Group
permalink: /workflows/default/D004-move-computer-triage
redirect_from:
  - /workflows/D004
  - /workflows/response/move-computer-triage
parent: Out of the Box Workflows
grand_parent: Workflows
---

# Move Computer to Triage Group
<div markdown="1">
Out of Box
{: .label }

Response Workflow
{: .label }
</div>

This workflow will move the endpoint identified by the provided observable to a triage device group in Cisco Secure Endpoint. Supported observables: `ip`, `hostname`, `amp_computer_guid`

[<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows-Default/D004-SecureEndpoint-MoveComputerToTriageGroup__definition_workflow_01R2NJSB9JFRK633nOAkT1cxLRDjSKU3h8L){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Jun 23, 2020 | - Initial release |
| Sep 10, 2021 | - Updated to use the new [system atomics]({{ site.baseurl }}/atomics/system) |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* Secure Endpoint - Get Connector GUID
	* Secure Endpoint - Get Group by Name
	* Secure Endpoint - Move Computer to Group
* The following atomic actions must be imported before you can import this workflow:
	* None
* The [targets](#targets) and [account keys](#account-keys) listed at the bottom of the page
* Cisco Secure Endpoint

---

## Workflow Steps
1. Make sure the observable is supported and set the corresponding local variable
1. If the observable wasn't a computer GUID, try getting a GUID from Secure Endpoint
1. Attempt to locate the triage group to get its ID
1. Move the computer to the group

---

## Configuration
* Set the `Triage Group Name` local variable to the name of the group you want to move computers to
* If you want to change the name of this workflow in the pivot menu, change its display name

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| [AMP_Target]({{ site.baseurl }}/targets/default#amp_target) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `api.amp.cisco.com`<br />_Path:_ `/v1` | AMP_Credentials | Created by default |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| [AMP_Credentials]({{ site.baseurl }}/account-keys/default#amp_credentials) | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Created by default |
