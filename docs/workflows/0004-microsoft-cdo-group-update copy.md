---
layout: page
title: Microsoft Online - CDO Group Update
permalink: /workflows/0004-microsoft-cdo-group-update
parent: Workflows
---

# Microsoft Online - CDO Group Update
<div markdown="1">
Workflow #0004
{: .label }
</div>

Microsoft provides a JSON-formatted feed of their networks and domains for their various cloud services. This workflow fetches that JSON, filters it, compares it to an existing network group in Cisco Defense Orchestrator, and then updates group as needed.

[Workflow Folder]({{ site.github.repository_url }}/tree/Main/Workflows/0004-MicrosoftOnline-CDOGroupUpdate__definition_workflow_01FTPWFQOJ7TE3SJcsVpnuC4e8ZEEReN1iF){: .btn .btn-blue .mr-2 } [JSON]({{ site.github.repository_url }}/tree/Main/Workflows/0004-MicrosoftOnline-CDOGroupUpdate__definition_workflow_01FTPWFQOJ7TE3SJcsVpnuC4e8ZEEReN1iF/definition_workflow_01FTPWFQOJ7TE3SJcsVpnuC4e8ZEEReN1iF.json){: .btn .btn-blue }

---

## Requirements
* Access to an instance of Cisco Defense Orchestrator (CDO)

---

## Workflow Steps
1. Fetch the online services information JSON from Microsoft
1. Get the existing object group from CDO
1. Figure out what changes are needed
1. Check if any changes are needed
	* If not, end the workflow
1. Create each new network object
1. Generate the JSON to update the object group
1. Update the object group using the CDO API

---

## Configuration
* Go to [Microsoft's website](https://docs.microsoft.com/en-us/microsoft-365/enterprise/microsoft-365-ip-web-service?view=o365-worldwide) to get the URL for the worldwide endpoint JSON. Click the link on the second bullet to `https://endpoints.office.com/endpoints/worldwide` and copy the URL into the `Microsoft Endpoints URL` local variable in the workflow.

---

## Targets

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| Cisco Defense Orchestrator | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `defenseorchestrator.com`<br />_Path:_ `/aegis/rest/v1/` | None |  |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| (varies) | Terminal Key-Based Credentials<br />OR<br />Terminal Password-Based Credentials | Depends on target type |  |
