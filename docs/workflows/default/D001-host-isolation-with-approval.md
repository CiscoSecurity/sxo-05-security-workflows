---
layout: page
title: Host Isolation with Tier 2 Approval
permalink: /workflows/default/D001-host-isolation-with-approval
redirect_from:
  - /workflows/D001
  - /workflows/response/host-isolation-with-approval
parent: Out of the Box Workflows
grand_parent: Workflows
---

# Host Isolation with Tier 2 Approval
<div markdown="1">
Out of Box
{: .label }

Response Workflow
{: .label }
</div>

This workflow requests approval to isolate an endpoint using Cisco Secure Endpoint host isolation. If approved, isolation is enabled using the Cisco Threat Response host isolation response action. Supported observable: `amp_computer_guid`

---

## Change Log

| Date | Notes |
|:-----|:------|
| Jun 23, 2020 | - Initial release |
| Sep 10, 2021 | - Updated to use the new [system atomics]({{ site.baseurl }}/atomics/system) |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* Threat Response - Generate Access Token
	* Threat Response - List Response Actions
	* Threat Response - Trigger Response Action
* The following atomic actions must be imported before you can import this workflow:
	* None
* The [targets](#targets) and [account keys](#account-keys) listed at the bottom of the page
* Cisco Secure Endpoint

---

## Workflow Steps
1. Make sure the observable is supported
1. Generate an access token for Threat Response
1. Fetch available response actions
1. Check that Secure Endpoint actions are available (if not, end the workflow)
1. Extract the module instance ID for Secure Endpoint
1. (Optional) Send an email notification (requires an SMTP Endpoint target)
1. Create the approval request and wait...
1. If the request is approved, trigger the response action to isolate the endpoint

---

## Configuration
* Set the `Secure Endpoint Module Name` local variable to the name of your Secure Endpoint SecureX module
* Set the `Task Approver` local variable to the email address of the SecureX user you want to approve requests from the workflow
* Set the `Task Requestor` local variable to the email address of the SecureX user you want to own requests from the workflow
* If you want the workflow to send emails, you need to:
	* Create an SMTP Endpoint target called `SMTP Target` for the workflow to use
	* Enable the `Send Email` activity and customize it as needed
* If you want to change the name of this workflow in the pivot menu, change its display name

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| [CTR_For_Access_Token]({{ site.baseurl }}/targets/default#ctr_for_access_token) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `visibility.amp.cisco.com`<br />_Path:_ `/iroh` | CTR_Credentials | Created by default |
| [CTR_API]({{ site.baseurl }}/targets/default#ctr_api) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `visibility.amp.cisco.com`<br />_Path:_ `/iroh` | None | Created by default |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| [CTR_Credentials]({{ site.baseurl }}/account-keys/default#ctr_credentials) | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Created by default |
