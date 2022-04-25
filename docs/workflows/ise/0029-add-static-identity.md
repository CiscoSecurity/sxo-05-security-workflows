---
layout: page
title: Add Endpoint to Identity Group
permalink: /workflows/ise/0029-add-static-identity
redirect_from:
  - /workflows/0029
parent: Cisco Identity Services Engine
grand_parent: Workflows
---

# Add Endpoint to Identity Group
<div markdown="1">
Workflow #0029
{: .label }

Response Workflow
{: .label }
</div>

This workflow adds a static identity group assignment to a MAC address in Cisco Identity Services Engine (ISE). For example, if you're using identity groups to determine which authorization profile to apply, you can use this response workflow to alter an endpoint's permissions. Supported observable: `mac_address`

[<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0029-ISE-AddEndpointToIdentityGroup__definition_workflow_01O466MIFZKMV0qedvuz6jffSKFa38bptVQ){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| May 26, 2021 | - Initial release |
| Sep 10, 2021 | - Updated to use the new [system atomics]({{ site.baseurl }}/atomics/system) |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* ISE - ERS - Endpoint - Create Endpoint
	* ISE - ERS - Endpoint - Search
	* ISE - ERS - Endpoint - Update Identity Group
	* ISE - ERS - Endpoint Identity Group - Get by Name
* The following atomic actions must be imported before you can import this workflow:
	* None
* The [targets](#targets) and [account keys](#account-keys) listed at the bottom of the page
* Cisco Identity Services Engine (ISE)

---

## Workflow Steps
1. Make sure the observable type provided is supported
1. Make sure the identity group exists and get its ID
1. Search for the endpoint by MAC address
1. Check if the endpoint exists:
	* If it does, update its group assignment
	* If it doesn't, create it and add it to the identity group

---

## Configuration
* Set the `Identity Group Name` local variable to the name of the endpoint identity group to add endpoints to
* If you want to change the name of this workflow in the pivot menu, change its display name

---

## Targets
**Note:** If your Cisco ISE deployment is on-premises and not accessible from the internet, you will need a [SecureX orchestration remote]({{ site.baseurl }}/remote/) to use ISE with orchestration.

Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| Cisco ISE ERS | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `ISE Primary Admin Node`<br />_Port:_ `9060`<br />_Path:_ None | ISE_ERS_Credentials | |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| ISE_ERS_Credentials | HTTP Basic Authentication | _Username:_ ISE Username<br />_Password:_ ISE Password | Must have ERS Admin permission |
