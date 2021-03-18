---
layout: page
title: Wait For Event
permalink: /activities/tasks/wait-for-event
parent: Tasks
grand_parent: Activities
---

# Wait For Event
_Category: Task_

This activity allows a workflow to wait for an event to happen before continuing. This is often used to force a workflow to wait for a task created with the [`Create Approval Request`]({{ site.baseurl }}/activities/tasks/create-approval) activity to be completed.

Keep in mind that this activity does not wait for tasks, it waits for events. When you tell it to wait for an approval task, an event is actually created for that approval task and when the task is acted upon the event is triggered.

---

## Hints
* If you want to limit how long your workflow will wait, you can set the activity's `Event Timeout`.
* After the event being waited for occurs, information about the event will be available in this activity's output. For example, for an approval task, the information available will include (but is not limited to): who the approver was, what response was selected, any approval message provided, and so on.

---

## Event Info
When using this activity, you need to specify which event you want to wait for. There are a variety of ways to do this, but for the purposes of this documentation we're going to focus on waiting for an event created with the [`Create Approval Request`]({{ site.baseurl }}/activities/tasks/create-approval) activity.

Here's a sample of the event information we would use to wait for an approval task:
![]({{ site.baseurl }}/assets/images/activities/tasks/wait-criteria.png)

In this example, we're telling the activity to wait for a task with a `Created task ID` matching the task we created using `Create Approval Request` earlier in the same workflow. Remember: using the `Add Event` option creates an event in the background that monitors the task specified and is triggered when the task is completed.

---

## Sample Workflows
The following sample workflows are available in our repository's workflows folder to help you get familiar with this activity. These can be imported using the instructions [here]({{ site.baseurl }}/importing) or you can view the workflow in GitHub by clicking on it.

* [Sample - Tasks - Approval Task]({{ site.github.repository_url }}/tree/Main/Workflows/Sample-Tasks-ApprovalTask__definition_workflow_01N3JZPFZE2BA67aIDznZOSPLHY5kK5sH8H)