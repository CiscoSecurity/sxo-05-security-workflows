---
layout: page
title: Generate Casebook with Flow Links
permalink: /workflows/sca/0005-generate-casebook
parent: Secure Cloud Analytics
grand_parent: Workflows
---

# Generate Casebook with SCA Flow Links
<div markdown="1">
Workflow #0005
{: .label }

Response Workflow
{: .label }
</div>

This workflow should be triggered from a SecureX pivot menu and supports IP address observables. When triggered, this workflow generates a Threat Response casebook with links to investigate the IP address in Secure Cloud Analytics (SCA).

[<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0005-SCA-GenerateCasebookWithFlowLinks__definition_workflow_01JQ5LGT2UB1G2SLd05xQjb0EZz2HZn3c0d){: .btn-cisco-outline }

---

## Requirements
* The following atomic actions must be imported before you can import this workflow:
	* CTRGenerateAccessToken ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
	* CTR Create Casebook ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
* A Secure Cloud Analytics instance

---

## Workflow Steps
1. Calculate date 7 days ago
1. Format 7 days ago date to SCA format
1. Format today's date to SCA format
1. Generate Threat Response access token
1. Create casebook with investigation links

---

## Configuration
* Set your SCA instance URL in the `SCA Instance URL` local variable
* If you want to change the name of this workflow in the pivot menu, change its display name

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| [CTR_For_Access_Token]({{ site.baseurl }}/targets/default#ctr_for_access_token) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `visibility.amp.cisco.com`<br />_Path:_ `/iroh` | CTR_Credentials | Created by default |
| [Private_CTIA_Target]({{ site.baseurl }}/targets/default#private_ctia_target) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `private.intel.amp.cisco.com`<br />_Path:_ None | None | Created by default |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| [CTR_Credentials]({{ site.baseurl }}/account-keys/default#ctr_credentials) | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Created by default |
