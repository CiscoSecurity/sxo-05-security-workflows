---
layout: page
title: AWS VPN Capacity Expansion
permalink: /workflows/asa/0008-aws-vpn-capacity
redirect_from:
  - /workflows/0008-asa-aws-vpn
  - /workflows/0008
parent: Cisco Adaptive Security Appliance
grand_parent: Workflows
---

# AWS VPN Capacity Expansion
<div markdown="1">
Workflow #0008
{: .label }
</div>

This workflow demonstrates the ability to dynamically expand Cisco Adaptive Security Appliance (ASA) head end capacity using Amazon EC2 if an existing ASA has VPN user load over 70%. If load is 70% or more, approval is requested using the built-in task/approval features within SecureX orchestration prior to Amazon Web Services (AWS) deployment.

[<i class="fa fa-video mr-1"></i> Overview](https://www.youtube.com/watch?v=OCedOR6k_VM&list=PLPFIie48Myg2tu2gHbgm-moYg8LDaXsSo){: .btn-cisco-outline .mr-2 } [<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0008-ASA-AWSVPNCapacityExpansion__definition_workflow_01FXTMO9SW4KS4CygG5R18IbWicyeyt6bd5){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Nov 24, 2020 | - Initial release |
| Sep 10, 2021 | - Updated to use the new [system atomics]({{ site.baseurl }}/atomics/system) |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* Webex Teams - Post Message to Room
	* Webex Teams - Search for Room
* The following atomic actions must be imported before you can import this workflow:
	* None
* The [targets](#targets) and [account keys](#account-keys) listed at the bottom of the page
* Webex Teams access token and room name to post messages to
* Cisco Adaptive Security Appliance (ASA)
* Amazon Web Services (AWS)

---

## Workflow Steps
1. Attempt to locate the Webex Teams room and get its ID
1. SSH to the target ASA and get its VPN device load
1. Check whether or not the load is 70% or more
	* If the load is less than 70%, end the workflow
	* If the load is 70% or more:
		* Create an approval task
		* Post a message to Webex Teams indicating an approval is required
		* When a response is received, continue
		* If the request was approved, deploy a new ASAv using the AWS EC2 API and post a confirmation to Webex Teams with the new public IP address
		* If the request was denied, post a message to Webex Teams indicating the denial
		* If the request expired, post a message to Webex Teams indicating the request was not acted on

---

## Configuration
* If you want the workflow to run on a schedule, you need to create a [schedule]({{ site.baseurl }}/schedules/) and then add it as a [trigger]({{ site.baseurl }}/workflows/triggers) within the workflow
* Set the `Task Approver` local variable to the email address of the person who should approve requests from this workflow
* Update the `Create deployment approval request` activity with a `Task Requestor` and `Task Owner` (the approver is defined in the local variable). You can also change the due date time (default: 1 hour) and expiration time (default: 1 hour) if you want
* Update the `Create ASA instance in EC2` activity with:
	* The `AMI Image ID` of the AMI you want to be instantiated
	* The `Security Group ID(s)` you want the instance added to
	* The `Keypair Name` of the authentication key pair this instance should use
	* The `Instance Type` to create (default: `m4.large`)
* See [this page]({{ site.baseurl }}/atomics/configuration/webex#configuring-our-workflows) for information on configuring the workflow for Webex Teams

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| ASA VPN Target | Terminal Endpoint | Configured for your ASA | Account key for your ASA | |
| AWS EC2 Target | AWS Endpoint | Configured for your AWS account | Account key for your AWS account | |
| Webex Teams  | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `webexapis.com`<br />_Path:_ None | None | |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| (varies) | AWS Credentials | _Username:_ Client ID<br />_Password:_ Client Secret | |
| (varies) | Terminal Key-Based Credentials<br />OR<br />Terminal Password-Based Credentials | Depends on target type | |
