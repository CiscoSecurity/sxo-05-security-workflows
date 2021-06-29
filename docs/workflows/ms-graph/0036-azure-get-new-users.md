---
layout: page
title: Azure AD - Get New Users
permalink: /workflows/ms-graph/0036-azure-get-new-users
redirect_from:
  - /workflows/0036
parent: Microsoft Graph and Azure
grand_parent: Workflows
---

# Azure AD - Get New Users
<div markdown="1">
Workflow #0036
{: .label }
</div>

This workflow checks for users that were created within the past X hours (the timeframe is configurable). If any results are found, the user list is aggregated and a Webex Teams message is sent. Required Graph API permissions: AuditLog.Read.All

[<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0036-AzureAD-GetNewUsers__definition_workflow_01PD8FKF4OBFC16O6H6qxulK3Ul9Mh4i6XH){: .btn-cisco-outline }

---

## Requirements
* The following atomic actions must be imported before you can import this workflow:
	* MS Graph - Get Access Token ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Webex Teams - Post Message to Room ([Github_Target_Atomics]({{ site.baseurl }}/default-repos)) * See note below!
	* Webex Teams - Search for Room ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
* The [targets](#targets) and [account keys](#account-keys) listed below
* An Azure Active Directory instance
* An Azure App Registration with the `AuditLog.Read.All` API permission
* (Optional) A Webex Teams access token and room name to post messages to

**Note:** You may have an old version of the `Webex Teams - Post Message to Room` atomic. To ensure the best experience with this workflow, be sure to import the latest version of this atomic from the `GitHub_Target_Atomics` repository!

---

## Workflow Steps
1. Fetch global variables
1. Get an access token for the Graph API
1. Calculate and format the start date
1. Fetch audit log events for user creation
1. Check if the request was successful:
	* If not, return an error message
	* If it was, parse the event JSON and aggregate the list of new users in text form for Webex. If there's anything to report, send a Webex message

---

## Configuration
* If you want the workflow to run on a schedule, you need to create a [schedule]({{ site.baseurl }}/schedules) and then add it as a [trigger]({{ site.baseurl }}/workflows/triggers) within the workflow
* Set the `Azure Tenant ID` local variable to the Azure tenant to run the report for
* Set the `Hours to Check` to how many hours ago you want the workflow to look for events (default: 24 hours). If you're using a schedule to run this workflow, make sure the schedule's interval matches this timeframe
* See [this page]({{ site.baseurl }}/atomics/configuration/webex#configuring-our-workflows) for information on configuring the workflow for Webex Teams

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| Microsoft Graph | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `graph.microsoft.com`<br />_Path:_ `/v1.0` | None | |
| Microsoft Graph Token | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `login.microsoftonline.com`<br />_Path:_ None | Microsoft Graph API | |
| Webex Teams | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `webexapis.com`<br />_Path:_ None | None | Not necessary if Webex Teams activities are removed |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| Microsoft Graph API | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | |
