---
layout: page
title: Search DNS Activity by Category
permalink: /workflows/umbrella/0037-search-dns-activity-by-category
redirect_from:
  - /workflows/0037
parent: Cisco Umbrella
grand_parent: Workflows
---

# Search DNS Activity by Category
<div markdown="1">
Workflow #0037
{: .label }
</div>

This workflow searches and returns Umbrella DNS activity for the last 7 days based on the Umbrella category provided. The data is then parsed and posted in a ServiceNow incident.

[<i class="fab fa-github"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0037-Umbrella-SearchDNSActivityByCategory__definition_activity_01PR24IEXARM56oYsLwKFiwcuxQwNxWLakG.json){: .btn-cisco-outline }

---

## Requirements
* The following atomic actions must be imported before you can import this workflow:
	* ServiceNow - Create Incident ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Umbrella - Reporting v2 - Get Activity ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Umbrella - Reporting v2 - Get Categories ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Umbrella - Reporting v2 - Get Token ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
* The [targets](#targets) and [account keys](#account-keys) listed below

---

## Workflow Steps
1. Get a token for the Umbrella reporting API
1. Fetch a list of categories
1. Extract the category ID for the category provided
1. Check that the category ID was found (if not, end the workflow)
1. Get activity for the category
1. Extract and parse the results
1. Create a Service Now incident ticket

---

## Configuration
* Set the `Umbrella Organization ID` local variable to your Umbrella organization's ID (found in your Umbrella dashboard's URL)
* Set the `Category to Filter On` local variable to the name of the category you want to report on
* Set the `Maximum Records` local variable to the maximum number of activity records to request from Umbrella. This is 1,000 by default
* Update the `ServiceNow User ID` local variable with the username you want incidents opened as. This can either match the username in your ServiceNow **Account Key** or, if the account has the appropriate permissions, can be a different user
* By default, this workflow is configured to run on demand. You can create a [schedule]({{ site.baseurl }}/schedules) if you want it to run at a set interval

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
