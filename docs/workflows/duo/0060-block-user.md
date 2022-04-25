---
layout: page
title: Block User
permalink: /workflows/duo/0060-block-user
redirect_from:
  - /workflows/0060
parent: Duo Security
grand_parent: Workflows
---

# Block User
<div markdown="1">
Workflow #0060
{: .label }

Response Workflow
{: .label }
</div>

This workflow takes a Duo Security user's username as input and moves the user to a group that will deny access to services. If the user is moved succesfully, a ServiceNow ticket is created to notify the appropriate team to investigate further. Supported observables: `username`, `email`

Note: This workflow uses the Duo Admin API which is not enabled by default. Contact Duo support to have it enabled.

[<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0060-Duo-BlockUser__definition_workflow_01VIE3DU2MN4Q4BLQJuboNRY71pIPmmPz1r){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Mar 9, 2022 | - Initial release |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* Duo - Admin - Add User to Group
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
1. Get the user from Duo (end workflow if not found)
1. Extract the user's groups
1. Check if the user is already in the group:
	* If they are, end the workflow
	* If they aren't:
		* Move the user to the new group
		* Check if the move was successful:
			* If it was, create a ServiceNow incident
			* If it wasn't, end the workflow

---

## Configuration
* Provide the workflow your Duo Security Admin API information by either:
	* Storing the information in [global variables]({{ site.baseurl }}/variables/global) and using the `Fetch Global Variables` group at the beginning of the workflow to update the `Duo Hostname`, `Duo Integration Key`, and `Duo Secret Key` local variables; or
	* Remove the variables from the `Fetch Global Variables` group and add your information directly to the corresponding local variables
* Set `Duo Deny User Group` to the ID of the user group you want Duo users added to. You can get this ID from the URL of the group's page in the Duo admin panel. For example: `DGWP6584D8PORPPC9H01`
* Set `Duo Username Suffix`. If you need to add something like a domain to your usernames before searching them in Duo, you can use this variable to append a value to all Duo usernames. For example: `@company.com`
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
