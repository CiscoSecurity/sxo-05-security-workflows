---
layout: page
title: Phishing Investigation
permalink: /workflows/email/0010-phishing-investigation
redirect_from:
  - /workflows/0010-phishing-investigation
  - /workflows/0010
parent: Email
grand_parent: Workflows
---

# Phishing Investigation
<div markdown="1">
Workflow #0010
{: .label }
</div>

This workflow monitors a mailbox for incoming phishing reports. When an email is received, the workflow investigates its attachments and attempts to determine if anything in the email (or its attachments) was suspicious or malicious. If anything suspicious or malicious is found, the user is told to delete the email, a casebook and incident are created in Cisco SecureX, a Webex message is posted, and an email is sent to a "SOC" email address.

[<i class="fa fa-video mr-1"></i> Overview](https://www.youtube.com/watch?v=xUehFeCJGL4&list=PLPFIie48Myg2tu2gHbgm-moYg8LDaXsSo){: .btn-cisco-outline .mr-2 } [<i class="fab fa-github"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0010-Phishing-Investigation__definition_workflow_01LDICSCPVGP20hFTpJfjEVUZ57FMXx5sOC){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Jan 21, 2021 | - Initial release |
| Jan 29, 2021 | - Changed Secure Malware Analytics disposition for scores less than 70 to Unknown instead of Clean<br />- Removed the email notification to the reporting user when everything is clean/unknown. The SOC should take over the investigation from this point and make the final determination<br />- Fixed Secure Malware Analytics submission count not being incremented for URL submissions<br />- Added an environment variable for the Secure Malware Analytics instance URL |
| Feb 25, 2021 | - Added the subject and sender of the reported email as observables ([Issue #10]({{ site.github.repository_url }}/issues/10))<br />- Updated the Python script that generates casebook text to handle truncation more reliably ([Issue #12]({{ site.github.repository_url }}/issues/12))<br />- Updated the incident and casebook text with the reported email's actual subject ([Issue #8]({{ site.github.repository_url }}/issues/8)) |
| Sep 10, 2021 | - Updated to use the new [system atomics]({{ site.baseurl }}/atomics/system) |
| Aug 1, 2022| - Updated to address a change in workflow schema. No functional changes |

_See the [Important Notes]({{ site.baseurl }}/notes#workflows) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* Secure Malware Analytics - Get Samples by File Hash
	* Secure Malware Analytics - Submit File
	* Secure Malware Analytics - Submit URL
	* Threat Response - Create Casebook
	* Threat Response - Create Incident
	* Threat Response - Create Relationship
	* Threat Response - Create Sighting
	* Threat Response - Deliberate Observable
	* Threat Response - Generate Access Token
	* Threat Response - Inspect for Observables
	* Webex - Post Message to Room
	* Webex - Search for Room
* The following atomic actions must be imported before you can import this workflow:
	* None
* The [targets](#targets) and [account keys](#account-keys) listed at the bottom of the page
* Cisco Secure Malware Analytics
* (Optional) Cisco Webex

---

## Important Notes
* The mailbox and SMTP server used to send notifications to users should not have any quotas or rate-limiting. If outgoing mail from the workflow is rate-limited and multiple submissions are received at the same time, sending user confirmation emails may fail.
* This workflow can only monitor a single mailbox. If you want to use this workflow with multiple mailboxes, you will need to duplicate the workflow and update the trigger to use a different [Email Event]({{ site.baseurl }}/events/email).
* See [this page]({{ site.baseurl }}/notes) for other important information about SecureX orchestration.

---

## Workflow Steps
This workflow is designed to be triggered by an email arriving in a phishing investigation mailbox.

1. Fetch any necessary global variables and set the environment URLs for SecureX and Threat Response
1. Make sure the email that triggered the workflow has an email attached to it:
	* If it does, let the user know their submission was received and continue
	* If it doesn't, let the user know an attachment is required and end the workflow
1. For each attachment:
	* Generate an access token for Threat Response
	* Check if this attachment is an email:
		* If it is:
			* Inspect its headers and raw message content for observables using Threat Response
			* For each observable found:
				* Fetch the observable's disposition and add it to a main observables table
				* Check if the observable is a URL with a 2 character top level domain (TLD):
					* If it is:
						* Assume the URL might be from a URL shortener and submit it to Secure Malware Analytics
						* Extract the threat score for the URL and assign a disposition based on the score in the main observables table
		* If it isn't:
			* Check if the file hash for the attachment has a disposition in Threat Response:
				* If the disposition is anything besides unknown, update the main observables table
				* If the disposition is unknown:
					* Check if the file type is supported by Secure Malware Analytics:
						* If it isn't, skip the attachment since we can't analyze it further
						* If it is:
							* Check if a file with this hash was already analyzed by Secure Malware Analytics:
								* If it was, use the most recent threat score
								* If it wasn't, submit the file to Secure Malware Analytics and extract the threat score
							* Assign a disposition to the file based on the threat score and update the main observables table
1. Build statistics for each observable disposition
1. Check if there was anything suspicious or malicious:
	* If there was:
		* Generate an access token for Threat Response
		* Compile the non-clean observables into a JSON list
		* Create a SecureX casebook
		* Create a SecureX incident
		* Relate the two new objects to each other
		* Create a sighting
		* Relate the sighting to the incident
		* If a Webex room was provided:
			* Look up the room and get the room ID
			* Send a message to the room with some information about the investigation
		* Send an email notification to the `Notification Email Addresses`
		* Send an email to the user instructing them to delete the message immediately
	* If there wasn't, email the SOC asking them to validate the investigation and determine if the message is safe
1. Add this workflow run's statistics to the global statistics table

---

## Configuration

### Account Keys/Targets
* You must create an [account key]({{ site.baseurl }}/account-keys/) with your mailbox's credentials and then update the `Phishing Investigation Mailbox` [target]({{ site.baseurl }}/targets/) with that account key. While you're editing the target, be sure to add your email server's information
* A list of required targets and account keys can be found [below](#targets). Make sure they all exist and are configured properly

### Local Variables
* Provide the workflow your Secure Malware Analytics API token by either:
	* Storing your token in a [global variable]({{ site.baseurl }}/variables/global) and using the `Fetch Global Variables` group at the beginning of the workflow to update the `Secure Malware Analytics API Key` local variable; or
	* Remove the `Secure Malware Analytics API Key` from the `Fetch Global Variables` group and add your token directly to the `Secure Malware Analytics API Key` local variable
* See [this page]({{ site.baseurl }}/atomics/configuration/webex#configuring-our-workflows) for information on configuring the workflow for Webex
* Set `Notification Email Addresses` to the email addresses you want notified when the workflow detects a phishing attempt
* This workflow is configured to auto-detect which SecureX environment you're using based on the `SECUREX_ENVIRONMENT` environment variable and then assumes you're using the same environment for Threat Response and Secure Malware Analytics
	* The default region associations are:
		* SecureX North America (NAM) - Threat Response NAM, Secure Malware Analytics NAM
		* SecureX Europe (EU) - Threat Response EU, Secure Malware Analytics EU
		* SecureX Asia Pacific (APJC) - Threat Response APJC, Secure Malware Analytics EU
	* You can change these defaults by editing the contents of the `Set the environment URLs` condition block at the beginning of the workflow

### Activities
* This workflow has a default configuration for determining when a Threat Score (from Secure Malware Analytics) is considered unknown, suspicious, or malicious
	* The default ranges are:
		* Unknown: Less than 70
		* Suspicious: Greater than or equal to 70 but less than 90
		* Malicious: Greater than or equal to 90
	* If you want to change these ranges, there are two `Was the file a threat?` condition blocks in the workflow you can modify
* All of the Threat Response activities default to a `TLP Value` of `amber`. You can modify this if you want to use different values

### Trigger
* When the workflow imports, the trigger will show in an errored state because the account key and target needed to be updated. After configuring your account key and target, go into the workflow, click on the trigger in the workflow's properties, uncheck the **Disable Trigger** box, and click **Save**

---

## Targets
Target Group: `Default TargetGroup`

By default, the `Default TargetGroup` may not include `SMTP Endpoint` targets. If this is the case, you will need to update the target group and add `SMTP Endpoint` to the target types included. More information about target groups can be found [here]({{ site.baseurl }}/targets/groups).

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| [CTR_API]({{ site.baseurl }}/targets/default#ctr_api) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `visibility.amp.cisco.com`<br />_Path:_ `/iroh` | None | Created by default |
| [CTR_For_Access_Token]({{ site.baseurl }}/targets/default#ctr_for_access_token) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `visibility.amp.cisco.com`<br />_Path:_ `/iroh` | CTR_Credentials | Created by default |
| Phishing Investigation Mailbox | IMAP Endpoint | Configured for your IMAP server | Phishing Investigation Mailbox Credentials | |
| Phishing Investigation Outgoing | SMTP Endpoint | Configured for your SMTP server | Phishing Investigation Mailbox Credentials | |
| [Private_CTIA_Target]({{ site.baseurl }}/targets/default#private_ctia_target) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `private.intel.amp.cisco.com`<br />_Path:_ None | None | Created by default |
| [ThreatGrid_Target]({{ site.baseurl }}/targets/default#threatgrid_target) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `panacea.threatgrid.com`<br />_Path:_ None | None | Created by default |
| Webex Teams | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `webexapis.com`<br />_Path:_ None | None | Not necessary if Webex activities are removed |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| [CTR_Credentials]({{ site.baseurl }}/account-keys/default#ctr_credentials) | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | Created by default |
| Phishing Investigation Mailbox Credentials | Email Credentials | _Username:_ Mailbox Username<br />_Password:_ Mailbox Password | |
