---
layout: page
title: Create Approval Request
permalink: /activities/tasks/create-approval
parent: Tasks
grand_parent: Activities
---

# Create Approval Request
_Category: Task_

This activity allows you to create a task asking a question. The question can be a simple approval or it could be something more complex like allowing the user to select a subnet to deploy a virtual machine in. To take action when the task is completed, you'll need to use the [`Wait For Event`]({{ site.baseurl }}/activities/tasks/wait-for-event) activity or an [Approval Task Event]({{ site.baseurl }}/events/approval).

---

## Hints
* Creating an approval task does not notify the user you assign the task to. If you want to send notifications, you'll have to include that functionality in your workflow.

---

## Required Fields
When creating an approval task, you need to provide the following information:

| Field Name | Sample Value | Purpose |
|:-----------|:-------------|:--------|
| Task Requestor | compliance@company.com | Email address of the person or team requesting the approval |
| Task Owner | compliance@company.com | Email address of the person or team who owns the request (often the same as the requestor) |
| Task Assignees | john.smith@company.com<br />jane.clark@company.com | Email address(es) that can complete the task |
| Minimum No. of Approvals | 1 | How many responses are required before the task is considered complete |
| Priority | High | The priority of the request |
| Subject Line | Request to Quarantine User | A short description of the request |
| Approval Message | Suspicious behavior has been detected for the following users... | A longer description of what is being requested |
| Approval Choices | Approve<br />Reject | The choices the approver can select from |

---

## Due Dates and Expiration
All tasks have a due date and an expiration date to help manage the lifecycle of the requests. The due date is optional and represents when the task will show as being due in the Tasks list. The expiration date is required and determines when the task will be considered expired and no longer actionable. Once a task expired, it will be completed and its status will be set to whatever value is provided in `Expiration Status`.

---

## Sample Workflows
The following sample workflows are available in our repository's workflows folder to help you get familiar with this activity. These can be imported using the instructions [here]({{ site.baseurl }}/importing) or you can view the workflow in GitHub by clicking on it.

* [Sample - Tasks - Approval Task]({{ site.github.repository_url }}/tree/Main/Workflows/Sample-Tasks-ApprovalTask__definition_workflow_01N3JZPFZE2BA67aIDznZOSPLHY5kK5sH8H)