---
layout: page
title: Microsoft Online - ASA Split Tunnel
permalink: /workflows/0003-microsoft-asa-split-tunnel
parent: Workflows
---

# Microsoft Online - ASA Split Tunnel
<div markdown="1">
Workflow #0003
{: .label }
</div>

Microsoft provides a JSON-formatted feed of their networks and domains for their various cloud services. This workflow demonstrates fetching that JSON, converting it into split-tunneling commands for Cisco ASA, and then executing those commands on an ASA.

[<i class="fab fa-github mr-1"></i> Workflow Folder]({{ site.github.repository_url }}/tree/Main/Workflows/0003-MicrosoftOnline-ASASplitTunnel__definition_workflow_01FXTIIRZG1V03F4wJ1BsZoEAYc8NgBCBRP){: .btn-cisco-sky-blue .mr-2 } [JSON]({{ site.github.repository_url }}/tree/Main/Workflows/0003-MicrosoftOnline-ASASplitTunnel__definition_workflow_01FXTIIRZG1V03F4wJ1BsZoEAYc8NgBCBRP/definition_workflow_01FXTIIRZG1V03F4wJ1BsZoEAYc8NgBCBRP.json){: .btn-cisco-outline }

---

## Requirements
* A Cisco Adaptive Security Appliance (ASA)

---

## Workflow Steps
1. Fetch the online services information JSON from Microsoft
1. Use Python to parse the JSON into ASA commands
1. SSH to an ASA and execute the commands

---

## Configuration
* Go to [Microsoft's website](https://docs.microsoft.com/en-us/microsoft-365/enterprise/microsoft-365-ip-web-service?view=o365-worldwide) to get the URL for the worldwide endpoint JSON. Click the link on the second bullet to `https://endpoints.office.com/endpoints/worldwide` and copy the URL into the `Microsoft Endpoints URL` local variable in the workflow.

---

## Targets

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| (varies) | Terminal Endpoint | Configured for your ASA | Account key for your ASA | This target is provided to the workflow when you run it |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| (varies) | Terminal Key-Based Credentials<br />OR<br />Terminal Password-Based Credentials | Depends on target type |  |
