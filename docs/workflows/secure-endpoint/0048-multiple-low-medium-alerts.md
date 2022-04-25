---
layout: page
title: Multiple Low or Medium Alerts to ServiceNow
permalink: /workflows/secure-endpoint/0048-multiple-low-medium-alerts
redirect_from:
  - /workflows/0048
parent: Cisco Secure Endpoint
grand_parent: Workflows
---

# Multiple Low or Medium Alerts to ServiceNow
<div markdown="1">
Workflow #0048
{: .label }
</div>

This workflow searches alerts in Cisco Secure Endpoint for hosts with multiple low or medium severity events. If any endpoints are found, a ServiceNow incident ticket is opened.

[<i class="fab fa-github"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0048-SecureEndpoint-MultipleLowOrMediumAlertsToServiceNow__definition_workflow_01S7CT6V3QI0G4e8O7iop9u9GV70FUNK3pC){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Nov 2, 2021 | - Initial release |

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* Secure Endpoint - Get Computer by GUID
	* Secure Endpoint - Get Events
* The following atomic actions must be imported before you can import this workflow:
	* ServiceNow - Create Incident ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
* The [targets](#targets) and [account keys](#account-keys) listed at the bottom of the page
* Cisco Secure Endpoint
* ServiceNow

---

## Workflow Steps
1. Fetch events from Cisco Secure Endpoint
1. Parse the events and update local variables
1. Convert the hosts to a table and select all hosts with 2 or more alerts
1. For each host:
	* Fetch its full host record and extract some fields
	* Append this host to the ServiceNow ticket text
1. Check if there are any hosts to report on:
	* If there are, create a ServiceNow incident ticket

---

## Configuration
* Set the `Days to Search` local variable to how many days of events you want to aggregate
* Set the `Secure Endpoint Region` local variable based on the Secure Endpoint region you're using
* Set the `ServiceNow User ID` local variable to the username you want incidents opened as. This can either match the username in your ServiceNow **Account Key** or, if the account has the appropriate permissions, can be a different user

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| [AMP_Target]({{ site.baseurl }}/targets/default#amp_target) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `api.amp.cisco.com`<br />_Path:_ `/v1` | AMP_Credentials | Created by default |
| ServiceNow | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `<instance>.service-now.com`<br />_Path:_ `/api` | ServiceNow_Credentials | Be sure to use your instance URL |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| [AMP_Credentials]({{ site.baseurl }}/account-keys/default#amp_credentials) | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Created by default |
| ServiceNow_Credentials | HTTP Basic Authentication | _Username:_ ServiceNow User ID<br />_Password:_ ServiceNow Password | |
