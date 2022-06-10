---
layout: page
title: Block Observable (Direct)
permalink: /workflows/secure-firewall/0065-block-observable-direct
redirect_from:
  - /workflows/0065
parent: Cisco Secure Firewall
grand_parent: Workflows
---

# Block Observable (Direct)
<div markdown="1">
Workflow #0065
{: .label }

Response Workflow
{: .label }
</div>

This workflow takes a URL, domain, IP, or IPv6 observable as input and blocks it on the Secure Firewall Management Center. The observable is added to a new object and the new object is added to an existing object group. A confirmation is sent via Webex. Supported observables: `url`, `ip`, `ipv6`, `domain`

<div class="cisco-alert cisco-alert-info"><i class="fa fa-info-circle mr-1 cisco-icon-info"></i> This workflow is similar to workflow <a href="{{ site.baseurl }}/workflows/0015B">0015B</a> but works differently. Workflow 0015B adds observables to feeds in SecureX which Secure Firewall then consumes. This workflow makes API calls directly to Secure Firewall, typically through an <a href="{{ site.baseurl }}/remote/">orchestration remote</a>.</div>

[<i class="fab fa-github"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0065-SecureFirewall-BlockObservableDirect__definition_workflow_01RPCS2JNL71O2RnvI9Ba1LdJE4TV186EVr){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| May 4, 2022 | - Initial release |

_See the [Important Notes](/sxo-05-security-workflows/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics](/sxo-05-security-workflows/atomics/system) are used by this workflow:
    * Secure Firewall - Add Network Object to Network Group
    * Secure Firewall - Add URL Object to URL Group
    * Secure Firewall - Create Object
    * Secure Firewall - Get Access Token
    * Secure Firewall - Get Network Group by Name
    * Secure Firewall - Get URL Group by Name
    * Secure Firewall - Search object by Value
    * Webex - Post Message to Room
    * Webex - Search for Room
* The [targets](#targets) and [account keys](#account-keys) listed at the bottom of the page
* Cisco Secure Firewall
* Cisco Webex

---

## Workflow Steps
1. Fetch global variables
1. Set the workflow run URL based on region
1. Search for the Webex room provided
1. Validate required variables are provided
1. Set the object types based on the observable type
1. Search for existing objects for this observable
1. Check if an object already exists:
    * If it does, use the existing object
    * If it doesn't, create a new object
1. Check if we're working with network or URL objects:
    * If network objects:
        * Get the network group and check if the object is already in it (if so, end the workflow)
        * Add the object to the group and send a confirmation
    * If URL objects:
        * Get the URL group and check if the object is already in it (if so, end the workflow)
        * Add the object to the group and send a confirmation

---

## Configuration

* Configure the following local variables with the options you want for your Secure Firewall Management Center:
    * Access Control Policy
    * Access Rule
    * Object Name Prefix
    * URL Group
    * Network Group
* If you want to change the name of this workflow in the pivot menu, change its display name
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
