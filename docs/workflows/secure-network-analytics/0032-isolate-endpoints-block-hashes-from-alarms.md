---
layout: page
title: Isolate Endpoints and Block Hashes from Alarms
permalink: /workflows/secure-network-analytics/0032-isolate-endpoints-block-hashes-from-alarms
redirect_from:
  - /workflows/0032
parent: Cisco Secure Network Analytics
grand_parent: Workflows
---

# Isolate Endpoints and Block Hashes from Alarms
<div markdown="1">
Workflow #0032
{: .label }
</div>

This workflow gets events from Cisco Secure Network Analytics (SNA) for the past 24 hours based on the event name provided. It then fetches associated flows and compiles information necessary to isolate related hosts and block file hashes in Cisco Secure Endpoint. At the end, a Webex message is sent with a summary.

[<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0032-SNA-IsolateEndpointsAndBlockHashesFromAlarms__definition_workflow_01IA2KYOVROXI01slp8tVnNERQGKy08Tg7Y){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Jun 17, 2021 | - Initial release |
| Sep 10, 2021 | - Updated to use the new [system atomics]({{ site.baseurl }}/atomics/system) |
| Sep 7, 2022 | - Minor updates to naming and descriptions |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* Secure Endpoint - Get Connector GUID
	* Secure Endpoint - Isolate Host
	* Secure Network Analytics - Get Flows by IP Addresses
	* Secure Network Analytics - Get Security Events by Name
	* Secure Network Analytics - Get Tenants
	* Secure Network Analytics - Get Tokens
	* Webex - Post Message to Room
	* Webex - Search for Room
* The following atomic actions must be imported before you can import this workflow:
	* None
* The [targets](#targets) and [account keys](#account-keys) listed at the bottom of the page
* A [SecureX orchestration remote]({{ site.baseurl }}/remote/) with connectivity to your Secure Network Analytics instance
* Cisco Secure Endpoint
* Cisco Secure Network Analytics (SNA)
* (Optional) Cisco Webex

---

## Workflow Steps
1. Fetch global variables
1. Get Secure Network Analytics tokens and tenant information
1. Calculate dates and times
1. Get security events from Secure Network Analytics
1. Parse events to table
1. Fetch file list information from Secure Endpoint
1. For each security event:
	* Extract event attributes
	* Get related flows and parse out file hashes
	* Attempt to locate matching hosts in Secure Endpoint and, if found, isolate them
	* Conver the file hashes to a table and add each one to the file lists in Secure Endpoint
1. Send a Webex message with a summary

---

## Configuration
* Set the `Secure Endpoint Application List Name` local variable to the name of the application file list to add hashes to
* Set the `Secure Endpoint Simple Detection List Name` local variable to the name of the SCD list to add hashes to
* Set the `SNA Event Name` local variable to the name of the events you want to take action on
* Add your Secure Network Analytics API username and password to `SNA Username` and `SNA Password` (or, if you have them stored in global variables, use the `Fetch Global Variables` group at the beginning of the workflow to update the local variables)
* Set the `SNA Tenant Name` to the name of the tenant you want to work in
* See [this page]({{ site.baseurl }}/atomics/configuration/webex#configuring-our-workflows) for information on configuring the workflow for Webex
* By default, the workflow is configured to run every 24 hours using the **0032 - SNA - Isolate Endpoints and Block Hashes from Alarms** [schedule]({{ site.baseurl }}/schedules/). When you import the workflow, the schedule trigger will be disabled. To enable the schedule:
	* Open the workflow in the workflow editor
	* Scroll down to the **Triggers** section of the workflow's properties and click **Alarm Event Polling**
	* Uncheck the **Disable Trigger** box and click **Save**

---

## Targets
**Note:** If your Secure Network Analytics deployment is on-premises and not accessible from the internet, you will need a [SecureX orchestration remote]({{ site.baseurl }}/remote/) to use it with orchestration.

Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| [AMP_Target]({{ site.baseurl }}/targets/default#amp_target) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `api.amp.cisco.com`<br />_Path:_ `/v1` | AMP_Credentials | Created by default |
| Secure Network Analytics | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `your-sna-management-center.yourdomain`<br />_Path:_ None | None | |
| Webex Teams | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `webexapis.com`<br />_Path:_ None | None | Not necessary if Webex activities are removed |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| [AMP_Credentials]({{ site.baseurl }}/account-keys/default#amp_credentials) | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Created by default |
