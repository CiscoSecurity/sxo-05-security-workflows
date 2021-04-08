---
layout: page
title: MX L3 Outbound Firewall Block
permalink: /workflows/umbrella/0019-l3-firewall-block
redirect_from:
  - /workflows/0019
parent: Cisco Meraki
grand_parent: Workflows
---

# MX L3 Outbound Firewall Block
<div markdown="1">
Workflow #0019
{: .label }

Response Workflow
{: .label }
</div>

This workflow should be triggered from a SecureX pivot menu and supports IP address observables. When triggered, this workflow blocks the given IP adress on a Meraki MX L3 outbound firewall (using the input observable as the rule's destination).

[<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0019-Meraki-MX-L3OutboundFirewallBlock__definition_workflow_01N8TXL33W9E22A4yIbisj9tP8Us54bTTdt){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Apr 5, 2021 | - Initial release |
| Apr 8, 2021 | - Fixed an issue in one of the Python scripts that caused the rule list JSON to be double wrapped |

_See the [Important Notes]({{ site.baseurl }}/notes#workflows) page for more information about updating workflows_

---

## Requirements
* The following atomic actions must be imported before you can import this workflow:
	* Meraki - Get Networks by Organization ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Meraki - Get Organizations ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Meraki - Network - MX - Get L3 Firewall Rules ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Meraki - Network - MX - Update L3 Firewall Rule ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))

---

## Workflow Steps
1. Make sure the observable type provided is supported
1. Get the Meraki API key from a global variable (optional)
1. Get information about the Meraki network being modified
1. Get the existing L3 firewall rules
1. Add the new L3 firewall rule
1. Update the firewall rules

---

## Configuration
* Set the `Network Name` local variable to the name of your Meraki network
* Provide the workflow your Meraki API key by either:
	* Storing your token in a [global variable]({{ site.baseurl }}/variables/global) and using the `Fetch Global Variables` group at the beginning of the workflow to update the `Meraki API Key` local variable; or
	* Disable the `Fetch Global Variables` group and add your token directly to the `Meraki API Key` local variable
* If you want to change the name of this workflow in the pivot menu, change its display name

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| Cisco Meraki | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `api.meraki.com`<br />_Path:_ `/api` | None | |
