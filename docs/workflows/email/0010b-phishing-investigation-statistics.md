---
layout: page
title: Phishing Investigation - Statistics
permalink: /workflows/email/0010B-phishing-investigation-statistics
redirect_from:
  - /workflows/0010b-phishing-investigation-statistics
  - /workflows/0010B
parent: Email
grand_parent: Workflows
---

# Phishing Investigation - Statistics
<div markdown="1">
Workflow #0010B
{: .label }
</div>

This workflow sends an email summary of [Phishing Investigation]({{ site.baseurl }}/workflows/email/0010-phishing-investigation) workflow activity.

[<i class="fa fa-video mr-1"></i> Overview](https://www.youtube.com/watch?v=eQYwVU2ge00&list=PLPFIie48Myg2tu2gHbgm-moYg8LDaXsSo){: .btn-cisco-outline .mr-2 } [<i class="fab fa-github"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0010B-Phishing-Investigation-Statistics__definition_workflow_01LGZYVFSRNN30RM2UpqqTn21KA19UuFr3y){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Jan 21, 2021 | - Initial release |
| Feb 4, 2021 | - Updated the runtime calculation Python script to fix some possible failures |

_See the [Important Notes]({{ site.baseurl }}/notes#workflows) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* None
* The following atomic actions must be imported before you can import this workflow:
	* None
* The [targets](#targets) and [account keys](#account-keys) listed below

---

## Workflow Steps
This email is designed to be triggered by a [schedule]({{ site.baseurl }}/schedules).

1. Calculate and format the dates needed to generate the report
1. Fetch rows from the global statistics table for this reporting period
1. Loop through the table records and calculate each row's workflow run time
1. Process the data into an email and send the message
1. Clean up the global statistics table (purge old records)

---

## Configuration
* Set the `Report Recipients` local variable to the email addresses you want the report sent to
* Set the `Report Time Span (Days)` local variable to how many days of data you want included in the report. We recommend using a relatively short time span such as 1 day
* Set the `Retention Period (Days)` local variable to how many days of data you want kept in the global statistics table. If you don't want to keep historical data, you can set this to 1 day longer than your `Report Time Span (Days)`. We recommend keeping the table as clean as possible, so try not to keep too much data
* By default, the workflow is configured to run once a day at midnight UTC. If you want to change this schedule, you can modify the **0010B - Phishing Investigation Statistics** schedule
* To use a different SMTP Endpoint target, update the workflow's target group condition with the name of the target you want to use (default: Email Endpoint)

---

## Targets
Target Group: `Default TargetGroup`

By default, the `Default TargetGroup` may not include `SMTP Endpoint` targets. If this is the case, you will need to update the target group and add `SMTP Endpoint` to the target types included. More information about target groups can be found [here]({{ site.baseurl }}/targets/groups).

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| Phishing Investigation Outgoing | SMTP Endpoint | Configured for your SMTP server | Phishing Investigation Mailbox Credentials | |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| Phishing Investigation Mailbox Credentials | Email Credentials | _Username:_ Mailbox Username<br />_Password:_ Mailbox Password | |