---
layout: page
title: Request Threat Containment
permalink: /workflows/tufin/0039-tufin-request-threat-containment
redirect_from:
  - /workflows/0039
parent: Tufin
grand_parent: Workflows
---

# Request Threat Containment
<div markdown="1">
Workflow #0039
{: .label }
</div>

This workflow submits a firewall change request ticket using the Tufin SecureChange API. A confirmation message is sent using Microsoft Teams.

[<i class="fab fa-github"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0039-Tufin-RequestThreatContainment__definition_workflow_01NXX2RMFCU7J5u6kYPvJYzuDgozbbeqeD1){: .btn-cisco-outline }

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* None
* The following atomic actions must be imported before you can import this workflow:
	* Microsoft Teams - Post Message via Webhook ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Tufin - Submit Firewall Change Request ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
* The [targets](#targets) and [account keys](#account-keys) listed below
* A webhook URL for the Microsoft Teams channel to post messages to (see: [this page](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook))
* Tufin Orchestration Suite instance

---

## Workflow Steps
1. Submit firewall change request 
1. Send a message to Microsoft Teams indicating if the request was submitted successfully

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
