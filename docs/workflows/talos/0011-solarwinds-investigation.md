---
layout: page
title: SolarWinds Investigation
permalink: /workflows/talos/0011-solarwinds-investigation
redirect_from:
  - /workflows/0011-solarwinds-investigation
  - /workflows/0011
parent: Talos Intelligence
grand_parent: Workflows
---

# SolarWinds Investigation
<div markdown="1">
Workflow #0011
{: .label }
</div>

This workflow uses a Talos blog post about the SolarWinds supply chain attack as a source of intelligence. Using observables extracted from the blog post, it conducts an investigation and looks for sightings within your environment. If there are sightings, a variety of actions are taken including creating a Cisco SecureX incident and casebook, creating a ServiceNow incident, sending a Webex message, sending a message on Slack, and sending an email. The workflow also supports automated remediation (with approval). If the resulting approval task is approved, unknown or suspicious file hashes and domains are blocked using Cisco Secure Endpoint and Umbrella respectively. If there are any target endpoints, Cisco Orbital is used to take a forensic snapshot and Secure Endpoint is used to enable host isolation.

<div class="cisco-alert cisco-alert-info"><i class="fa fa-info-circle mr-1 cisco-icon-info"></i> This workflow has been updated to use the new "SecureX Token" account key. For more information about this, please see <a href="{{ site.baseurl }}/account-keys/securex-token">this page</a>. If you want to use legacy authentication, you can import an older version of the workflow.</div>

