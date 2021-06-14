---
layout: page
title: Add to Destination List
permalink: /workflows/umbrella/0017-add-to-destination-list
redirect_from:
  - /workflows/0017
parent: Cisco Umbrella
grand_parent: Workflows
---

# Add to Destination List
<div markdown="1">
Workflow #0017
{: .label }

Response Workflow
{: .label }
</div>

This workflow should be triggered from a SecureX pivot menu and supports IP address, domain, and URL observables. When triggered, this workflow adds an observable to the configured destination list in Cisco Umbrella.

[<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0017-Umbrella-AddToDestinationList__definition_workflow_01N8STV59EM7C519ZuO1Sx67ovm5MDpdBn5){: .btn-cisco-outline }

---

## Requirements
* The following atomic actions must be imported before you can import this workflow:
	* Umbrella - Management V1 - Add Record to Destination List ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Umbrella - Management V1 - Get Destination Lists ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
* The [targets](#targets) and [account keys](#account-keys) listed below

---

## Workflow Steps
1. Make sure the observable type provided is supported
1. Get all of the organization's destination lists
1. Extract the ID of the configured destination list
1. Check if extracting the destination list ID was successful:
	* If it was, add the record to the list
	* If it wasn't, output an error

---

## Configuration
* Set the `Destination List Name` local variable to the name of the destination list you want observables added to
* Set the `Umbrella Organization ID` local variable to your Umbrella organization's ID (found in your Umbrella dashboard's URL)
* If you want to change the name of this workflow in the pivot menu, change its display name

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| Umbrella Management | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `management.api.umbrella.com`<br />_Path:_ None | Umbrella Management | |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| Umbrella Management | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Must be an API client for the management API |
