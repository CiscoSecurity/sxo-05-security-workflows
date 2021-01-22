---
layout: page
title: Talos - Single Blog Post to SecureX Casebook
permalink: /workflows/0002-talos-single-post
parent: Workflows
---

# Talos - Single Blog Post to SecureX Casebook
<div markdown="1">
Workflow #0002
{: .label }
</div>

This workflow parses a single Talos blog post and converts it into a SecureX casebook. This casebook can then be investigated with one click in Threat Response.

[<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0002-Talos-SingleBlogPostToCTRCasebook__definition_workflow_01KEM2V2JAIPS3zmyEiCmuy3kvr3wxHrEuJ){: .btn-cisco-outline }

---

## Important Note
This workflow is an adaptation of the sub-workflow used by the [Talos - Get New Blog Posts]({{ site.baseurl }}/workflows/0001-talos-blog) workflow. Modifying this workflow won't cause any issues with the other Talos workflow as it's completely separate. We're providing this workflow separately in case you want to adapt it for something else or play with it without the complexity of the parent workflow.

---

## Requirements
* The following atomic actions must be imported before you can import this workflow:
	* CTRGenerateAccessToken ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
	* CTR Inspect ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
	* CTRCheckDeliberateVerdict ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
	* CTR Enrich Observable ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
	* CTR Create Casebook ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
	* Util - Get String Length ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Webex Teams - Search for Room ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
	* Webex Teams - Post Message to Room ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
* (Optional) A Webex Teams bot token and room name to post messages to

---

## Workflow Steps
This workflow is designed to parse a single blog post into a casebook.

1. Fetch the blog post content and strip out any HTML
1. Request a Threat Response access token and inspect the blog post content for observables
1. Loop through each observable and get its Threat Response disposition
1. For observables that weren't clean, conduct Threat Response enrichment to get sightings
1. For modules with sightings, build the text to post to Webex
1. Create the Threat Response casebook and, if a teams room is provided, post a message to Webex

---

## Configuration
* See [this page]({{ site.baseurl }}/atomics/webex#configuring-our-workflows) for information on configuring the workflow for Webex Teams

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| [CTR_For_Access_Token]({{ site.baseurl }}/targets/default#ctr_for_access_token) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `visibility.amp.cisco.com`<br />_Path:_ `/iroh` | CTR_Credentials | Created by default |
| [CTR_API]({{ site.baseurl }}/targets/default#ctr_api) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `visibility.amp.cisco.com`<br />_Path:_ `/iroh` | None | Created by default |
| [Private_CTIA_Target]({{ site.baseurl }}/targets/default#private_ctia_target) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `private.intel.amp.cisco.com`<br />_Path:_ None | None | Created by default |
| Webex Teams | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `webexapis.com`<br />_Path:_ None | None | Not required if Webex activities are disabled |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| [CTR_Credentials]({{ site.baseurl }}/account-keys/default#ctr_credentials) | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Created by default |
