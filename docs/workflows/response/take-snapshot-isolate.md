---
layout: page
title: Take Forensic Snapshot and Isolate
permalink: /workflows/response/take-snapshot-isolate
parent: Response Workflows
grand_parent: Workflows
---

# Take Forensic Snapshot and Isolate
<div markdown="1">
Response Workflow
{: .label }
</div>

This workflow should be triggered from a SecureX pivot menu and supports IP address, hostname, and AMP computer GUID observables. When triggered, this workflow will take a forensic snapshot of the computer provided as the observable and then request AMP host isolation be enabled.

---

## Requirements
* The following atomic actions must be imported before you can import this workflow:
	* AMP - Get Connector GUID ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
	* AMP - Isolate Host ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
	* CTRGenerateAccessToken ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
	* Orbital - Query Endpoint ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
* The [targets](#targets) and [account keys](#account-keys) listed below
* Endpoints running AMP for Endpoints with Orbital enabled

---

## Workflow Steps
1. Check that a supported observable was provided as input
1. If a GUID wasn't provided, convert the observable provided into the computer's AMP GUID
1. Generate an Orbital access token and request a forensic snapshot
1. Request AMP host isolation be enabled

---

## Configuration
* If you want to change the name of this workflow in the pivot menu, change its display name

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| [AMP_Target]({{ site.baseurl }}/targets/default#amp_target) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `api.amp.cisco.com`<br />_Path:_ `/v1` | AMP_Credentials | Created by default |
| [Orbital_For_Access_Token]({{ site.baseurl }}/targets/default#orbital_for_access_token) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `visibility.amp.cisco.com`<br />_Path:_ `/iroh` | Orbital_Credentials | Created by default |
| [Orbital_Target]({{ site.baseurl }}/targets/default#orbital_target) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `orbital.amp.cisco.com`<br />_Path:_ `/v0` | None | Created by default |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| [AMP_Credentials]({{ site.baseurl }}/account-keys/default#amp_credentials) | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Created by default |
| [Orbital_Credentials]({{ site.baseurl }}/account-keys/default#orbital_credentials) | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Created by default |
