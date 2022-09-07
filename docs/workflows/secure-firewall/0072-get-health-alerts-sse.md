---
layout: page
title: Get Health Alerts (SSE)
permalink: /workflows/secure-firewall/0072-get-health-alerts-sse
redirect_from:
  - /workflows/0072
parent: Cisco Secure Firewall
grand_parent: Workflows
---

# Get Health Alerts (SSE)
<div markdown="1">
Workflow #0072
{: .label }
</div>

This workflow retrieves health monitor alerts from a Cisco Secure Firewall Management Center and, if alerts are returned, documents them in ServiceNow and sends a Webex message.

<div class="cisco-alert cisco-alert-info"><i class="fa fa-info-circle mr-1 cisco-icon-info"></i> There are two different ways to integrate Secure Firewall with orchestration. For more information about these two methods and which to use, please see <a href="{{ site.baseurl }}/workflows/secure-firewall/api-types">this page</a>.</div>

<div class="cisco-alert cisco-alert-info"><i class="fa fa-info-circle mr-1 cisco-icon-info"></i> This workflow expects the new "SecureX Token" account key. For more information about this, please see <a href="{{ site.baseurl }}/account-keys/securex-token">this page</a>.</div>

[<i class="fab fa-github"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0072-SecureFirewall-GetHealthAlertsSSE__definition_workflow_01ZHJCXJ43Q5Z6vKamVF3urD0kVdmZCqv49){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Sep 7, 2022 | - Initial release |

_See the [Important Notes](/sxo-05-security-workflows/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics](/sxo-05-security-workflows/atomics/system) are used by this workflow:
	* Secure Firewall - SSE - Get Device Details
	* Secure Firewall - SSE - Get Health Alerts
	* Webex - Post Message to Room
	* Webex - Search for Room
* The following atomic actions must be imported before you can import this workflow:
	* ServiceNow - Create Incident ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
* The [targets](#targets) and [account keys](#account-keys) listed at the bottom of the page
* Cisco Secure Firewall (software version 7.2 or newer)
* Cisco Webex
* ServiceNow

---

## Workflow Steps
1. Fetch global variables
1. Set the workflow run URL based on region
1. Search for the Webex room provided
1. Validate required variables are provided
1. Build the search filter
1. Fetch matching health alerts
1. Check if any alerts were found:
	* If not, end the workflow
	* If there were alerts:
		* Parse the alerts to markdown and HTML
		* Create ServiceNow ticket
1. Post the workflow result to Webex

---

## Configuration

* Set the `Minutes to Search` local variable to how many minutes into the past you want to search for alerts. If running the workflow on a schedule, this should be the same as the scheduled interval
* Set `Status Code Red` and/or `Status Code Yellow` to `true`. At least one of these must be enabled
* Set the `Domain UUID` to the UUID of the FMC domain you want the workflow to make changes to. If you're using the default domain, you can leave the default value
* Set the `Device ID` to the ID of the device to send the command to in SSE. This can be obtained from the device's summary page in SSE, the Devices page in the Administration section of SecureX, or by using the "SecureX - SSE Proxy - List Devices" atomic
* Update the `ServiceNow User ID` local variable with the username you want incidents opened as. This can either match the username in your ServiceNow **Account Key** or, if the account has the appropriate permissions, can be a different user
* By default, this workflow is configured to run on demand. You can create a [schedule]({{ site.baseurl }}/schedules/) if you want it to run at a set interval
* See [this page]({{ site.baseurl }}/atomics/configuration/webex#configuring-our-workflows) for information on configuring the workflow for Webex

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| [CTR_API]({{ site.baseurl }}/targets/default#ctr_api) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `visibility.amp.cisco.com`<br />_Path:_ `/iroh` | CTR_Credentials | Created by default |
| ServiceNow | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `<instance>.service-now.com`<br />_Path:_ `/api` | ServiceNow_Credentials | Be sure to use your instance URL |
| Webex Teams | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `webexapis.com`<br />_Path:_ None | None | |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| [CTR_Credentials]({{ site.baseurl }}/account-keys/default#ctr_credentials) | SecureX Token | | See [this page]({{ site.baseurl }}/account-keys/securex-token) |
| ServiceNow_Credentials | HTTP Basic Authentication | _Username:_ ServiceNow User ID<br />_Password:_ ServiceNow Password | |
