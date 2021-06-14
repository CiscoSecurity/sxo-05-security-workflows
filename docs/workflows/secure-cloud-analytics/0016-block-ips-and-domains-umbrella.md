---
layout: page
title: Block IPs and Domains from Alerts in Umbrella
permalink: /workflows/secure-cloud-analytics/0016-block-ips-and-domains-umbrella
redirect_from:
  - /workflows/0016
parent: Cisco Secure Cloud Analytics
grand_parent: Workflows
---

# Block IPs and Domains from Alerts in Umbrella
<div markdown="1">
Workflow #0016
{: .label }
</div>

This workflow fetches alerts from Secure Cloud Analytics (formerly Stealthwatch Cloud) for the past 24 hours based on the alert name and status provided. Observations are extracted from the alerts and their associated IPs, domain names, and URLs are logged. Each IP address, domain name, and URL is then added to a destination list in Umbrella (depending on workflow configuration). Finally, a Webex Teams message is sent with a summary.

[<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0016-SCA-BlockIPsAndDomainsFromAlerts__definition_workflow_01J72R7Z249ZJ1XEtWCLhQJx44IKOv2c5iF){: .btn-cisco-outline }

---

## Requirements
* The following atomic actions must be imported before you can import this workflow:
	* SWC - Get Alerts ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* SWC - Get Observation Details by ID ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Umbrella - Management V1 - Add Record to Destination List ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Umbrella - Management V1 - Get Destination Lists ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Webex Teams - Post Message to Room ([Github_Target_Atomics]({{ site.baseurl }}/default-repos)) * See note below!
	* Webex Teams - Search for Room ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
* The [targets](#targets) and [account keys](#account-keys) listed below
* (Optional) A Webex Teams access token and room name to post messages to

**Note:** You may have an old version of the `Webex Teams - Post Message to Room` atomic. To ensure the best experience with this workflow, be sure to import the latest version of this atomic from the `GitHub_Target_Atomics` repository!

---

## Workflow Steps
1. (Optional) Fetch any necessary global variables
1. Make sure at least one destination list was provided
1. Calculate dates
1. Fetch alerts from Secure Cloud Analytics
1. Extract observations from the alerts
1. Set up a table for IPs and a table for domains
1. For each observation:
	* Fetch the observation's details
	* Parallel block:
		* IP branches (Parse IP address, Parse external IP address, Parse connected IP address)
			* Attempt to extract an IP from the observation:
				* If an IP is found:
					* Attempt to perform a reverse DNS lookup:
						* If the lookup is successful, add the domain to the domain table (if it isn't already in the table)
						* If the lookup fails, add the IP to the IP table (if it isn't already in the table)
		* Domain/URL branches (Parse domain, Parse hostname, Parse URL)
			* Attempt to extract a domain from the observation:
				* If a domain is found, add it to the domain table (if it isn't already in the table)
1. Fetch a list of destination lists from Umbrella
1. Attempt to fetch the ID of the destination list for IPs
	* If the destination list was found:
		* Loop through each IP adding them to the list and recording whether or not adding was successful
	* If the destination list was not found, make a note in the workflow output
1. Attempt to fetch the ID of the destination list for domains
	* If the destination list was found:
		* Loop through each domain adding them to the list and recording whether or not adding was successful
	* If the destination list was not found, make a note in the workflow output
1. Send a Webex Teams message with a summary

---

## Configuration
* Set the `Secure Cloud Analytics Alert Name` local variable to the name of the alert type you want to respond to
* Set the `Secure Cloud Analytics Alert Status` local variable to the alert status you want to response to
* Add your SCA API key to the `Secure Cloud Analytics API Key` local variable (or, if you have an API key in a global variable already, set the local variable to the global's value using the `Fetch Global Variables` group at the beginning of the workflow)
* Set the `Umbrella Domain Destination List` local variable to the name of the destination list you want domains added to
* Set the `Umbrella IP Destination List` local variable to the name of the destination list you want IP addresses added to
* Set the `Umbrella Organization ID` local variable to your Umbrella organization's ID (found in your Umbrella dashboard's URL)
* See [this page]({{ site.baseurl }}/atomics/webex#configuring-our-workflows) for information on configuring the workflow for Webex Teams

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| Secure Cloud Analytics | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `your-tenant.obsrvbl.com`<br />_Path:_ `api` | None | |
| Umbrella Management | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `management.api.umbrella.com`<br />_Path:_ None | Umbrella Management | |
| Webex Teams | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `webexapis.com`<br />_Path:_ None | None | Not necessary if Webex Teams activities are removed |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| Umbrella Management | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Must be an API client for the management API |
