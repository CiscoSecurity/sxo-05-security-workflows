---
layout: page
title: Update Host Group with Microsoft Online IPs
permalink: /workflows/secure-network-analytics/0078-update-host-group-microsoft-online-ips
redirect_from:
  - /workflows/0078
parent: Cisco Secure Network Analytics
grand_parent: Workflows
---

# Update Host Group with Microsoft Online IPs
<div markdown="1">
Workflow #0078
{: .label }
</div>

This workflow fetches information about Microsoft Online IP addresses and subnets. These IPs and subnets are then added to a host group on Secure Network Analytics.

[<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0078-SNA-UpdateHostGroupWithMicrosoftOnlineIPs__definition_workflow_022XH02PTRM3A7VOph4iUOZjQJRJPZPXzUo){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Feb 28, 2023 | - Initial release |

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* Secure Network Analytics - Get Tenants
	* Secure Network Analytics - Get Tokens
* The following atomic actions must be imported before you can import this workflow:
	* None
* The [targets](#targets) and [account keys](#account-keys) listed at the bottom of the page
* A [SecureX orchestration remote]({{ site.baseurl }}/remote/) with connectivity to your Secure Network Analytics instance
* Cisco Secure Network Analytics (SNA)

---

## Workflow Steps
1. Fetch the IP addresses/networks from Microsoft
1. Fetch API tokens for Secure Network Analytics
1. Fetch a list of SNA tenants and extract the domain ID of the tenant configured in the "SNA Tenant Name" variable
1. Fetch a list of host groups
1. Extract the group list and search for the group ID of the group configured in the "Host Group Name" variable
1. Request the IPs from Microsoft be added to the host group

---

## Configuration
* This workflow is designed to run on a schedule. You need to create a [schedule]({{ site.baseurl }}/schedules/) and then add it as a [trigger]({{ site.baseurl }}/workflows/triggers) within the workflow
* Add your Secure Network Analytics API username and password to `SNA Username` and `SNA Password` (or, if you have them stored in global variables, use the `Fetch Global Variables` group at the beginning of the workflow to update the local variables)
* Set the `SNA Tenant Name` to the name of the tenant you want to work in
* Set the `Host Group Name` to the name of the host group to update with Microsoft Online IPs

---

## Targets
**Note:** If your Secure Network Analytics deployment is on-premises and not accessible from the internet, you will need a [SecureX orchestration remote]({{ site.baseurl }}/remote/) to use it with orchestration.

Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| Secure Network Analytics | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `your-sna-management-center.yourdomain`<br />_Path:_ None | None | |
