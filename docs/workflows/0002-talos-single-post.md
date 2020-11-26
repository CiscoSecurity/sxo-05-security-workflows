---
layout: page
title: Talos - Single Blog Post to CTR Casebook
permalink: /workflows/0002-talos-single-post
parent: Workflows
---

# Talos - Single Blog Post to CTR Casebook
<div markdown="1">
Workflow #0002
{: .label }
</div>

This workflow parses a single Talos blog post and converts it into a Cisco Threat Response casebook if it contains suspicious observables. This casebook can then be investigated with one click in Cisco Threat Response.

[<i class="fab fa-github mr-1"></i> Workflow Folder]({{ site.github.repository_url }}/tree/Main/Workflows/0002-Talos-SingleBlogPostToCTRCasebook__definition_workflow_01KEM2V2JAIPS3zmyEiCmuy3kvr3wxHrEuJ){: .btn-cisco-sky-blue .mr-2 } [JSON]({{ site.github.repository_url }}/tree/Main/Workflows/0002-Talos-SingleBlogPostToCTRCasebook__definition_workflow_01KEM2V2JAIPS3zmyEiCmuy3kvr3wxHrEuJ/definition_workflow_01KEM2V2JAIPS3zmyEiCmuy3kvr3wxHrEuJ.json){: .btn-cisco-outline }

---

## Important Note
This workflow is an adaptation of the sub-workflow used by the [Talos - Get New Blog Posts]({{ site.baseurl }}/workflows/0001-talos-blog) workflow. Modifying this workflow won't cause any issues with the other Talos workflow as it's completely separate. We're providing this workflow separately in case you want to adapt it for something else or play with it without the complexity of the parent workflow.

---

## Requirements
* (Optional) A Webex Teams bot token and room name to post messages to (if you don't want to use Webex, disable the Webex activities in the workflow).

---

## Workflow Steps
This workflow is designed to parse a single blog post into a casebook.

1. Fetch the blog post content and strip out any HTML
1. Request a CTR access token and inspect the blog post content for observables
1. Loop through each observable and get its CTR disposition
1. For observables that weren't clean, conduct CTR enrichment to get sightings
1. For modules with sightings, build the text to post to Webex
1. Create the CTR casebook and, if a teams room is provided, post a message to Webex

---

## Configuration
* If you want to use Webex Teams, you'll need to provide the workflow a bot token and room name. You can do this by either:
	* Setting the `Webex Teams Bot Token` and `Webex Teams Room Name` local variables; or
	* Using the `Fetch Global Variables` group at the beginning of the workflow to set your local variables with the values of your global variables (this group is disabled by default)

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| CTR_For_Access_Token | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `visibility.amp.cisco.com`<br />_Path:_ `/iroh` | CTR_Credentials | Created by default |
| CTR_API | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `visibility.amp.cisco.com`<br />_Path:_ `/iroh` | None | Created by default |
| Private_CTIA_Target | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `private.intel.amp.cisco.com`<br />_Path:_ None | None | Created by default |
| Webex Teams | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `webexapis.com`<br />_Path:_ None | None | Not required if Webex activities are disabled |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| CTR_Credentials | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Created by default |
