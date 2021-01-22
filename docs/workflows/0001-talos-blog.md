---
layout: page
title: Talos - Get New Blog Posts
permalink: /workflows/0001-talos-blog
parent: Workflows
---

# Talos - Get New Blog Posts
<div markdown="1">
Workflow #0001
{: .label }
</div>

This workflow consumes the Talos Intelligence Blog RSS feed and converts individual blog posts into SecureX casebooks. These casebooks can then be investigated with one click in Threat Response.

[<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0001-Talos-GetNewBlogPosts__definition_workflow_01FX7FQDZRDUX1TWgKJwTPBMaOWrgUOld2q){: .btn-cisco-outline }

---

## Important Note
This workflow has two components: a parent workflow and a sub-workflow. Importing the parent will import both. We also provide the sub-workflow separately as [Talos - Single Blog Post to SecureX Casebook]({{ site.baseurl }}/workflows/0002-talos-single-post).

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
This workflow is designed to run on a [schedule]({{ site.baseurl }}/schedules) to periodically check the Talos blog for new posts.

1. Get the RSS feed XML
1. If the Etag is the same or there aren’t any recent updates, end the workflow
1. Get the updated Etag and Last-Modified headers
1. Convert the feed XML into JSON and parse out each post’s information
1. For each blog post:
	* Check if the post has been updated since the last run of the workflow (if not, skip it)
	* Run a sub-workflow to parse the single blog post
1. Update the global variables with the new Etag and Last-Modified date

### Sub-Workflow Steps
These steps are executed for each new or updated blog post the parent workflow discovers on the Talos blog.

1. Fetch the blog post content and strip out any HTML
1. Request a Threat Response access token and inspect the blog post content for observables
1. Loop through each observable and get its Threat Response disposition
1. For observables that weren't clean, conduct Threat Response enrichment to get sightings
1. For modules with sightings, build the text to post to Webex
1. Create the SecureX casebook and, if a teams room is provided, post a message to Webex

---

## Configuration
* If you want the workflow to run on a schedule, you need to create a [schedule]({{ site.baseurl }}/schedules) and then add it as a [trigger]({{ site.baseurl }}/workflows/triggers) within the workflow
* See [this page]({{ site.baseurl }}/atomics/webex#configuring-our-workflows) for information on configuring the workflow for Webex Teams

---

## Targets

### Parent Workflow

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| Talos Intelligence Blog | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `feeds.feedburner.com`<br />_Path:_ `/feedburner/Talos` | None | |

### Sub-Workflow
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
