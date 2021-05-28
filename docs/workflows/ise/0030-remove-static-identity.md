---
layout: page
title: Remove Endpoint from Identity Group
permalink: /workflows/ise/0030-remove-static-identity
redirect_from:
  - /workflows/0030
parent: Cisco Identity Services Engine
grand_parent: Workflows
---

# Remove Endpoint from Identity Group
<div markdown="1">
Workflow #0030
{: .label }

Response Workflow
{: .label }
</div>

This workflow removes a static identity group assignment from a MAC address in Cisco Identity Services Engine (ISE). Note that this workflow does not move the endpoint back to an "Unknown" status. This means the endpoint may stay in the identity group until it's reprofiled and moved elsewhere.

[<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0030-ISE-RemoveEndpointFromIdentityGroup__definition_workflow_01O4672ZYS2D51XvK1Z5YkQO1YgjBHeAuiU){: .btn-cisco-outline }

---

## Requirements
* The following atomic actions must be imported before you can import this workflow:
	* ISE - ERS - Endpoint - Search ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* ISE - ERS - Endpoint - Update Identity Group ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))

---

## Workflow Steps
1. Make sure the observable type provided is supported
1. Make sure the endpoint exists and get its ID
1. Reset the endpoint's static group assignment

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
