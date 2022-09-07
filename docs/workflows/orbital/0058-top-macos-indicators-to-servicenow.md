---
layout: page
title: Top MacOS IR Indicators to ServiceNow
permalink: /workflows/orbital/0058-top-macos-indicators-to-servicenow
redirect_from:
  - /workflows/0058
parent: Cisco Orbital
grand_parent: Workflows
---

# Top MacOS IR Indicators to ServiceNow
<div markdown="1">
Workflow #0058
{: .label }

Response Workflow
{: .label }
</div>

This workflow runs multiple Oribtal queries on the endpoint provided to look for top incident response indicators of compromise. The results are then posted to a ServiceNow incident. Supported observables: `ip`, `mac_address`, `amp_computer_guid`, `hostname`

[<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0058-Orbital-TopMacOSIRIndicatorsToServiceNow__definition_workflow_01UEMKK2DZC1L2SOQ2GMRtCt8qEHSaNffsR){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Feb 8, 2022 | - Initial release |
| Sep 7, 2022 | - Minor updates to naming and descriptions |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* Orbital - Query Endpoint
	* Threat Response - Generate Access Token
* The following atomic actions must be imported before you can import this workflow:
	* ServiceNow - Create Incident ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
* The [targets](#targets) and [account keys](#account-keys) listed at the bottom of the page
* Cisco Secure Endpoint with Orbital
* ServiceNow

---

## Workflow Steps
1. Check if the observable type provided is supported
1. Detect the region
1. Run Orbital queries for:
	* Operating system information
	* Logged in user details
	* Recent logins
	* Downloaded files
	* Home directory files
	* Hosts in host file
	* Mounted volumes
	* High memory processes
	* Non-system processes
	* Installed programs
	* Browser extensions
	* Network connections
	* Open files for logged in user
	* Launchd items
	* Cronjobs
	* Services in application layer firewall
	* Homebrew packages
	* Kernel extensions
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
