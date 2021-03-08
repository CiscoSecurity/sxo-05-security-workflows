---
layout: page
title: Block Observables - Setup
permalink: /workflows/firepower/0015A-block-observables-setup
redirect_from:
  - /workflows/0015A
parent: Cisco Firepower
grand_parent: Workflows
---

# Block Observables - Setup
<div markdown="1">
Workflow #0015A
{: .label }
</div>

This workflow creates a series of indicators and feeds for various observable types in SecureX Threat Response. These feeds can then be added to Cisco Secure Firewall (formerly Firepower) to block observables at the firewall level.

NOTE: Atm the end of this workflow, the Output Text variable will contain the list of feed URLs you need to configure in your firewall.

More information: https://ciscosecurity.github.io/sxo-05-security-workflows/workflows/0015A

[<i class="fab fa-github"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0015A-SecureFirewall-Block-Observables-Setup__definition_workflow_xxx){: .btn-cisco-outline }

---

## Requirements
* The following atomic actions must be imported before you can import this workflow:
	* Threat Response v2 - Deliberate Observable ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
	* Threat Response v2 - Enrich Observable ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
	* Threat Response v2 - Generate Access Token ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
	* Threat Response v2 - List Response Actions ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
	* Threat Response v2 - Trigger Response Action ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))

---

## Workflow Steps

1. Fetch any necessary global variables and set the environment URLs for SecureX and Threat Response
1. Generate a Threat Response access token
1. For each observable type:
   * Search for an indicator for this observable type
   * Check if the indicator was found:
     * If it was, extract the indicator ID
     *If it wasn't, create the indicator
   * Search for a feed for this observable type
   * Check if the feed was found:
     * If it was, extract the feed view URL
     * If it wasn't, create the feed

---

## Configuration


### Local Variables


### Activities


---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| [CTR_API]({{ site.baseurl }}/targets/default#ctr_api) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `visibility.amp.cisco.com`<br />_Path:_ `/iroh` | None | Created by default |
| [CTR_For_Access_Token]({{ site.baseurl }}/targets/default#ctr_for_access_token) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `visibility.amp.cisco.com`<br />_Path:_ `/iroh` | CTR_Credentials | Created by default |
| [Private_CTIA_Target]({{ site.baseurl }}/targets/default#private_ctia_target) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `private.intel.amp.cisco.com`<br />_Path:_ None | None | Created by default |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| [CTR_Credentials]({{ site.baseurl }}/account-keys/default#ctr_credentials) | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Created by default |