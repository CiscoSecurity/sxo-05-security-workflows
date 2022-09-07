---
layout: page
title: Top 10 Blocked Identities to ServiceNow
permalink: /workflows/umbrella/0041-top-10-blocked-identities-to-servicenow
redirect_from:
  - /workflows/0041
parent: Cisco Umbrella
grand_parent: Workflows
---

# Top 10 Blocked Identities to ServiceNow
<div markdown="1">
Workflow #0041
{: .label }
</div>

This workflow searches and returns the top 10 identities in Cisco Umbrella with DNS activity blocks for the last 7 days. The data is then parsed and posted in a ServiceNow incident.

[<i class="fab fa-github"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0041-Umbrella-Top10BlockedIdentitiesToServiceNow__definition_workflow_01PK1YV7VOTY75uIORp7Dx97IgIoQ0J1Ond){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Aug 23, 2021 | - Initial release |
| Mar 21, 2022 | - Updated to use the new [system atomics]({{ site.baseurl }}/atomics/system) |
| Jul 25, 2022 | - Updated to enable sensitive header redirection for Umbrella APIs ([Issue #176]({{ site.github.repository_url }}/issues/176)) |
| Sep 7, 2022 | - Minor updates to naming and descriptions |

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* Umbrella - Reporting v2 - Get Token
* The following atomic actions must be imported before you can import this workflow:
	* ServiceNow - Create Incident ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
* The [targets](#targets) and [account keys](#account-keys) listed at the bottom of the page
* Cisco Umbrella
* ServiceNow

---

## Workflow Steps
1. Get a token for the Umbrella API
1. Fetch a list of identities with blocked DNS activity
1. Check if the request was successful (if not, end the workflow)
1. Extract the result count and check if there were any results (if not, end the workflow)
1. Convert the top blocked identities to a table
1. For each identity:
	* Fetch blocked domains for the identity provided
	* Format the results for ServiceNow
1. Create a ServiceNow incident ticket

---

## Configuration
* Set the `ServiceNow User ID` local variable to the username you want incidents opened as. This can either match the username in your ServiceNow **Account Key** or, if the account has the appropriate permissions, can be a different user
* Set the `Umbrella Organization ID` local variable to your Umbrella organization's ID (found in your Umbrella dashboard's URL)
* If you want the workflow to run on a schedule, you need to create a [schedule]({{ site.baseurl }}/schedules/) and then add it as a [trigger]({{ site.baseurl }}/workflows/triggers) within the workflow

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| ServiceNow | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `<instance>.service-now.com`<br />_Path:_ `/api` | ServiceNow_Credentials | Be sure to use your instance URL |
| Umbrella OAuth | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `management.api.umbrella.com`<br />_Path:_ None | Umbrella Reporting | |
| Umbrella Reporting v2 | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `reports.api.umbrella.com`<br />_Path:_ None | None | |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| ServiceNow_Credentials | HTTP Basic Authentication | _Username:_ ServiceNow User ID<br />_Password:_ ServiceNow Password | |
| Umbrella Reporting | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Must be an API client for the reporting API |
