---
layout: page
title: Generate Casebook with Top Hosts and Peers
permalink: /workflows/secure-network-analytics/0034-generate-casebook-with-top-hosts-and-peers
redirect_from:
  - /workflows/0034
parent: Cisco Secure Network Analytics
grand_parent: Workflows
---

# Generate Casebook with Top Hosts and Peers
<div markdown="1">
Workflow #0034
{: .label }

Response Workflow
{: .label }
</div>

When triggered, this workflow fetches the top 10 hosts and peers that communicated with the IP address pivoted on from Secure Network Analytics. The lists of IPs are then added to a SecureX Threat Response casebook.

Hint: If you want to change the name of this workflow in the pivot menu, change its display name.

[<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/XXX){: .btn-cisco-outline }

---

## Requirements
* The following atomic actions must be imported before you can import this workflow:
	* SNA - Get Tenants ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* SNA - Get Tokens ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* SNA - Get Top Hosts by IP Address ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* SNA - Get Top Peers by IP Address ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Threat Response v2 - Generate Access Token ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
	* Threat Response v2 - Create Casebook ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
* The [targets](#targets) and [account keys](#account-keys) listed below
* A Secure Network Analytics instance
* A [SecureX orchestration remote]({{ site.baseurl }}/remote) with connectivity to your SNA instance

---

## Workflow Steps
1. Make sure the observable type provided is supported
1. Fetch global variables
1. Calculate date 24 hours ago
1. Get SNA tokens and tenant information
1. Fetch and parse the top peers
1. Fetch and parse the top hosts
1. Make sure at least one of the queries returned data
1. Create a casebook in SecureX

---

## Configuration
* Add your SNA API username and password to `SNA Username` and `SNA Password` (or, if you have them stored in global variables, use the `Fetch Global Variables` group at the beginning of the workflow to update the local variables)
* Set the `SNA Tenant Name` to the name of the tenant you want to work in
* If you want to change the name of this workflow in the pivot menu, change its display name

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| [CTR_For_Access_Token]({{ site.baseurl }}/targets/default#ctr_for_access_token) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `visibility.amp.cisco.com`<br />_Path:_ `/iroh` | CTR_Credentials | Created by default |
| [Private_CTIA_Target]({{ site.baseurl }}/targets/default#private_ctia_target) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `private.intel.amp.cisco.com`<br />_Path:_ None | None | Created by default |
| Secure Network Analytics | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `your-sna-management-center.yourdomain`<br />_Path:_ None | None | |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| [CTR_Credentials]({{ site.baseurl }}/account-keys/default#ctr_credentials) | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Created by default |
