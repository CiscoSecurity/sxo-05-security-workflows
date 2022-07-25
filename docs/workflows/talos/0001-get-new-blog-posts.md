---
layout: page
title: Get New Blog Posts
permalink: /workflows/talos/0001-get-new-blog-posts
redirect_from:
  - /workflows/0001-talos-blog
  - /workflows/0001
parent: Talos Intelligence
grand_parent: Workflows
---

# Get New Blog Posts
<div markdown="1">
Workflow #0001
{: .label }
</div>

This workflow consumes the Talos Intelligence Blog RSS feed and converts individual blog posts into Cisco SecureX casebooks if they contain suspicious observables. These casebooks can then be investigated with one click in Cisco Threat Response.

[<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0001-Talos-GetNewBlogPosts__definition_workflow_01FX7FQDZRDUX1TWgKJwTPBMaOWrgUOld2q){: .btn-cisco-outline }

---

## Important Note
This workflow has two components: a parent workflow and a sub-workflow. Importing the parent will import both. We also provide the sub-workflow separately as [Talos - Single Blog Post to SecureX Casebook]({{ site.baseurl }}/workflows/talos/0002-single-post-casebook).

---

## Change Log

| Date | Notes |
|:-----|:------|
| Nov 24, 2020 | - Initial release |
| Feb 20, 2021 | - Updated to use new sub-workflow based on updated workflow [0002]({{ site.baseurl }}/workflows/talos/0002-single-post-casebook)<br />- Updated to use new Threat Response atomics<br />- Fixed an issue where the Threat Response token could expire during investigation ([Issue #2]({{ site.github.repository_url }}/issues/2))<br />- Added auto-detection for the Threat Response environment URL<br />- Changed how the Webex message and casebook summary are generated to be more reliable and useful |
| Jun 24, 2021 | - Updated the user agent header being used to fetch blog posts from Talos |
| Sep 10, 2021 | - Updated to use the new [system atomics]({{ site.baseurl }}/atomics/system) |
| Nov 12, 2021 | - Updated the workflow based on a change to the Talos blog XML (The `origLink` field is now called `link`) |
| Apr 5, 2022 | - Fixed the Post URL link markdown for the SecureX casebook |
| Jul 25, 2022 | - Updated to handle the new Talos blog feed format ([Issue #177]({{ site.github.repository_url }}/issues/177)) |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* Threat Response - Create Casebook
	* Threat Response - Deliberate Observable
	* Threat Response - Enrich Observable
	* Threat Response - Generate Access Token
	* Threat Response - Inspect for Observables
	* Webex - Search for Room
	* Webex - Post Message to Room
* The following atomic actions must be imported before you can import this workflow:
	* None
* The [targets](#targets) and [account keys](#account-keys) listed at the bottom of the page
* (Optional) Cisco Webex

---

## Workflow Steps
This workflow is designed to run on a [schedule]({{ site.baseurl }}/schedules/) to periodically check the Talos blog for new posts.

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
* If you want the workflow to run on a schedule, you need to create a [schedule]({{ site.baseurl }}/schedules/) and then add it as a [trigger]({{ site.baseurl }}/workflows/triggers) within the workflow
* See [this page]({{ site.baseurl }}/atomics/configuration/webex#configuring-our-workflows) for information on configuring the workflow for Webex

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
| Webex Teams | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `webexapis.com`<br />_Path:_ None | None | Not necessary if Webex activities are removed |

---

## Account Keys

### Sub-Workflow

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| [CTR_Credentials]({{ site.baseurl }}/account-keys/default#ctr_credentials) | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Created by default |
