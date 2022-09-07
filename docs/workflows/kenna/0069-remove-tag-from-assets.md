---
layout: page
title: Remove Tag from Assets
permalink: /workflows/kenna/0069-remove-tag-from-assets
redirect_from:
  - /workflows/0069
parent: Kenna Security
grand_parent: Workflows
---

# Remove Tag from Assets
<div markdown="1">
Workflow #0069
{: .label }

Response Workflow
{: .label }
</div>

This workflow searches Kenna for assets matching the observable provided and removes a tag from them. A casebook is created for each asset if "Create Casebook" is set to true. Supported observables: `ip`, `hostname`, `mac_address`

<div class="cisco-alert cisco-alert-info"><i class="fa fa-info-circle mr-1 cisco-icon-info"></i> This workflow has been updated to use the new "SecureX Token" account key. For more information about this, please see <a href="{{ site.baseurl }}/account-keys/securex-token">this page</a>. If you want to use legacy authentication, you can import an older version of the workflow.</div>

[<i class="fab fa-github"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0069-Kenna-RemoveTagFromAssets__definition_workflow_01YLWTK4FJG3Y32dHeJPok5cEvCQv6xRHyl){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Aug 4, 2022 | - Initial release |
| Sep 7, 2022 | - Updated to support [SecureX Tokens]({{ site.baseurl }}/account-keys/securex-token) |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* Kenna - Remove Tag from Asset
	* Kenna - Search Assets
	* Threat Response - Create Casebook
* The following atomic actions must be imported before you can import this workflow:
	* None
* The [targets](#targets) and [account keys](#account-keys) listed at the bottom of the page
* Kenna Security

---

## Workflow Steps
1. Fetch global variables
1. Build the query string based on the observable provided
1. Search for matching assets
1. Convert the asset list to a table
1. For each asset:
	* Remove the tag from the asset
	* If creating casebooks is enabled, create a casebook

---

## Configuration
* Add your Kenna API token to the `API Token` local variable (or, if you have an API key in a global variable already, set the local variable to the global's value using the `Fetch Global Variables` group at the beginning of the workflow)
* Set the `Create Casebook` local variable to `true` or `false` depending on whether or not you want a casebook created for each untagged asset
* Set the `Kenna Instance URL` local variable to the URL of your Kenna instance (for example: `customer.kennasecurity.com`)
* Set the `Tag to Remove` local variable to the tag you want removed from matching assets in Kenna
* If you want to change the name of this workflow in the pivot menu, change its display name

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| Kenna_Target | HTTP Endpoint | _Protocol:_ `HTTPS` <br/> _Host:_ `api.kennasecurity.com` <br/> _Path_: None | None | |
| [Private_CTIA_Target]({{ site.baseurl }}/targets/default#private_ctia_target) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `private.intel.amp.cisco.com`<br />_Path:_ None | CTR_Credentials | Created by default |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| [CTR_Credentials]({{ site.baseurl }}/account-keys/default#ctr_credentials) | SecureX Token | | See [this page]({{ site.baseurl }}/account-keys/securex-token) |
