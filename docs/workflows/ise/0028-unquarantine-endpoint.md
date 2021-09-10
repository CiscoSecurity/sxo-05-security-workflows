---
layout: page
title: UnQuarantine Endpoint
permalink: /workflows/ise/0028-unquarantine-endpoint
redirect_from:
  - /workflows/0028
parent: Cisco Identity Services Engine
grand_parent: Workflows
---

# UnQuarantine Endpoint
<div markdown="1">
Workflow #0028
{: .label }

Response Workflow
{: .label }
</div>

This workflow removes an endpoint from quarantine in Cisco Identity Services Engine (ISE) by clearing its ANC Policy assignments. Supported observable: `mac_address`

[<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0028-ISE-UnQuarantineEndpoint__definition_workflow_01O3B646121ZW3GCZiNVPrwXwn7B87qf2vm){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| May 26, 2021 | - Initial release |
| September 2021 | - Updated to use the new [system atomics]({{ site.baseurl }}/atomics/system) |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* ISE - ERS - ANC Policy - Clear from Endpoint
* The following atomic actions must be imported before you can import this workflow:
	* None
* The [targets](#targets) and [account keys](#account-keys) listed below
* Cisco Identity Services Engine (ISE)

---

## Workflow Steps
1. Make sure the observable type provided is supported
1. Clear the ANC policies from the endpoint

---

## Configuration
* If you want to change the name of this workflow in the pivot menu, change its display name

---

## Targets
**Note:** If your Cisco ISE deployment is on-premise, you will need a [SecureX orchestration remote]({{ site.baseurl }}/remote) to use ISE with orchestration.

Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| Cisco ISE ERS | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `ISE Primary Admin Node`<br />_Port:_ `9060`<br />_Path:_ None | ISE_ERS_Credentials | |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| ISE_ERS_Credentials | HTTP Basic Authentication | _Username:_ ISE Username<br />_Password:_ ISE Password | Must have ERS Admin permission |
