---
layout: page
title: Block Observables
permalink: /workflows/secure-firewall/0015B-block-observables
redirect_from:
  - /workflows/0015B
parent: Cisco Secure Firewall
grand_parent: Workflows
---

# Block Observables
<div markdown="1">
Workflow #0015B
{: .label }

Response Workflow
{: .label }
</div>

This workflow blocks an observable on Cisco Secure Firewall (formerly Firepower) by creating a judgement for it in SecureX Threat Response. Once a judgement is created, the observable will appear on a feed which Secure Firewall polls for observable information. Supported observable types: domain, ip, ipv6, sha256, url.

[<i class="fab fa-github"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0015B-SecureFirewall-BlockObservables__definition_workflow_01ML39FS25W1V5nR5onJGG8OBgXRuGG8y79){: .btn-cisco-outline }

---

## Requirements
* The following atomic actions must be imported before you can import this workflow:
	* Threat Response v2 - Create Relationship ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
	* Threat Response v2 - Generate Access Token ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))

---

## Important Notes
* You must create the required indicators and feeds in SecureX Threat Response by running workflow [015A]({{ site.baseurl }}/workflows/0015A) prior to using this workflow.

---

## Workflow Steps

1. Convert the observable type to the types we use when creating indicators
1. Check if the observable type is supported. If it isn't, end the workflow and return an error
1. Generate a Threat Response access token
1. Search for the indicator for this observable type
1. Check if we found the indicator. If not, end the workflow and return an error
1. Extract the indicator's ID
1. Create a judgement in Threat Response for the observable
1. Relate the judgement to the indicator

---

## Configuration
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
