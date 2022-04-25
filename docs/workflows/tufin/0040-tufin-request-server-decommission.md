---
layout: page
title: Request Server Decommission
permalink: /workflows/tufin/0040-tufin-request-server-decommission
redirect_from:
  - /workflows/0040
parent: Tufin
grand_parent: Workflows
---

# Request Server Decommission
<div markdown="1">
Workflow #0040
{: .label }

Response Workflow
{: .label }
</div>

This workflow submits a ticket for server decommission using the Tufin SecureChange API. A confirmation message is sent using Microsoft Teams. Supported observable: `ip`

[<i class="fab fa-github"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0040-Tufin-RequestServerDecommission__definition_workflow_01O1F6IBOLSP37KQEAt003257hQcJuDvvWu){: .btn-cisco-outline }

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* None
* The following atomic actions must be imported before you can import this workflow:
	* Microsoft Teams - Post Message via Webhook ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Tufin - Submit Server Decommission Request ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
* The [targets](#targets) and [account keys](#account-keys) listed at the bottom of the page
* A webhook URL for the Microsoft Teams channel to post messages to (see: [this page](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook))
* Tufin Orchestration Suite instance

---

## Workflow Steps
1. Make sure the observable type provided is supported
1. Submit the server decommission request
1. Send a message to Microsoft Teams indicating if the request was submitted successfully

---

## Configuration
* If you want to change the name of this workflow in the pivot menu, change its display name
* Set the `Subject` local variable to what you want the title of the change requests to be
* Set the `Priority` local variable to the priority you want changes submitted with
* (Optional) Set the `Comment` local variable to comments you want added to the change request

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| Microsoft Teams Webhook | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `your-tenant.webhook.office.com`<br />_Path:_ `/the-rest-of-the-webhook-url` | None | |
| Tufin Orchestration Suite | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `your-tufin-instance.domain.com`<br />_Path:_ None<br />| Tufin Credentials | If using a self-signed certificate, disable certificate validation on the target |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| Tufin Credentials | HTTP Basic Authentication | _Username:_ Tufin Admin Username<br />_Password:_ Tufin Admin Password | |
