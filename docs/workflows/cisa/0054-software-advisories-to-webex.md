---
layout: page
title: Software Advisories to Webex
permalink: /workflows/cisa/0054-software-advisories-to-webex
redirect_from:
  - /workflows/0054
parent: Cybersecurity and Infrastructure Security Agency
grand_parent: Workflows
---

# Software Advisories to Webex
<div markdown="1">
Workflow #0054
{: .label }
</div>

This workflow fetches recent CISA advisories and looks for common software package managers and programming languages in the descriptions. If mention of a package manager or programming language is found, a Webex message is posted.

[<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0054-CISA-SoftwareAdvisoriesToWebex__definition_workflow_01TKPY8KOF2IX3hM8eP49RUj3ygCjQd3Q5N){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Dec 17, 2021 | - Initial release |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* Webex Teams - Post Message to Room
	* Webex Teams - Search for Room
* The following atomic actions must be imported before you can import this workflow:
	* None
* The [targets](#targets) listed below
* A Webex Teams access token and room name to post messages to

---

## Workflow Steps
1. Fetch the latest RSS feed of advisories
1. Check if there's anything new to parse (if not, end the workflow)
1. Convert the list of advisories to a table
1. For each advisory:
	* Look for software package managers (if found: update the local Webex message variable)
	* Look for programming languages (if found: update the local Webex message variable)
	* Check if there's anything to report via Webex:
		* If so, search for the provided Webex room and post the message

---

## Configuration
* If you want the workflow to run on a schedule, you need to create a [schedule]({{ site.baseurl }}/schedules/) and then add it as a [trigger]({{ site.baseurl }}/workflows/triggers) within the workflow
* See [this page]({{ site.baseurl }}/atomics/configuration/webex#configuring-our-workflows) for information on configuring the workflow for Webex Teams
* If you want to modify the package managers and/or programming languages the workflow looks for, you can edit the regular expressions in the `Look for package managers` and `Look for programming languages` activities

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| Webex Teams | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `webexapis.com`<br />_Path:_ None | None | Not necessary if Webex Teams activities are removed |
