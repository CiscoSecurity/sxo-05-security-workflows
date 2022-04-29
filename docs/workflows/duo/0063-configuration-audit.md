---
layout: page
title: Configuration Audit
permalink: /workflows/duo/0063-configuration-audit
redirect_from:
  - /workflows/0063
parent: Duo Security
grand_parent: Workflows
---

# Configuration Audit
<div markdown="1">
Workflow #0063
{: .label }
</div>

This workflow retrieves various settings from the Duo Admin API for audit purposes. If the information is retrieved successfully, a ServiceNow incident is created to document what was fetched.

[<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0063-Duo-ConfigurationAudit__definition_workflow_01WGPC6TCNOST7WJ7dW6ifHOFTn93Rpnp78){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Apr 29, 2022 | - Initial release |

_See the [Important Notes](/sxo-05-security-workflows/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics](/sxo-05-security-workflows/atomics/system) are used by this workflow:
	* Duo - Admin - Get Admins
	* Duo - Admin - Get Endpoints
	* Duo - Admin - Get Integrations
	* Duo - Admin - Get Settings
	* Duo - Admin - Get User
* The following atomic actions must be imported before you can import this workflow:
	* ServiceNow - Create Incident ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
* The [targets](#targets) and [account keys](#account-keys) listed at the bottom of the page
* Duo Security
* ServiceNow

---

## Workflow Steps
1. Fetch global variables
1. Verify required input was provided
1. Get Duo admin settings, parse and update results
1. Get the list of Duo admins, parse and update results
1. Get the Duo user count, parse and update results
1. Get the Duo endpoint count, parse and update results
1. Get the list of Duo integrations, parse and update results
1. Create a ServiceNow incident with results

---

## Configuration
* Provide the workflow your Duo Security Admin API information by either:
	* Storing the information in [global variables]({{ site.baseurl }}/variables/global) and using the `Fetch Global Variables` group at the beginning of the workflow to update the `Duo Hostname`, `Duo Integration Key`, and `Duo Secret Key` local variables; or
	* Remove the variables from the `Fetch Global Variables` group and add your information directly to the corresponding local variables
* Update the `ServiceNow User ID` local variable with the username you want incidents opened as. This can either match the username in your ServiceNow **Account Key** or, if the account has the appropriate permissions, can be a different user
* By default, this workflow is configured to run on demand. You can create a [schedule]({{ site.baseurl }}/schedules/) if you want it to run at a set interval

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| Duo Security | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `<api hostname>.duosecurity.com`<br />_Path:_ None | None | Be sure to use the API Hostname from your Duo integration |
| ServiceNow | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `<instance>.service-now.com`<br />_Path:_ `/api` | ServiceNow_Credentials | Be sure to use your instance URL |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| ServiceNow_Credentials | HTTP Basic Authentication | _Username:_ ServiceNow User ID<br />_Password:_ ServiceNow Password | |
