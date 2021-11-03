---
layout: page
title: Block URL, IP, or Domain
permalink: /workflows/panorama/0049-block-url-ip-domain
redirect_from:
  - /workflows/0049
parent: Palo Alto Panorama
grand_parent: Workflows
---

# Block URL, IP, or Domain
<div markdown="1">
Workflow #0049
{: .label }

Response Workflow
{: .label }
</div>

This workflow blocks a URL, IP, or domain name in Palo Alto Panorama by adding them to a URL category or address group and then updating a security policy pre rule. Supported observables: `ip`, `ipv6`, `url`, `domain`

[<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0049-Panorama-BlockURLIPOrDomain__definition_workflow_01QQG9NUCO14V5y0h39Wlzt3DezSqNWSU7R){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Nov 3, 2021 | - Initial release |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* None
* The following atomic actions must be imported before you can import this workflow:
	* Microsoft Teams - Post Message via Webhook ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Palo Alto - Panorama - Add Address Object to Address Group ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Palo Alto - Panorama - Add URL to Custom URL Category ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Palo Alto - Panorama - Create Address Object ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Palo Alto - Panorama - Search Address Objects by Value ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Palo Alto - Panorama - Update Security Policy Pre Rule ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
* The [targets](#targets) and [account keys](#account-keys) listed below
* Palo Alto Panorama
* Microsoft Teams

---

## Workflow Steps
1. Validate the input and make sure the observable is supported
1. Is the observable a URL or domain?
	* Make sure a URL category was provided (if not, log an error)
	* Add the URL to the URL category (if that fails, log an error)
	* Update the security policy pre rule with the URL category (if that fails, log an error)
1. Is the observable an IP address?
	* Make sure an address group was provided (if not, log an error)
	* Check if an existing address object exists for this observable:
		* If it does, add it to the address group
		* If it doesn't, create a new address object and add it to the address group
	* Update the security policy pre rule with the address group (if that fails, log an error)
1. Compile the workflow results and send a Microsoft Teams message

---

## Configuration
* Set the `Address Group Name` local variable to the name of the address group to add address objects to
* Set the `API Key` local variable to your Palo Alto Panorama API key
* Set the `Custom URL Category Name` local variable to the name of the URL category to add URLs and domains to
* Set the `Security Policy Pre Rule Name` local variable to the name of the security policy pre rule to make changes to
* If you want to change the name of this workflow in the pivot menu, change its display name

---

## Targets
**Note:** If your Panorama instance is on-premises and not accessible from the internet, you will need a [SecureX orchestration remote]({{ site.baseurl }}/remote) to use it with orchestration.

Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| Palo Alto Panorama | HTTP Endpoint | _Protocol:_ `HTTPS` <br/> _Host:_ `your-panorama-instance` <br/> _Path_: `restapi` | None | If you use a self-signed certificate, disable certificate validation on the target |
| Microsoft Teams Webhook | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `your-tenant.webhook.office.com`<br />_Path:_ `/the-rest-of-the-webhook-url` | None | |
