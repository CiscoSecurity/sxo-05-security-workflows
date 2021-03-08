---
layout: page
title: Block Observable
permalink: /workflows/firepower/0015B-block-observable
redirect_from:
  - /workflows/0015B
parent: Cisco Firepower
grand_parent: Workflows
---

# Block Observable
<div markdown="1">
Workflow #0015B
{: .label }
</div>

This workflow blocks an observable on Cisco Secure Firewall (formerly Firepower) by creating a judgement for it in SecureX Threat Response. Once a judgement is created, the observable will appear on a feed which the firewall polls for observable information. Supported observable types: domain, ip, ipv6, sha256, url

Note: Workflow 0015A should be executed to create the required indicators and feeds in SecureX before you run this workflow. See the documentation for more information.

Steps:
Please see: https://ciscosecurity.github.io/sxo-05-security-workflows/workflows/0015B

[<i class="fab fa-github"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0015B-SecureFirewall-Block-Observable__definition_workflow_xxx){: .btn-cisco-outline }

---

## Requirements
* The following atomic actions must be imported before you can import this workflow:
	* Threat Response v2 - Generate Access Token ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
	* Threat Response v2 - Search for Indicators ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
	* Threat Response v2 - Create Judgement ([Github_Target_Atomics]({{ site.baseurl }}/default-reposm))
	* Threat Response v2 - Create Relationship ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))

---

## Workflow Steps

1. Convert observables passed into the workflow into indicators
1. Validate if the observable is supported
1. Search for the indicator in Threat Response
1. If the indicator was found, extract the indicator ID
1. For each indicator:
	* Create a judgement
    * Create a relationship between the feed and judgement
	* Observable will appear on a feed which the firewall polls for observable information
	

---

## Configuration
* By default, the workflow is configured to run every 10 minutes using the **0013 - Firepower - Impact Red Remediation** [schedule]({{ site.baseurl }}/schedules). When you import the workflow, the schedule trigger will be disabled. To enable the schedule:
	* Open the workflow in the workflow editor
	* Scroll down to the **Triggers** section of the workflow's properties and click **Firepower Impact Red Incident Polling**
	* Uncheck the **Disable Trigger** box and click **Save**

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