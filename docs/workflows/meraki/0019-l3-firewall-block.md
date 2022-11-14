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

This workflow blocks the given IP address on a Cisco Meraki MX L3 outbound firewall (using the input observable as the rule's destination). Supported observable: `ip`

[<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0019-Meraki-MX-L3OutboundFirewallBlock__definition_workflow_01N8TXL33W9E22A4yIbisj9tP8Us54bTTdt){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Apr 5, 2021 | - Initial release |
| Apr 8, 2021 | - Fixed an issue in one of the Python scripts that caused the rule list JSON to be double wrapped |
| Sep 10, 2021 | - Updated to use the new [system atomics]({{ site.baseurl }}/atomics/system) |
| Aug 31, 2022 | - Minor updates to naming and descriptions |
| Nov 14, 2022| - Updated to support multiple organizations and multiple networks ([Issue #211]({{ site.github.repository_url }}/issues/211)) |

_See the [Important Notes]({{ site.baseurl }}/notes#workflows) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* Meraki - Get Networks by Organization
	* Meraki - Get Organizations
	* Meraki - Network - MX - Get L3 Outbound Firewall Rules
	* Meraki - Network - MX - Update L3 Outbound Firewall Rules
* The following atomic actions must be imported before you can import this workflow:
	* None
* The [targets](#targets) listed at the bottom of the page
* Cisco Meraki MX Firewall

---

## Workflow Steps
1. Make sure the observable type provided is supported
1. Get the Meraki API key from a global variable (optional)
1. Loop through each organization:
	* Check the organization name is in scope
	* Loop through each network:
		* Check the network name is in scope
		* Get the existing L3 firewall rules
		* Add the new L3 firewall rule
		* Update the firewall rules

---

## Configuration
* Set the `Organization Names` local variable to a comma-separated list of organization names you want to apply updated rules to. If you leave this blank, all organizations will be updated. Note that these values are case sensitive
* Set the `Network Names` local variable to comma-separated list of network names you want to apply updated rules to. If you leave this blank, all networks will be updated. Note that these values are case sensitive
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
