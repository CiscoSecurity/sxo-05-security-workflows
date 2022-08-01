---
layout: page
title: Search PSIRT Advisories
permalink: /workflows/secure-firewall/0067-search-psirt-advisories
redirect_from:
  - /workflows/0067
parent: Cisco Secure Firewall
grand_parent: Workflows
---

# Search PSIRT Advisories
<div markdown="1">
Workflow #0067
{: .label }
</div>

This workflow collects Cisco PSIRT Security Advisories and device details from your Secure Firewall Management Center. The workflow then checks each advisory and compares it to your Firepower devices to determine if any of your managed devices are affected by the advisory. If vulnerable devices are found, a Webex message is posted and a ServiceNow ticket is created.

[<i class="fab fa-github"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0067-SecureFirewall-SearchPSIRTAdvisories__definition_workflow_01YUDEURQESTR1XAbWXv2dNJnSx6O8B4jR5){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Aug 1, 2022 | - Initial release |

_See the [Important Notes](/sxo-05-security-workflows/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics](/sxo-05-security-workflows/atomics/system) are used by this workflow:
	* API Console - Generate Access Token
    * Cisco PSIRT openVuln - Search Advisories by Product Name
    * Secure Firewall - Get Access Token
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
* If you want the workflow to run on a schedule, you need to create a [schedule]({{ site.baseurl }}/schedules/) and then add it as a [trigger]({{ site.baseurl }}/workflows/triggers) within the workflow
* See [this page]({{ site.baseurl }}/atomics/configuration/webex#configuring-our-workflows) for information on configuring the workflow for Webex

---

## Targets
Target Group: `Default TargetGroup`

**Note:** If your FMC is on-premises and not accessible from the internet, you will need a [SecureX orchestration remote]({{ site.baseurl }}/remote/) to use FMC with orchestration.

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| Cisco SSO | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `cloudsso.cisco.com`<br />_Path:_ `/as` | Cisco API Console Credentials |  |
| Cisco API Console | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `api.cisco.com`<br />_Path:_ None | None | |
| FMC Target | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `your-firewall-management-center`<br />_Path:_ `api/` | FMC API Credentials | |
| ServiceNow | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `<instance>.service-now.com`<br />_Path:_ `/api` | ServiceNow_Credentials | Be sure to use your instance URL |
| Webex Teams | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `webexapis.com`<br />_Path:_ None | None | |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| Cisco API Console Credentials | HTTP Basic Authentication | _Username: API Key<br />_Password:_ Client Secret | |
| FMC API Credentials | HTTP Basic Authentication | _Username:_ FMC Username<br />_Password:_ FMC Password | Account must have API permissions |
| ServiceNow_Credentials | HTTP Basic Authentication | _Username:_ ServiceNow User ID<br />_Password:_ ServiceNow Password | |
