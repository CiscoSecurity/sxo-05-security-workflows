---
layout: page
title: Quarantine Endpoint
permalink: /workflows/ise/0027-quarantine-endpoint
redirect_from:
  - /workflows/0027
parent: Cisco Identity Services Engine
grand_parent: Workflows
---

# Quarantine Endpoint
<div markdown="1">
Workflow #0027
{: .label }

Response Workflow
{: .label }
</div>

This workflow quarantines an endpoint in Cisco Identity Services Engine (ISE) by applying an Adaptive Network Control (ANC) policy.

[<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0027-ISE-QuarantineEndpoint__definition_workflow_01O39GXAGAAR65AsfAl2NPgy97Z8XcT6Bir){: .btn-cisco-outline }

---

## Requirements
* The following atomic actions must be imported before you can import this workflow:
	* ISE - ERS - ANC Policy - Apply to Endpoint ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))

---

## Workflow Steps
1. Make sure the observable type provided is supported
1. Apply the ANC policy to the endpoint

---

## Configuration
* Set the `ANC Policy Name` local variable to the name of the ANC policy to apply
* If you want to change the name of this workflow in the pivot menu, change its display name

---

## Targets
**Note:** If your Cisco ISE deployment is on-premise, you will need a [SecureX Orchestration Remote]({{ site.baseurl }}/remote) to use ISE with orchestration.

Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| Cisco ISE ERS | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `ISE Primary Admin Node`<br />_Port:_ `9060`<br />_Path:_ None | ISE_ERS_Credentials | |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| ISE_ERS_Credentials | HTTP Basic Authentication | _Username:_ ISE Username<br />_Password:_ ISE Password | Must have ERS Admin permission |
