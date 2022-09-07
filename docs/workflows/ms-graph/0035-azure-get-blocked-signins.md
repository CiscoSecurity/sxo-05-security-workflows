---
layout: page
title: Azure AD - Get Blocked Sign-Ins
permalink: /workflows/ms-graph/0035-azure-get-blocked-signins
redirect_from:
  - /workflows/0035
parent: Microsoft Graph and Azure
grand_parent: Workflows
---

# Azure AD - Get Blocked Sign-Ins
<div markdown="1">
Workflow #0035
{: .label }
</div>

This workflow checks for sign-ins that were blocked because the account was locked out in Microsoft Azure (error code 50053). If any results are found, the attempts are aggregated and a Webex message is sent. Required Graph API permissions: AuditLog.Read.All, Directory.Read.All

Note: This workflow requires an Azure Active Directory Premium license.

[<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0035-AzureAD-GetBlockedSignIns__definition_workflow_01PE3PAHHTVYE0BtBsXEPhzzehMqUHHxIaU){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Jun 29, 2021 | - Initial release |
| Sep 10, 2021 | - Updated to use the new [system atomics]({{ site.baseurl }}/atomics/system) |
| Sep 7, 2022 | - Minor updates to naming and descriptions |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* Webex - Post Message to Room
	* Webex - Search for Room
* The following atomic actions must be imported before you can import this workflow:
	* Microsoft Graph - Get Access Token ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
* The [targets](#targets) and [account keys](#account-keys) listed at the bottom of the page
* (Optional) Cisco Webex
* Microsoft Azure Active Directory (with a premium license)
* Microsoft Azure App Registration with `AuditLog.Read.All` and `Directory.Read.All` API permissions

---

## Workflow Steps
1. Fetch global variables
1. Get an access token for the Graph API
1. Calculate and format the start date
1. Fetch sign in events
1. Check if the request was successful:
	* If not, return an error message
	* If it was, aggregate the events and post a Webex message

---

## Configuration
* If you want the workflow to run on a schedule, you need to create a [schedule]({{ site.baseurl }}/schedules/) and then add it as a [trigger]({{ site.baseurl }}/workflows/triggers) within the workflow
* Set the `Azure Tenant ID` local variable to the Azure tenant to run the report for
* Set the `Hours to Check` to how many hours ago you want the workflow to look for events (default: 24 hours). If you're using a schedule to run this workflow, make sure the schedule's interval matches this timeframe
* See [this page]({{ site.baseurl }}/atomics/configuration/webex#configuring-our-workflows) for information on configuring the workflow for Webex

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| Microsoft Graph | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `graph.microsoft.com`<br />_Path:_ `/v1.0` | None | |
| Microsoft Graph Token | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `login.microsoftonline.com`<br />_Path:_ None | Microsoft Graph API | |
| Webex Teams | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `webexapis.com`<br />_Path:_ None | None | Not necessary if Webex activities are removed |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| Microsoft Graph API | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | |
