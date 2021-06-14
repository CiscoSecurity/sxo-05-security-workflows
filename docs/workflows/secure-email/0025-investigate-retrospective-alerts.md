---
layout: page
title: Investigate Retrospective Alerts
permalink: /workflows/secure-email/0025-investigate-retrospective-alerts
redirect_from:
  - /workflows/0025
parent: Cisco Secure Email
grand_parent: Workflows
---

# Investigate Retrospective Alerts
<div markdown="1">
Workflow #0025
{: .label }
</div>

This workflow monitors a mailbox for retrospective detection alerts from Cisco Secure Email. When an alert is received via Cisco Secure Endpoint (formerly AMP) for a file hash, an investigation is conducted to determine if there were any sightings for the hash. If there are sightings, an instant message is sent with details.

[<i class="fab fa-github"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0025-SecureEmail-InvestigateRetrospectiveAlerts__definition_workflow_01NS8Q78T90QI7lCpLw6wNvtsfGk0xwiQ6h){: .btn-cisco-outline }

---

## Requirements
* The following atomic actions must be imported before you can import this workflow:
	* Microsoft Teams - Post Message via Webhook ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Threat Response v2 - Enrich Observable ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
	* Threat Response v2 - Generate Access Token ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
	* Webex Teams - Post Message to Room ([Github_Target_Atomics]({{ site.baseurl }}/default-repos)) * See note below!
	* Webex Teams - Search for Room ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
* The [targets](#targets) and [account keys](#account-keys) listed below
* (Optional) A Webex Teams access token and room name to post messages to
* (Optional) A webhook URL for the Microsoft Teams channel to post messages to (see: [this page](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/connectors-using#setting-up-a-custom-incoming-webhook))

**Note:** You may have an old version of the `Webex Teams - Post Message to Room` atomic. To ensure the best experience with this workflow, be sure to import the latest version of this atomic from the `GitHub_Target_Atomics` repository!

---

## Workflow Steps
1. Fetch global variables (optional)
1. Extract the information we need from the email
1. Generate an access token for Threat Response
1. Enrich the file hash to look for sightings
1. Extract the sightings
1. Check if there were any, if not end the workflow
1. Compile the sighting data for the past 30 days
1. Send instant message notifications

---

## Configuration
* Set the `Secure Endpoint Module Name` local variable to the name of your Secure Endpoint module in SecureX (this is often `AMP for Endpoints`)
* You must create an [account key]({{ site.baseurl }}/account-keys) with your mailbox's credentials and then update the `0025 - Retrospective Alert Mailbox` [target]({{ site.baseurl }}/targets) with that account key. While you're editing the target, be sure to add your email server's information
* When the workflow imports, the trigger will show in an errored state because the account key and target needed to be updated. After configuring your account key and target, go into the workflow, click on the trigger in the workflow's properties, uncheck the **Disable Trigger** box, and click **Save**
* See [this page]({{ site.baseurl }}/atomics/webex#configuring-our-workflows) for information on configuring the workflow for Webex Teams

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| [CTR_API]({{ site.baseurl }}/targets/default#ctr_api) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `visibility.amp.cisco.com`<br />_Path:_ `/iroh` | None | Created by default |
| [CTR_For_Access_Token]({{ site.baseurl }}/targets/default#ctr_for_access_token) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `visibility.amp.cisco.com`<br />_Path:_ `/iroh` | CTR_Credentials | Created by default |
| Microsoft Teams Webhook | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `your-tenant.webhook.office.com`<br />_Path:_ `/the-rest-of-the-webhook-url` | None | |
| 0025 - Retrospective Alert Mailbox | IMAP Endpoint | Configured for your IMAP server | 0025 - Retrospective Alert Mailbox Credentials | |
| Webex Teams | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `webexapis.com`<br />_Path:_ None | None | Not necessary if Webex Teams activities are removed |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| [CTR_Credentials]({{ site.baseurl }}/account-keys/default#ctr_credentials) | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Created by default |
| 0025 - Retrospective Alert Mailbox Credentials | Email Credentials | _Username:_ Mailbox Username<br />_Password:_ Mailbox Password | |