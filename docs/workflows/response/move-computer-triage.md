---
layout: page
title: Move Computer to AMP Triage Group
permalink: /workflows/response/move-computer-triage
parent: Response Workflows
grand_parent: Workflows
---

# Move Computer to AMP Triage Group
<div markdown="1">
Response Workflow
{: .label }
</div>

This workflow should be triggered from a SecureX pivot menu and supports IP address, hostname, and AMP computer GUID observables. When triggered, this workflow attempts to move the computer provided as the observable to the group configured in the workflow.

---

## Requirements
* The following atomic actions must be imported before you can import this workflow:
	* AMP - Get Connector GUID ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
	* AMP - Get Group by Name ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
	* AMP - Move Computer to Group ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
* An active AMP for Endpoints account

---

## Workflow Steps
1. Check that a supported observable was provided as input
1. If a GUID wasn't provided, convert the observable provided into the computer's AMP GUID
1. Look up the triage group provided and get its GUID
1. Request the computer be moved to the triage group

---

## Configuration
* Provide the name of the group you want computers moved to in the `Triage Group Name` local variable
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
