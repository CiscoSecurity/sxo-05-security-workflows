---
layout: page
title: Get New Blog Posts
permalink: /workflows/google-tag/0076-get-new-blog-posts
redirect_from:
  - /workflows/0076
parent: Google Threat Analysis Group
grand_parent: Workflows
---

# Get New Blog Posts
<div markdown="1">
Workflow #0076
{: .label }
</div>

This workflow fetches the Google Threat Analytics Group's Intelligence Blog RSS feed and converts individual blog posts into Cisco SecureX casebooks if they contain suspicious observables. These casebooks can then be investigated with one click in Cisco Threat Response.

[<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0076-GoogleTAG-GetNewBlogPosts__definition_workflow_01VW2B5RSJLWJ3FrIiDZbsk83nCwTZDOeiw){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Dec 20, 2022 | - Initial release |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* Threat Response - Create Casebook
	* Threat Response - Deliberate Observable
	* Threat Response - Enrich Observable
	* Threat Response - Inspect for Observables
	* Webex - Search for Room
	* Webex - Post Message to Room
* The following atomic actions must be imported before you can import this workflow:
	* None
* The [targets](#targets) and [account keys](#account-keys) listed at the bottom of the page
* (Optional) Cisco Webex

---

## Workflow Steps
This workflow is designed to run on a [schedule]({{ site.baseurl }}/schedules/) to periodically check the Google TAG blog for new posts.

1. Fetch and validate global variables
1. Get the RSS feed XML
1. If not successful, end the workflow
1. Get the last build date from XML body
1. Check if the build date has changed (if not, end the workflow)
1. Convert the feed XML into JSON and parse out each post’s information
1. For each blog post:
	* Check if the post has been posted since the last run of the workflow, if not, skip it
	* Run a sub-workflow to parse this single blog post
1. Update the global variables last modified date and last run date

### Sub-Workflow Steps
These steps are executed for each new or updated blog post the parent workflow discovers on the Google TAG blog.

1. Fetch the blog post content and strip out any HTML
1. Inspect the blog post content for observables
1. Loop through each observable and get its Threat Response disposition
1. For observables that weren't clean, conduct Threat Response enrichment to get sightings
1. For modules with sightings, build the text to post to the casebook and Webex
1. Create the SecureX casebook and, if a Webex room is provided, post a message to Webex

---

## Configuration
* If you want the workflow to run on a schedule, you need to create a [schedule]({{ site.baseurl }}/schedules/) and then add it as a [trigger]({{ site.baseurl }}/workflows/triggers) within the workflow
* See [this page]({{ site.baseurl }}/atomics/configuration/webex#configuring-our-workflows) for information on configuring the workflow for Webex

---

## Targets

### Parent Workflow

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| Google TAG Blog | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `blog.google`<br />_Path:_ `/threat-analysis-group/rss` | None | |

### Sub-Workflow
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| [CTR_API]({{ site.baseurl }}/targets/default#ctr_api) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `visibility.amp.cisco.com`<br />_Path:_ `/iroh` | CTR_Credentials | Created by default |
| [Private_CTIA_Target]({{ site.baseurl }}/targets/default#private_ctia_target) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `private.intel.amp.cisco.com`<br />_Path:_ None | None | Created by default |
| Webex Teams | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `webexapis.com`<br />_Path:_ None | None | Not necessary if Webex activities are removed |

---

## Account Keys

### Sub-Workflow

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| [CTR_Credentials]({{ site.baseurl }}/account-keys/default#ctr_credentials) | SecureX Token | | See [this page]({{ site.baseurl }}/account-keys/securex-token) |