[<i class="fa fa-video mr-1"></i> Overview](https://www.youtube.com/watch?v=WR6pr-BEM6E&list=PLPFIie48Myg2tu2gHbgm-moYg8LDaXsSo){: .btn-cisco-outline .mr-2 } [<i class="fab fa-github"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0011-Talos-SolarWindsInvestigation__definition_workflow_01LQA3KMNO5FO3ikAlUvOc3cLoXQQo6GwUa){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Jan 22, 2021 | - Initial release |
| Jun 24, 2021 | - Updated the user agent header being used to fetch blog posts from Talos |
| Sep 10, 2021 | - Updated to use the new [system atomics]({{ site.baseurl }}/atomics/system) |
| Aug 31, 2022 | - Updated to support [SecureX Tokens]({{ site.baseurl }}/account-keys/securex-token) |
| Feb 16, 2023 | - Minor tweak to how blog posts are stripped of HTML ([Issue #230]({{ site.github.repository_url }}/issues/230)) |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* Orbital - Query Endpoint
	* Threat Response - Create Casebook
	* Threat Response - Create Incident
	* Threat Response - Create Relationship
	* Threat Response - Deliberate Observable
	* Threat Response - Enrich Observable
	* Threat Response - Generate Access Token
	* Threat Response - Inspect for Observables
	* Threat Response - List Response Actions
	* Threat Response - Trigger Response Action
	* Webex - Post Message to Room
	* Webex - Search for Room
* The following atomic actions must be imported before you can import this workflow:
	* ServiceNow - Add Work Note to Incident ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* ServiceNow - Create Incident ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Slack - Send Message to Channel ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
* The [targets](#targets) and [account keys](#account-keys) listed at the bottom of the page
* Cisco Secure Endpoint with Orbital
* Cisco Umbrella
* (Optional) Cisco Webex
* (Optional) A Slack access token and a channel name to post messages to
* ServiceNow

---

## Workflow Steps
1. Fetch any necessary global variables and set the environment URLs for SecureX and Threat Response
1. Fetch the blog post content and strip out any HTML
1. Inspect the blog post content for observables
1. Loop through each observable and get its Threat Response disposition
1. For observables that weren't clean, conduct Threat Response enrichment to get sightings
	* For modules with sightings, extract the sightings and targets for use later
1. Generate a summary of the workflow's findings in HTML (for email and ServiceNow), markdown (for Webex and Threat Response), and mrkdwn (for Slack)
1. Create a ServiceNow incident ticket
1. Create the SecureX casebook and incident
1. Add a work note to the ServiceNow incident with a link to investigate in Threat Response
1. Generate the text for an approval task and request automated remediation
1. Send notifications:
	* Webex
	* Slack
	* Email
1. Wait for the approval task to be completed
1. If completed and approved:
	* Fetch the Cisco Secure Endpoint and Umbrella module instance IDs from Threat Response
	* Loop through each observable:
		* If it's a file hash, add it to the Secure Endpoint simple custom detections list using Threat Response
		* If it's a domain, block it in Umbrella using Threat Response
	* Loop through each target:
		* Fetch an access token for Orbital (using the `Threat Response - Generate Access Token` atomic)
		* Request a forensic snapshot of the endpoint using Cisco Orbital
		* Isolate the endpoint using Secure Endpoint

---

## Configuration

### Local Variables
* Set `Email Addresses to Notify` to the email addresses you want notifications sent to
* Set `ServiceNow Instance URL` to the URL of your instance (for example: `mycompany.service-now.com`). If you don't want to use ServiceNow, you need to disable all of the ServiceNow activities and then remove any references to them
* If you want to use Slack:
	* Provide the workflow your Slack API token by either:
		* Storing your token in a [global variable]({{ site.baseurl }}/variables/global) and using the `Fetch Global Variables` group at the beginning of the workflow to update the `Slack Token` local variable; or
		* Remove the `Slack Token` from the `Fetch Global Variables` group and add your token directly to the `Slack Token` local variable
	* Set `Slack Channel` to the name of the channel you want messages sent to
* See [this page]({{ site.baseurl }}/atomics/configuration/webex#configuring-our-workflows) for information on configuring the workflow for Webex

### Activities
* Set `Service Now User ID` on `ServiceNow - Create Incident`
* Update `SolarWinds remediation approval` with:
	* A `Task Requestor`
	* A `Task Owner`
	* One or more `Task Assignees`
* If your Cisco Secure Endpoint module isn't named `AMP for Endpoints` in SecureX, you need to update the `JSONPath Query` on the `Extract Secure Endpoint Actions` activity with your module's name
* If your Cisco Umbrella module isn't named `Umbrella` in SecureX, you need to update the `JSONPath Query` on the `Extract Umbrella Actions` activity with your module's name

---

## Targets
Target Group: `Default TargetGroup`

By default, the `Default TargetGroup` may not include `SMTP Endpoint` targets. If this is the case, you will need to update the target group and add `SMTP Endpoint` to the target types included. More information about target groups can be found [here]({{ site.baseurl }}/targets/groups).

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| [CTR_API]({{ site.baseurl }}/targets/default#ctr_api) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `visibility.amp.cisco.com`<br />_Path:_ `/iroh` | CTR_Credentials | Created by default |
| Email Endpoint | SMTP Endpoint | Configured for your SMTP server | `Email Credentials` account key | |
| [Orbital_For_Access_Token]({{ site.baseurl }}/targets/default#orbital_for_access_token) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `visibility.amp.cisco.com`<br />_Path:_ `/iroh` | Orbital_Credentials | Created by default |
| [Orbital_Target]({{ site.baseurl }}/targets/default#orbital_target) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `orbital.amp.cisco.com`<br />_Path:_ `/v0` | None | Created by default |
| [Private_CTIA_Target]({{ site.baseurl }}/targets/default#private_ctia_target) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `private.intel.amp.cisco.com`<br />_Path:_ None | CTR_Credentials | Created by default |
| ServiceNow | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `<instance>.service-now.com`<br />_Path:_ `/api` | ServiceNow_Credentials | Be sure to use your instance URL |
| Slack | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `slack.com`<br />_Path:_ `/api` | None | Not necessary if Slack activities are removed |
| Webex Teams | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `webexapis.com`<br />_Path:_ None | None | Not necessary if Webex activities are removed |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| [CTR_Credentials]({{ site.baseurl }}/account-keys/default#ctr_credentials) | SecureX Token | | See [this page]({{ site.baseurl }}/account-keys/securex-token) |
| Email Credentials | Email Credentials | _Username:_ Mailbox Username<br />_Password:_ Mailbox Password | |
| [Orbital_Credentials]({{ site.baseurl }}/account-keys/default#orbital_credentials) | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Created by default |
| ServiceNow_Credentials | HTTP Basic Authentication | _Username:_ ServiceNow User ID<br />_Password:_ ServiceNow Password | |
