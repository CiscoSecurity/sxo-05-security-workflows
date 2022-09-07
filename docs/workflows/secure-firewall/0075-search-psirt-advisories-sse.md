---
layout: page
title: Search PSIRT Advisories (SSE)
permalink: /workflows/secure-firewall/0075-search-psirt-advisories-sse
redirect_from:
  - /workflows/0075
parent: Cisco Secure Firewall
grand_parent: Workflows
---

# Search PSIRT Advisories (SSE)
<div markdown="1">
Workflow #0075
{: .label }
</div>

This workflow collects Cisco PSIRT Security Advisories and device details from your Secure Firewall Management Center. The workflow then checks each advisory and compares it to your Firepower devices to determine if any of your managed devices are affected by the advisory. If vulnerable devices are found, a Webex message is posted and a ServiceNow ticket is created.

<div class="cisco-alert cisco-alert-info"><i class="fa fa-info-circle mr-1 cisco-icon-info"></i> There are two different ways to integrate Secure Firewall with orchestration. For more information about these two methods and which to use, please see <a href="{{ site.baseurl }}/workflows/secure-firewall/api-types">this page</a>.</div>

<div class="cisco-alert cisco-alert-info"><i class="fa fa-info-circle mr-1 cisco-icon-info"></i> This workflow expects the new "SecureX Token" account key. For more information about this, please see <a href="{{ site.baseurl }}/account-keys/securex-token">this page</a>.</div>

[<i class="fab fa-github"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0075-SecureFirewall-SearchPSIRTAdvisoriesSSE__definition_workflow_01ZHJDAF1N00R0yFS7WtS9SFHf3zYrlfYh1){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Sep 7, 2022 | - Initial release |

_See the [Important Notes](/sxo-05-security-workflows/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics](/sxo-05-security-workflows/atomics/system) are used by this workflow:
	* API Console - Generate Access Token
	* Cisco PSIRT openVuln - Search Advisories by Product Name
	* SecureX - SSE Proxy - Send Request
	* Webex - Post Message to Room
	* Webex - Search for Room
* The following atomic actions must be imported before you can import this workflow:
	* ServiceNow - Create Incident
* The [targets](#targets) and [account keys](#account-keys) listed below
* Cisco API Console API Key with openVuln Permissions
* Cisco Secure Firewall
* Cisco Webex
* ServiceNow

---

## Workflow Steps
1. Validate workflow configuration
1. Assemble a list of managed firewall devices
1. Build the search terms for the PSIRT API
1. Fetch a list of advisories and, for each advisory:
	* Check for any impacted devices were found. If so:
		* Send a Webex message and update the HTML for ServiceNow
1. Check for any error messages (if so: send a Webex message and end the workflow)
1. Check for HTML results (if so: open a ServiceNow ticket)

---

## Configuration
* If you don't already have an API client for the Cisco PSIRT openVuln API:
	* Log into the [Cisco API Console](https://apiconsole.cisco.com/apps/register) and click the "Register a New App" button
	* Give the app a name (for example: SecureX Orchestration)
	* Check the "Client Credentials" box under the "OAuth2 Credentials" section
	* Check the "Cisco PSIRT openVuln API" box
	* Agree to the Terms of Service and click the "Register" button
	* Add the API key and secret to an HTTP Basic Authentication account key as described [below](#account-keys)
* Enable or disable the keyword search local variables depending on which platforms you want to look for (ASA and/or Firepower)
* Set the `ServiceNow User ID` local variable to the username you want incidents opened as. This can either match the username in your ServiceNow **Account Key** or, if the account has the appropriate permissions, can be a different user
* Set the `Domain UUID` to the UUID of the FMC domain you want the workflow to make changes to. If you're using the default domain, you can leave the default value
* Set the `Device ID` to the ID of the device to send the command to in SSE. This can be obtained from the device's summary page in SSE, the Devices page in the Administration section of SecureX, or by using the "SecureX - SSE Proxy - List Devices" atomic
* If you want the workflow to run on a schedule, you need to create a [schedule]({{ site.baseurl }}/schedules/) and then add it as a [trigger]({{ site.baseurl }}/workflows/triggers) within the workflow
* See [this page]({{ site.baseurl }}/atomics/configuration/webex#configuring-our-workflows) for information on configuring the workflow for Webex

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| Cisco SSO | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `cloudsso.cisco.com`<br />_Path:_ `/as` | Cisco API Console Credentials | |
| Cisco API Console | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `api.cisco.com`<br />_Path:_ None | None | |
| [CTR_API]({{ site.baseurl }}/targets/default#ctr_api) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `visibility.amp.cisco.com`<br />_Path:_ `/iroh` | CTR_Credentials | Created by default |
| ServiceNow | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `<instance>.service-now.com`<br />_Path:_ `/api` | ServiceNow_Credentials | Be sure to use your instance URL |
| Webex Teams | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `webexapis.com`<br />_Path:_ None | None | |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| Cisco API Console Credentials | HTTP Basic Authentication | _Username: API Key<br />_Password:_ Client Secret | |
| [CTR_Credentials]({{ site.baseurl }}/account-keys/default#ctr_credentials) | SecureX Token | | See [this page]({{ site.baseurl }}/account-keys/securex-token) |
| ServiceNow_Credentials | HTTP Basic Authentication | _Username:_ ServiceNow User ID<br />_Password:_ ServiceNow Password | |
