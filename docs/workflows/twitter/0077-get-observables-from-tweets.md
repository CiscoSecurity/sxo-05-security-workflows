---
layout: page
title: Tweets to Incidents
permalink: /workflows/twitter/0077-get-observables-from-tweets
redirect_from:
  - /workflows/0077
parent: Twitter
grand_parent: Workflows
---

# Get Observables from Tweets
<div markdown="1">
Workflow #0077
{: .label }
</div>

This workflow searches recent Tweets for the specified hashtags and/or usernames and uses SecureX Threat Response to investigate each observable found. A malicious judgement is created for each observable and, if any sightings are found, an optional SecureX casebook and incident can be created. Finally, a Webex message will be sent with a summary of findings.

[<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0077-Twitter-GetObservablesFromTweets__definition_workflow_021AABHY4ELIZ7Rkeul8fRvQkTH8WMvRJvK){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Feb 23, 2023 | - Initial release |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* Threat Response - Create Casebook
	* Threat Response - Create Incident
	* Threat Response - Create Judgement
    * Threat Response - Create Relationship
	* Threat Response - Enrich Observable
	* Threat Response - Inspect for Observables
	* Webex - Search for Room
	* Webex - Post Message to Room
* The following atomic actions must be imported before you can import this workflow:
	* Twitter - Get Recent Tweets by Hashtag or Username
* The [targets](#targets) and [account keys](#account-keys) listed at the bottom of the page
* (Optional) Cisco Webex

---

## Workflow Steps
This workflow is designed to run on a [schedule]({{ site.baseurl }}/schedules/) to periodically check for new matching Tweets.

1. Fetch global variables and detect environment
1. Search for the Webex room
1. For each hashtag and username:
	* Get recent Tweets
	* For each Tweet returned:
		* Inspect for observables
		* For each observable:
			* Create a malicious judgement
			* Check for sightings
			* If sightings are found, create an incident and casebook
			* Create a casebook and incident for the sighting
			* Post a message to Webex

---

## Configuration
* If you want the workflow to run on a schedule, you need to create a [schedule]({{ site.baseurl }}/schedules/) and then add it as a [trigger]({{ site.baseurl }}/workflows/triggers) within the workflow
* See [this page]({{ site.baseurl }}/atomics/configuration/webex#configuring-our-workflows) for information on configuring the workflow for Webex

---

## Targets

Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| [CTR_API]({{ site.baseurl }}/targets/default#ctr_api) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `visibility.amp.cisco.com`<br />_Path:_ `/iroh` | CTR_Credentials | Created by default |
| [Private_CTIA_Target]({{ site.baseurl }}/targets/default#private_ctia_target) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `private.intel.amp.cisco.com`<br />_Path:_ None | None | Created by default |
| Twitter API v2 | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `api.twitter.com`<br />_Path:_ `/v2` | None | |
| Webex Teams | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `webexapis.com`<br />_Path:_ None | None | Not necessary if Webex activities are removed |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| [CTR_Credentials]({{ site.baseurl }}/account-keys/default#ctr_credentials) | SecureX Token | | See [this page]({{ site.baseurl }}/account-keys/securex-token) |
