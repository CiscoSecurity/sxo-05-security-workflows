---
layout: page
title: Get Expiring Rules
permalink: /workflows/secure-firewall/0066-get-expiring-rules
redirect_from:
  - /workflows/0066
parent: Cisco Secure Firewall
grand_parent: Workflows
---

# Get Expiring Rules
<div markdown="1">
Workflow #0066
{: .label }
</div>

This workflow searches up to 500 Cisco Secure Firewall Management Center policies for time-based rules that are set to expire within the configured expiry time. If expired or soon-to-expire rules are found, a message is posted in Webex with the rule details.

[<i class="fab fa-github"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0066-SecureFirewall-GetExpiringRules__definition_workflow_01WVT28096I5E0j1oYDuwGpaxQwB2PO3DUC){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Aug 1, 2022 | - Initial release |

_See the [Important Notes](/sxo-05-security-workflows/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics](/sxo-05-security-workflows/atomics/system) are used by this workflow:
	* Secure Firewall - Get Access Token
    * Webex - Post Message to Room
    * Webex - Search for Room
* The following atomic actions must be imported before you can import this workflow:
	* None
* The [targets](#targets) and [account keys](#account-keys) listed below
* Cisco Secure Firewall
* Cisco Webex

---

## Workflow Steps
1. Validate required settings and fetch the Webex room ID
1. Get access token for FMC
1. Get time-range objects
1. Get access policies
1. For each policy:
    * Check each rule for time-based objects
    * If time-based objects are found in rule:
        * Calculate the expiry time and append to the workflow output as needed
1. Finalize the output of the workflow based on what was found
1. Post message to Webex

---

## Configuration
* Set the `Check For Expired Rules` local variable to `true` or `false` depending on whether you want to report on rules which already expired
* Set the `Expiring Soon Time Period` local variable to the number of days you want to use as the threshold for considering a rule to be expiring soon. For example, if you set this to 7 days, any rule expiring within 7 days will be considered "expiring soon"
* Set the `Secure Firewall Management Center URL` to the base URL of your FMC portal. For example: `https://securefirewall.yourcompany.com`
* If you want the workflow to run on a schedule, you need to create a [schedule]({{ site.baseurl }}/schedules/) and then add it as a [trigger]({{ site.baseurl }}/workflows/triggers) within the workflow
* See [this page]({{ site.baseurl }}/atomics/configuration/webex#configuring-our-workflows) for information on configuring the workflow for Webex

---

## Targets
Target Group: `Default TargetGroup`

**Note:** If your FMC is on-premises and not accessible from the internet, you will need a [SecureX orchestration remote]({{ site.baseurl }}/remote/) to use FMC with orchestration.

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| FMC Target | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `your-firewall-management-center`<br />_Path:_ `api/` | FMC API Credentials | |
| Webex Teams | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `webexapis.com`<br />_Path:_ None | None | |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| FMC API Credentials | HTTP Basic Authentication | _Username:_ FMC Username<br />_Password:_ FMC Password | Account must have API permissions |
