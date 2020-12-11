---
layout: page
title: AMP Host Isolation with Tier 2 Approval
permalink: /workflows/response/host-isolation-with-approval
parent: Response Workflows
grand_parent: Workflows
---

# AMP Host Isolation with Tier 2 Approval
<div markdown="1">
Response Workflow
{: .label }
</div>

This workflow should be triggered from a SecureX pivot menu and supports AMP computer GUID observables. When triggered, this workflow will create an approval task requesting to enable host isolation for the computer provided as the observable. If approval is obtained, isolation is enabled. If approval is not obtained, the workflow takes no action.

---

## Requirements
* The following atomic actions must be imported before you can import this workflow:
	* CTRGenerateAccessToken ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
	* CTR List Actions ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
	* CTR Trigger an Action ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
* An active AMP for Endpoints account

---

## Workflow Steps
1. Check that a supported observable was provided as input
1. Get a list of available actions from Threat Response
1. Create the approval task
1. (Optional) Send an email notification (also requires an SMTP Target)
1. Wait for approval
1. If approved, trigger the host isolation action through Threat Response

---

## Configuration
* Provide the name of your AMP Threat Response module in the `AMP module name` local variable
* If you want to change the name of this workflow in the pivot menu, change its display name

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| [CTR_For_Access_Token]({{ site.baseurl }}/targets/default#ctr_for_access_token) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `visibility.amp.cisco.com`<br />_Path:_ `/iroh` | CTR_Credentials | Created by default |
| [CTR_API]({{ site.baseurl }}/targets/default#ctr_api) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `visibility.amp.cisco.com`<br />_Path:_ `/iroh` | None | Created by default |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| [CTR_Credentials]({{ site.baseurl }}/account-keys/default#ctr_credentials) | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Created by default |
