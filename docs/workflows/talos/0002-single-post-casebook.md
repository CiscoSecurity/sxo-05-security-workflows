---
layout: page
title: Single Blog Post to SecureX Casebook
permalink: /workflows/talos/0002-single-post-casebook
redirect_from:
  - /workflows/0002-talos-single-post
  - /workflows/0002
parent: Talos Intelligence
grand_parent: Workflows
---

# Single Blog Post to SecureX Casebook
<div markdown="1">
Workflow #0002
{: .label }
</div>

This workflow parses a single Talos blog post and converts it into a SecureX casebook. This casebook can then be investigated with one click in Threat Response.

[<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0002-Talos-SingleBlogPostToCTRCasebook__definition_workflow_01KEM2V2JAIPS3zmyEiCmuy3kvr3wxHrEuJ){: .btn-cisco-outline }

---

## Important Note
This workflow is an adaptation of the sub-workflow used by the [Talos - Get New Blog Posts]({{ site.baseurl }}/workflows/talos/0001-get-new-blog-posts) workflow. Modifying this workflow won't cause any issues with the other Talos workflow as it's completely separate. We're providing this workflow separately in case you want to adapt it for something else or play with it without the complexity of the parent workflow.

---

## Change Log

| Date | Notes |
|:-----|:------|
| Nov 24, 2020 | - Initial release |
| Feb 5, 2021 | - Updated to use new Threat Response v2 atomics<br />- Fixed an issue where the Threat Response token could expire during investigation ([Issue #2]({{ site.github.repository_url }}/issues/2))<br />- Added auto-detection for the Threat Response environment URL<br />- Changed how the Webex message and casebook summary are generated to be more reliable and useful |
| Jun 24, 2021 | - Updated the user agent header being used to fetch blog posts from Talos |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following atomic actions must be imported before you can import this workflow:
	* Threat Response v2 - Create Casebook ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
	* Threat Response v2 - Deliberate Observable ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
	* Threat Response v2 - Enrich Observable ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
	* Threat Response v2 - Generate Access Token ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
	* Threat Response v2 - Inspect for Observables ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
	* Webex Teams - Post Message to Room ([Github_Target_Atomics]({{ site.baseurl }}/default-repos)) * See note below!
	* Webex Teams - Search for Room ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
* The [targets](#targets) and [account keys](#account-keys) listed below
* (Optional) A Webex Teams access token and room name to post messages to

### Important Notes
* The latest version of this workflow uses new Threat Response v2 atomic actions. You may need to import these before updating the workflow.
* You may have an old version of the `Webex Teams - Post Message to Room` atomic. To ensure the best experience with this workflow, be sure to import the latest version of this atomic from the `GitHub_Target_Atomics` repository!

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
* See [this page]({{ site.baseurl }}/atomics/configuration/webex#configuring-our-workflows) for information on configuring the workflow for Webex Teams

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| [CTR_For_Access_Token]({{ site.baseurl }}/targets/default#ctr_for_access_token) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `visibility.amp.cisco.com`<br />_Path:_ `/iroh` | CTR_Credentials | Created by default |
| [CTR_API]({{ site.baseurl }}/targets/default#ctr_api) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `visibility.amp.cisco.com`<br />_Path:_ `/iroh` | None | Created by default |
| [Private_CTIA_Target]({{ site.baseurl }}/targets/default#private_ctia_target) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `private.intel.amp.cisco.com`<br />_Path:_ None | None | Created by default |
| Webex Teams | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `webexapis.com`<br />_Path:_ None | None | Not necessary if Webex Teams activities are removed |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| [CTR_Credentials]({{ site.baseurl }}/account-keys/default#ctr_credentials) | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Created by default |
