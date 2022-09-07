---
layout: page
title: Investigate User
permalink: /workflows/duo/0062-investigate-user
redirect_from:
  - /workflows/0062
parent: Duo Security
grand_parent: Workflows
---

# Investigate User
<div markdown="1">
Workflow #0062
{: .label }

Response Workflow
{: .label }
</div>

This workflow takes a Duo Security user’s username as input and retrieves the user's Duo profile and recent activity. If the user information is retrieved successfully, a ServiceNow ticket is created to notify the appropriate team to investigate further. Supported observables: `user`, `email`

[<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0062-Duo-InvestigateUser__definition_workflow_01WJUCDW6H0TU1nTTKLlKmJBaTr7Rack8v7){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Apr 29, 2022 | - Initial release |
| Sep 7, 2022 | - Minor updates to naming and descriptions |

_See the [Important Notes](/sxo-05-security-workflows/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* Duo - Admin - Get Authentication Logs
	* Duo - Admin - Get User
* The following atomic actions must be imported before you can import this workflow:
	* ServiceNow - Create Incident ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
* The [targets](#targets) and [account keys](#account-keys) listed at the bottom of the page
* Duo Security
* ServiceNow

---

## Workflow Steps
1. Make sure the observable is supported
1. Fetch global variables
1. Verify required input was provided
1. Check if a username suffix was provided and, if so, apply it
1. Fetch the user from Duo (end the workflow if not found)
1. Parse a variety of information from the user's profile
1. Fetch authentication logs for the user
1. Check if logs were fetched:
	* If not, end the workflow
	* If they were:
		* Parse the logs to an HTML table
		* Create a ServiceNow incident

---

## Configuration
* Provide the workflow your Duo Security Admin API information by either:
	* Storing the information in [global variables]({{ site.baseurl }}/variables/global) and using the `Fetch Global Variables` group at the beginning of the workflow to update the `Duo Hostname`, `Duo Integration Key`, and `Duo Secret Key` local variables; or
	* Remove the variables from the `Fetch Global Variables` group and add your information directly to the corresponding local variables
* Set `Duo Username Suffix`. If you need to add something like a domain to your usernames before searching them in Duo, you can use this variable to append a value to all Duo usernames. For example: `@company.com`
* Update the `Hours to Search` variable to adjust the length of time to search authentication logs
* Update the `ServiceNow User ID` local variable with the username you want incidents opened as. This can either match the username in your ServiceNow **Account Key** or, if the account has the appropriate permissions, can be a different user
* If you want to change the name of this workflow in the pivot menu, change its display name

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
