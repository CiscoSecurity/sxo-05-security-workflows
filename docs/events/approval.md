---
layout: page
title: Approval Task Events
permalink: /events/approval
parent: Events
---

# Approval Task Events
The approval task event allows you to trigger a workflow when an approval task is acted upon. This allows you to have one workflow generate approval tasks and another workflow handle when they are completed. Keep in mind that using two workflows like this has pros and cons when compared to using the [`Create Approval Request`]({{ site.baseurl }}/activities/tasks/create-approval) and [`Wait For Event`]({{ site.baseurl }}/activities/tasks/wait-for-event) activities within a single workflow.

**Pros of Using Two Workflows**
* The workflow generating approval tasks doesn't have to sit `Waiting For Event` until the task is acted upon (it can complete normally and end).
* A single workflow can generate multiple approval tasks (and the other workflow will act on them individually as they're completed).

**Cons of Using Two Workflows**
* The workflow triggered by the task being completed will not have access to any variables from the workflow that created the task. You would have to use [global variables]({{ site.baseurl }}/variables/global) or an external database to keep track of data in between workflow instances.

---

## Criteria
Once you configure the event's display name, you can define criteria. The event's criteria determines which tasks the event will be triggered by. Here's an example of criteria that looks for approval tasks with a subject of `Request to Quarantine User`:

![]({{ site.baseurl }}/assets/images/events/approval/criteria.png)

Here's what the same subject line looks like in the [`Create Approval Request`]({{ site.baseurl }}/activities/tasks/create-approval) activity in a workflow:

![]({{ site.baseurl }}/assets/images/events/approval/task.png)

---

## Using an Event
After creating your event, you need to configure a workflow to listen to the event using a [trigger]({{ site.baseurl }}/workflows/triggers).