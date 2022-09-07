---
layout: page
title: Lock Computer
permalink: /workflows/jamf/0046-lock-computer
redirect_from:
  - /workflows/0046
parent: Jamf Pro
grand_parent: Workflows
---

# Lock Computer
<div markdown="1">
Workflow #0046
{: .label }

Response Workflow
{: .label }
</div>

This workflow locks a Jamf-managed computer and adds a passcode to it. Supported observables: `mac_address`, `hostname`, `ip`

[<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0046-JamfPro-LockComputer__definition_workflow_01QJ6KLP6RHTZ5I1URmYy0WtngVqEHYJjwd){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Oct 11, 2021 | - Initial release |
| Sep 7, 2022 | - Minor updates to naming and descriptions |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* None
* The following atomic actions must be imported before you can import this workflow:
	* Jamf Pro - Computer - Execute Command ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Jamf Pro - Computer - Search ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
* The [targets](#targets) and [account keys](#account-keys) listed at the bottom of the page
* Jamf Pro

---

## Workflow Steps
1. Make sure the observable is supported
1. Search for a matching computer in Jamf
1. Extract the computer's ID
1. If extraction was successful, execute the command on the computer

---

## Configuration
* Set the `Passcode` local variable to a 6-character passcode to apply to locked devices
* If you want to change the name of this workflow in the pivot menu, change its display name

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| Jamf Pro | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `your-instance.jamfcloud.com`<br />_Port:_ `443`<br />_Path:_ None | Jamf Pro Credentials | |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| Jamf Pro Credentials | HTTP Basic Authentication | _Username:_ Jamf API Username<br />_Password:_ Jamf API Password | Must have correct permissions depending on actions being performed |
