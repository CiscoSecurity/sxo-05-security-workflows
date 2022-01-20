---
layout: page
title: Top Windows IR Indicators to ServiceNow
permalink: /workflows/orbital/0055-top-windows-indicators-to-servicenow
redirect_from:
  - /workflows/0055
parent: Cisco Oribital
grand_parent: Workflows
---

# Top Windows IR Indicators to ServiceNow
<div markdown="1">
Workflow #0055
{: .label }

Response Workflow
{: .label }
</div>

This workflow runs multiple Oribtal queries on the endpoint provided to look for top incident response indicators of compromise. The results are then posted to a ServiceNow incident. Supported observables: `ip`, `mac_address`, `amp_computer_guid`, `hostname`

[<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0055-Orbital-TopWindowsIRIndicatorsToServiceNow__definition_workflow_01TBD5N6CVFOT47dC0D71jn6XvcQszZL0sY){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Jan 20, 2022 | - Initial release |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* Orbital - Query All Endpoints
	* Threat Response - Generate Access Token
* The following atomic actions must be imported before you can import this workflow:
	* ServiceNow - Create Incident ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
* The [targets](#targets) and [account keys](#account-keys) listed below
* Cisco Secure Endpoint with Orbital
* ServiceNow

---

## Workflow Steps
1. Check if the observable type provided is supported
1. Detect the region
1. Get logged in user name
1. Get list of local accounts
1. Get user's "Documents" folder contents
1. Get user's "Downloads" folder contents
1. Get user's "Desktop" folder contents
1. Get recent USB activity
1. Get recent Office documents
1. Get list of installed programs
1. Get list of Chrome browser extensions
1. Get named pipes
1. Get list of processes
1. Get list of outbound network connections
1. Get list of listening network connections
1. Get local DNS cache
1. Get list of open shares
1. Get list of autoexecute binaries
1. Get recent PowerShell activity
1. Get host uptime
1. Log results in a ServiceNow incident

---

## Configuration
* Update the `ServiceNow User ID` local variable with the username you want incidents opened as. This can either match the username in your ServiceNow **Account Key** or, if the account has the appropriate permissions, can be a different user
* Update the `ServiceNow - Create Incident` activity at the end of the workflow with any changes to the ticket properties you want

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| [Orbital_For_Access_Token]({{ site.baseurl }}/targets/default#orbital_for_access_token) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `visibility.amp.cisco.com`<br />_Path:_ `/iroh` | Orbital_Credentials | Created by default |
| [Orbital_Target]({{ site.baseurl }}/targets/default#orbital_target) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `orbital.amp.cisco.com`<br />_Path:_ `/v0` | None | Created by default |
| ServiceNow | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `<instance>.service-now.com`<br />_Path:_ `/api` | ServiceNow_Credentials | Be sure to use your instance URL |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| [Orbital_Credentials]({{ site.baseurl }}/account-keys/default#orbital_credentials) | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Created by default |
| ServiceNow_Credentials | HTTP Basic Authentication | _Username:_ ServiceNow User ID<br />_Password:_ ServiceNow Password | |
