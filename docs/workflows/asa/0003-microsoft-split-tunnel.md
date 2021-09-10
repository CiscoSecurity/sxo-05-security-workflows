---
layout: page
title: Microsoft Online Split Tunnel
permalink: /workflows/asa/0003-microsoft-split-tunnel
redirect_from:
  - /workflows/0003-microsoft-asa-split-tunnel
  - /workflows/0003
parent: Cisco Adaptive Security Appliance
grand_parent: Workflows
---

# Microsoft Online Split Tunnel
<div markdown="1">
Workflow #0003
{: .label }
</div>

Microsoft provides a JSON-formatted feed of their networks and domains for their various cloud services. This workflow demonstrates fetching that JSON, converting it into split-tunneling commands for Cisco Adaptive Security Appliance (ASA), and then executing those commands on an ASA.

[<i class="fa fa-video mr-1"></i> Overview](https://www.youtube.com/watch?v=K1WEFREjrco&list=PLPFIie48Myg2tu2gHbgm-moYg8LDaXsSo){: .btn-cisco-outline .mr-2 } [<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0003-ASA-MicrosoftOnlineSplitTunnel__definition_workflow_01FXTIIRZG1V03F4wJ1BsZoEAYc8NgBCBRP){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Nov 24, 2020 | - Initial release |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* None
* The following atomic actions must be imported before you can import this workflow:
	* None
* The [targets](#targets) and [account keys](#account-keys) listed below
* Cisco Adaptive Security Appliance (ASA)

---

## Workflow Steps
1. Fetch the online services information JSON from Microsoft
1. Use Python to parse the JSON into ASA commands
1. SSH to an Adaptive Security Appliance and execute the commands

---

## Configuration
* Go to [Microsoft's website](http://aka.ms/ipurlws) to get the URL for the worldwide endpoint JSON. Click the link on the second bullet to `https://endpoints.office.com/endpoints/worldwide` and copy the URL into the `Microsoft Endpoints URL` local variable in the workflow
* (Optional) Change the name of the objects created by the workflow in the `AnyConnect Exclude Domain Group Name` and/or `Network Object Group Name` local variables
* (Optional) Modify the commands generated in the `Get and parse JSON from Microsoft` and/or `Execute commands on ASA` activities

---

## Targets

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| (varies) | Terminal Endpoint | Configured for your ASA | Account key for your ASA | This target is provided to the workflow when you run it |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| (varies) | Terminal Key-Based Credentials<br />OR<br />Terminal Password-Based Credentials | Depends on target type | |
