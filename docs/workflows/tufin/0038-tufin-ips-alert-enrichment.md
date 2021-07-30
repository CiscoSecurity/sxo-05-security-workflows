---
layout: page
title: IPS Alert Enrichment
permalink: /workflows/tufin/0038-tufin-ips-alert-enrichment
redirect_from:
  - /workflows/0038
parent: Tufin
grand_parent: Workflows
---

# IPS Alert Enrichment
<div markdown="1">
Workflow #0038
{: .label }
</div>

This workflow searches for information about network objects, topology, devices and policies by IP using the Tufin API. The information discovered is uploaded to a file on Microsoft SharePoint and confirmation messages are sent to Microsoft Teams.

Note: The link to download the file posted in Microsoft Teams contains a temporary authentication token and expires an hour after creation.

[<i class="fab fa-github"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0038-Tufin-IPSAlertEnrichment__definition_workflow_01NT97A5RNHCG4tiTeyKvHhC5lhbAPKRRlJ){: .btn-cisco-outline }

---

## Requirements
* The following atomic actions must be imported before you can import this workflow:
	* Microsoft Graph - Get Access Token ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Microsoft Teams - Post Message via Webhook ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Microsoft Graph - Upload Text to New File ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Tufin - Resolve Objects ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Tufin - Search Topology ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Tufin - Search Policies ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
* The [targets](#targets) and [account keys](#account-keys) listed below
* A webhook URL for the Microsoft Teams channel to post messages to (see: [this page](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/connectors-using#setting-up-a-custom-incoming-webhook))
* An application [registered using the Azure portal](https://docs.microsoft.com/en-us/graph/auth-register-app-v2). This will allow you to generate the API credentials needed to upload files to SharePoint
* Tufin Orchestration Suite instance

---

## Workflow Steps
1. Get network objects information
1. Get topology information
1. Get devices and policies information
1. Get Microsoft Graph access token
1. Upload files with information to SharePoint
1. Send message with execution status and links to files to Microsoft Teams

---

## Configuration
* To allow the workflow to upload files to Microsoft SharePoint the following permissions are required on your Azure application:
	* Delegated - Files.ReadWrite, Files.ReadWrite.All, Sites.ReadWrite.All
	* OR
	* Application - Files.ReadWrite.All, Sites.ReadWrite.All
* Set the `Azure Tenant ID` local variable to the ID of your Azure tenant
* Set the `Folder Name` local variable to the name of the folder to upload files to in SharePoint

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| Microsoft Graph | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `graph.microsoft.com`<br />_Path:_ `/v1.0` | None | |
| Microsoft Graph Token | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `login.microsoftonline.com`<br />_Path:_ None | Microsoft Graph API | 
| Microsoft Teams Webhook | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `your-tenant.webhook.office.com`<br />_Path:_ `/the-rest-of-the-webhook-url` | None | |
| Tufin Orchestration Suite | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `your-tufin-instance.domain.com`<br />_Path:_ None<br />| Tufin Credentials | If using a self-signed certificate, disable certificate validation on the target |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| Tufin Credentials | HTTP Basic Authentication | _Username:_ Tufin Admin Username<br />_Password:_ Tufin Admin Password |  |
| Microsoft Graph API | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | |
