---
layout: page
title: Block External Threats With Umbrella
permalink: /workflows/secure-network-analytics/0033-block-external-threats-with-umbrella
redirect_from:
  - /workflows/0033
parent: Cisco Secure Network Analytics
grand_parent: Workflows
---

# Block External Threats With Umbrella
<div markdown="1">
Workflow #0033
{: .label }
</div>

This workflow fetches top attacking external hosts from Cisco Secure Network Analytics (SNA) for the past 24 hours. Each IP address and domain name is added to a destination list in Umbrella (depending on workflow configuration). Finally, a Webex message is sent with a summary.

Note: This workflow will only fetch the first 10 external hosts. If you want to fetch more, update the limit in the workflow.

[<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0033-SNA-BlockExternalThreatsWithUmbrella__definition_workflow_01IATP4W962BA3HVzkRVOmBJk43xFT9omE3){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Jun 17, 2021 | - Initial release |
| Sep 10, 2021 | - Updated to use the new [system atomics]({{ site.baseurl }}/atomics/system) |
| Sep 7, 2022 | - Minor updates to naming and descriptions |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* Secure Network Analytics - Get Tenants
	* Secure Network Analytics - Get Tokens
	* Umbrella - Management - Add Record to Destination List
	* Umbrella - Management - Get Destination Lists
	* Webex - Post Message to Room
	* Webex - Search for Room
* The following atomic actions must be imported before you can import this workflow:
	* None
* The [targets](#targets) and [account keys](#account-keys) listed at the bottom of the page
* A [SecureX orchestration remote]({{ site.baseurl }}/remote/) with connectivity to your Secure Network Analytics instance
* Cisco Secure Network Analytics (SNA)
* Cisco Umbrella
* (Optional) Cisco Webex

---

## Workflow Steps
1. Fetch global variables
1. Calculate dates and times
1. Get Secure Network Analytics tokens and tenant information
1. Fetch and parse the top hosts
1. Get the Umbrella destination list IDs
1. For each IP address:
	* Perform a reverse DNS lookup:
	* If successful, add the domain to the DNS destination list
	* If unsuccessful, add the IP address to the web destination list
1. Send a Webex message (if a room was provided)

---

## Configuration
* Add your Secure Network Analytics API username and password to `SNA Username` and `SNA Password` (or, if you have them stored in global variables, use the `Fetch Global Variables` group at the beginning of the workflow to update the local variables)
* Set the `SNA Tenant Name` to the name of the tenant you want to work in
* Set the `Top Host Count` local variable to the number of top hosts to fetch
* Set the `Umbrella Domain Destination List` local variable to the name of the destination list you want domains added to
* Set the `Umbrella IP Destination List` local variable to the name of the destination list you want IP addresses added to
* Set the `Umbrella Organization ID` local variable to your Umbrella organization's ID (found in your Umbrella dashboard's URL)
* See [this page]({{ site.baseurl }}/atomics/configuration/webex#configuring-our-workflows) for information on configuring the workflow for Webex

---

## Targets
**Note:** If your Secure Network Analytics deployment is on-premises and not accessible from the internet, you will need a [SecureX orchestration remote]({{ site.baseurl }}/remote/) to use it with orchestration.

Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| Secure Network Analytics | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `your-sna-management-center.yourdomain`<br />_Path:_ None | None | |
| Umbrella Management | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `management.api.umbrella.com`<br />_Path:_ None | Umbrella Management | |
| Webex Teams | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `webexapis.com`<br />_Path:_ None | None | Not necessary if Webex activities are removed |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| Umbrella Management | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Must be an API client for the management API |
