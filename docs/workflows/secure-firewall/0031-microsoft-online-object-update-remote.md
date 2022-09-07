---
layout: page
title: Microsoft Online Dynamic Object Update (Remote)
permalink: /workflows/secure-firewall/0031-microsoft-online-object-update-remote
redirect_from:
  - /workflows/0031
parent: Cisco Secure Firewall
grand_parent: Workflows
---

# Microsoft Online Dynamic Object Update (Remote)
<div markdown="1">
Workflow #0031
{: .label }
</div>

Microsoft provides a JSON-formatted feed of their networks and domains for their various cloud services. This workflow demonstrates fetching that JSON, reformatting it, and updating a dynamic object group on Cisco Secure Firewall.

<div class="cisco-alert cisco-alert-info"><i class="fa fa-info-circle mr-1 cisco-icon-info"></i> There are two different ways to integrate Secure Firewall with orchestration. For more information about these two methods and which to use, please see <a href="{{ site.baseurl }}/workflows/secure-firewall/api-types">this page</a>.</div>

[<i class="fab fa-github"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0031-SecureFirewall-MicrosoftOnlineDynamicObjectUpdateRemote__definition_workflow_01GBHSG8W1EU50QmDkyCiszg04ZzAGqbFsc){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| May 26, 2021 | - Initial release |
| Sep 10, 2021 | - Updated to use the new [system atomics]({{ site.baseurl }}/atomics/system) |
| Sep 7, 2022 | - Minor updates to naming and descriptions |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* Secure Firewall - Create Dynamic Object Group
	* Secure Firewall - Get Access Token
	* Secure Firewall - Get Dynamic Object Group Mappings
	* Secure Firewall - Update Dynamic Object Group Mappings
* The following atomic actions must be imported before you can import this workflow:
	* None
* The [targets](#targets) and [account keys](#account-keys) listed at the bottom of the page
* Cisco Secure Firewall (software version 7.0 or newer)

---

## Workflow Steps
1. Get an access token for Secure Firewall
1. Get the existing dynamic object group mappings
1. Check if fetching the mappings succeeded (if not, create a new dynamic object group)
1. Fetch the JSON from Microsoft and generate a list of records to add and to remove
1. Check if any records need to be added (if so, add them)
1. Check if any records need to be removed (if so, remove them)

---

## Configuration
* Go to [Microsoft's website](http://aka.ms/ipurlws) to get the URL for the worldwide endpoint JSON. Click the link on the second bullet to `https://endpoints.office.com/endpoints/worldwide` and copy the URL into the `Microsoft Endpoints URL` local variable in the workflow
* Set the `Dynamic Object Group Name` local variable to the name of the object group you want to update. Note that this group must be created on Firewall Management Center prior to running the workflow

---

## Targets
**Note:** If your FMC is on-premises and not accessible from the internet, you will need a [SecureX orchestration remote]({{ site.baseurl }}/remote/) to use FMC with orchestration.

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| FMC Target | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `your-firewall-management-center`<br />_Path:_ `api/` | FMC API Credentials | |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| FMC API Credentials | HTTP Basic Authentication | _Username:_ FMC Username<br />_Password:_ FMC Password | Account must have API permissions |
