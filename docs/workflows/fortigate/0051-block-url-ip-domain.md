---
layout: page
title: Block URL, IP, or Domain
permalink: /workflows/fortigate/0051-block-url-ip-domain
redirect_from:
  - /workflows/0051
parent: Fortinet FortiGate
grand_parent: Workflows
---

# Block URL, IP, or Domain
<div markdown="1">
Workflow #0051
{: .label }

Response Workflow
{: .label }
</div>

This workflow blocks a URL, IP, or domain name in Fortinet FortiGate by adding them to a URL/web filter or address group and then updating a firewall policy. Supported observables: `ip`, `url`, `domain`

[<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0051-FortiGate-BlockURLIPOrDomain__definition_workflow_01QDUJPTX5MFZ4xHLGKnkEw8EzTffvFPy7W){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Nov 10, 2021 | - Initial release |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* None
* The following atomic actions must be imported before you can import this workflow:
	* Fortinet - FortiGate - Add Address to Address Group ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Fortinet - FortiGate - Add URL Filter to Web Filter Profile ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Fortinet - FortiGate - Add URL to URL Filter ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Fortinet - FortiGate - Create Address ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Fortinet - FortiGate - Create URL Filter ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Fortinet - FortiGate - Get Policy by Name ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Fortinet - FortiGate - Get Web Filter by Name ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Fortinet - FortiGate - Move Policy to Top of Policy List ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Fortinet - FortiGate - Search for Address by Value ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Fortinet - FortiGate - Update Firewall Policy ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Microsoft Teams - Post Message via Webhook ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
* The [targets](#targets) and [account keys](#account-keys) listed below
* Fortinet FortiGate
* Microsoft Teams

---

## Workflow Steps
Note: Errors are accumulated during workflow execution using `Add error to local variable` activitys

1. Defang the observable, generate object names, and validate input
1. Is the observable a URL?
	* Get the web filter (if that fails
	* Extract the MKey of the URL filter from the web filter
		* If extraction succeeds, add the URL to the URL filter
		* If extraction fails, create a new URL filter and add it to the web filter
1. Is the observable an IP address or domain?
	* Search for existing address objects for this observable
		* If an address object was found, make note of its name
		* If an address object was not found, create a new one
	* Add the address object to the address group
1. Check if there have been errors (if so, skip the next section)
	* Get the firewall policy
	* Update the firewall policy with the objects created/updated during the workflow
	* Move the policy to the top of the policy list
1. Compile the workflow results and send a Microsoft Teams message

---

## Configuration
* Set the `Access Token` local variable to your Fortinet FortiGate API token
* Set the `Address Group Name` local variable to the name of the address group to add address objects to
* Set the `Policy Name` local variable to the name of the firewall policy to make changes to
* Set the `Web Filter Name` local variable to the name of the web filter to add URLs to
* If you want to change the name of this workflow in the pivot menu, change its display name

---

## Targets
**Note:** If your FortiGate instance is on-premises and not accessible from the internet, you will need a [SecureX orchestration remote]({{ site.baseurl }}/remote/) to use it with orchestration.

Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| Fortinet FortiGate | HTTP Endpoint | _Protocol:_ `HTTPS` <br/> _Host:_ `your-fortigate-instance` <br/> _Path_: `/api` | None | If you use a self-signed certificate, disable certificate validation on the target |
| Microsoft Teams Webhook | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `your-tenant.webhook.office.com`<br />_Path:_ `/the-rest-of-the-webhook-url` | None | |
