---
layout: page
title: Block Observables - Setup
permalink: /workflows/secure-firewall/0015A-block-observables-setup
redirect_from:
  - /workflows/0015A
parent: Cisco Secure Firewall
grand_parent: Workflows
---

# Block Observables - Setup
<div markdown="1">
Workflow #0015A
{: .label }
</div>

This workflow creates a series of indicators and feeds for various observable types in Cisco Threat Response. These feeds can then be added to Cisco Secure Firewall (or other compatible platforms) to block observables.

[<i class="fab fa-github"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0015A-SecureFirewall-BlockObservablesSetup__definition_workflow_01J9UPDI6BBXA3XAvEZYTwStfP3NI14VCxX){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Apr 19, 2021 | - Initial release |
| Sep 10, 2021 | - Updated to use the new [system atomics]({{ site.baseurl }}/atomics/system) |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* Threat Response - Generate Access Token
* The following atomic actions must be imported before you can import this workflow:
	* None
* The [targets](#targets) and [account keys](#account-keys) listed below
* Cisco Secure Firewall

---

## Important Notes
* This workflow is only designed to be run once after initial import. Its purpose is to configure pre-requisites for workflow [0015B]({{ site.baseurl }}/workflows/0015B).
* At the end of the workflow, the `Output Text` variable will contain a list of feed URLs for each observable type. You'll need to configure these feeds in Secure Firewall using the instructions [here](#adding-feeds-to-secure-firewall).
* The feeds created by this workflow can also be used by other platforms, both from Cisco or from third parties.

---

## Workflow Steps
1. Generate a Threat Response access token
1. For each observable type:
	* Search for an indicator for this observable type
	* Check if the indicator was found:
		* If it was, extract the indicator ID
		* If it wasn't, create the indicator
	* Search for a feed for this observable type
	* Check if the feed was found:
		* If it was, extract the feed view URL
		* If it wasn't, create the feed

---

## Configuration

### Local Variables
* The template used to name indicators created by this workflow can be changed in `Indicator Name`
* The template used to name feeds created by this workflow can be changed in `Feed Name`

### Adding Feeds to Secure Firewall
Once this workflow has executed, you need to configure Secure Firewall to pull data from the feeds created. First, you need to get the feed URLs from either SecureX Threat Response or the workflow output. Then, you need to add the feed URLs to Secure Firewall.

#### Getting the Feed URLs (from Threat Response)
1. In SecureX Threat Response, click on the **Intelligence** tab
1. On the left menu, click on **Feeds**
1. You should see five `Secure_Firewall_SecureX_Private_Feed` feeds
1. For each feed, make a note of the observable type in the feed title and the feed URL

#### Getting the Feed URLs (from workflow output)
1. In SecureX orchestration, open this workflow in the workflow editor and then click the **Runs** button at the top
1. Select the most recent run of the workflow (you may need to change the timeframe depending on how long ago you ran it)
1. Scroll down the workflow's properties and look for the `Output Text` variable
1. Click on the variable and copy the value

#### Adding Feeds to Secure Firewall
Next, the feeds created by this workflow need to be configured in Secure Firewall. Here's a sample of the output from the setup workflow:
```
Feed View URL for IPv4: https://private.intel.amp.cisco.com:443/ctia/feed/feed-12345678-4b75-4c93-8c04-ca9c12f81972/view.txt?s=12345678-2bbb-45d8-a2cb-8693118f26bd
Feed View URL for IPv6: https://private.intel.amp.cisco.com:443/ctia/feed/feed-12345678-82eb-4da2-8f39-f512ff669a87/view.txt?s=12345678-fea0-4116-af47-14fc3cbba392
Feed View URL for Domain: https://private.intel.amp.cisco.com:443/ctia/feed/feed-12345678-60ae-483c-a111-02f3a6987a67/view.txt?s=12345678-f45e-40aa-9aa7-0899b5da3002
Feed View URL for URL: https://private.intel.amp.cisco.com:443/ctia/feed/feed-12345678-dc77-44e0-9984-fc26170d4893/view.txt?s=12345678-b203-4af7-a9fc-8e4dbffc1fc3
Feed View URL for SHA256: https://private.intel.amp.cisco.com:443/ctia/feed/feed-12345678-b1d4-4b87-885c-0d3e4b834423/view.txt?s=12345678-58f3-48a1-bbbe-cdd71933503c
```

1. In Secure Firewall, navigate to **Intelligence** and then **Sources**
1. Click the plus icon to add a new feed and use these values:
	* Delivery: URL
	* Type: Flat File
	* Content: (the type of observable this feed is for: IPv6, IPv6, Domain, URL, SHA256)
	* URL: `Feed URL from the workflow output`
	* Name: (a descriptive name for the source)
	* Action: Block
	* Update Every (minutes): 30 (you can customize this if you want)
1. Click Save
1. Repeat for the other 4 feeds

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| [CTR_For_Access_Token]({{ site.baseurl }}/targets/default#ctr_for_access_token) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `visibility.amp.cisco.com`<br />_Path:_ `/iroh` | CTR_Credentials | Created by default |
| [Private_CTIA_Target]({{ site.baseurl }}/targets/default#private_ctia_target) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `private.intel.amp.cisco.com`<br />_Path:_ None | None | Created by default |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| [CTR_Credentials]({{ site.baseurl }}/account-keys/default#ctr_credentials) | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Created by default |
