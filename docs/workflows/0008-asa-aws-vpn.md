---
layout: page
title: ASA - AWS VPN Capacity Expansion
permalink: /workflows/0008-asa-aws-vpn
parent: Workflows
---

# Adaptive Security Appliance - AWS VPN Capacity Expansion
<div markdown="1">
Workflow #0008
{: .label }
</div>

This workflow demonstrates the ability to dynamically expand ASA head end capacity using Amazon EC2 if an existing ASA has VPN user load over 70%. If load is 70% or more, approval is requested using the built-in task/approval features within SecureX orchestration prior to AWS deployment.

[<i class="fab fa-github mr-1"></i> Workflow Folder]({{ site.github.repository_url }}/tree/Main/Workflows/0008-ASA-AWSVPNCapacityExpansion__definition_workflow_01FXTMO9SW4KS4CygG5R18IbWicyeyt6bd5){: .btn-cisco-sky-blue .mr-2 } [JSON]({{ site.github.repository_url }}/tree/Main/Workflows/0008-ASA-AWSVPNCapacityExpansion__definition_workflow_01FXTMO9SW4KS4CygG5R18IbWicyeyt6bd5/definition_workflow_01FXTMO9SW4KS4CygG5R18IbWicyeyt6bd5.json){: .btn-cisco-outline }

---

## Requirements
* A Cisco Adaptive Security Appliance (ASA)
* An Amazon Web Services account with EC2 permissions
* A Webex Teams bot token and room name to post messages to

---

## Workflow Steps
1.  SSH to the target ASA and get its VPN device load
1.  Check whether or not the load is 70% or more
	* If the load is less than 70%, end the workflow
	* If the load is 70% or more:
		* Send an approval request to an administrator
		* Post a message to Webex Teams indicating an approval is required
		* When a response is received, continue
		* If the request was denied, post a message in Webex Teams indicating the denial and end the workflow
		* If the request was approved, deploy a new ASAv using the AWS EC2 API and post a confirmation in Webex Teams with the new public IP address

---

## Configuration
* You'll need to provide the workflow a Webex Teams bot token and room name. You can do this by either:
	* Setting the `Webex Teams Bot Token` and `Webex Teams Room Name` local variables; or
	* Using the `Fetch Global Variables` group at the beginning of the workflow to set your local variables with the values of your global variables (this group is disabled by default)
* If you want the workflow to run on a schedule, you need to create a **Schedule** and then add it as a **Trigger** within the workflow
* Set the `SecureX Region` local variable (default: `us`)
* Set the `Task Approver` local variable to the email address of the person who should approve requests from this workflow
* Update the `Create deployment approval request` activity with a `Task Requestor` and `Task Owner` (the approver is defined in the local variable). You can also change the due date time (default: 1 hour) and expiration time (default: 1 hour) if you want
* Update the `Create ASA instance in EC2` activity with:
	* The `AMI Image ID` of the AMI you want to be instantiated
	* The `Security Group ID(s)` you want the instance added to
	* The `Keypair Name` of the authentication key pair this instance should use
	* The `Instance Type` to create (default: `m4.large`)

---

## Targets

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| ASA VPN Target | Terminal Endpoint | Configured for your ASA | Account key for your ASA |  |
| AWS EC2 Target | AWS Endpoint | Configured for your AWS account | Account key for your AWS account | |
| Webex Teams  | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `webexapis.com`<br />_Path:_ None | None | Not required if Webex activities are disabled |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| (varies) | AWS Credentials | _Username:_ Client ID<br />_Password:_ Client Secret |  |
| (varies) | Terminal Key-Based Credentials<br />OR<br />Terminal Password-Based Credentials | Depends on target type |  |
