---
layout: page
title: Incident Manager Cleanup
permalink: /workflows/securex/0020-incident-cleanup
redirect_from:
  - /workflows/0020
parent: Cisco SecureX
grand_parent: Workflows
---

# Incident Manager Cleanup
<div markdown="1">
Workflow #0020
{: .label }
</div>

This workflow allows you to bulk-delete incidents from your SecureX incident manager. The incidents to delete are identified by a Lucene/ES query and a time window. A dry run is executed first and an approval task is generated to confirm how many incidents will be deleted. If the approval task is approved, deletion is completed.

<div class="cisco-alert cisco-alert-danger"><i class="fa fa-exclamation-circle mr-1 cisco-icon-danger"></i> NOTE: DELETED INCIDENTS CANNOT BE RECOVERED!</div>

[<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0020-SecureX-IncidentManagerCleanup__definition_workflow_01NLKX7ATT51N2uqeBtRMYilkGPgABnIUeS){: .btn-cisco-outline }

---

## Requirements
* The following atomic actions must be imported before you can import this workflow:
	* Threat Response v2 - Generate Access Token ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
* The [targets](#targets) and [account keys](#account-keys) listed below

---

## Workflow Steps
1. Validate inputs and format date/times
1. Get an access token for SecureX
1. Execute a dry run of the deletion query
1. Check if the request was successful:
	* If it wasn't, output an error
	* If it was:
		* Check if there was anything to delete (if not, end the workflow)
		* Request approval for deletion
		* If the request is denied or expires, end the workflow
		* Request the incidents actually be deleted

---

## Configuration
* The `Incident deletion approval` activity needs to be configured with a task requestor, owner, and assignees (the assignees will be able to approve or deny)

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| [CTR_For_Access_Token]({{ site.baseurl }}/targets/default#ctr_for_access_token) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `visibility.amp.cisco.com`<br />_Path:_ `/iroh` | CTR_Credentials | Created by default |
| [Private_CTIA_Target]({{ site.baseurl }}/targets/default#private_ctia_target) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `private.intel.amp.cisco.com`<br />_Path:_ None | None | Created by default |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| [CTR_Credentials]({{ site.baseurl }}/account-keys/default#ctr_credentials) | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Created by default |
