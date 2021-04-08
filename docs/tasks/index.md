---
layout: page
title: Tasks
permalink: /tasks/
nav_order: 53
---

# Tasks
Tasks allow orchestration workflows to ask a question. For the most part, tasks are used to request approvals for things like automated remediation. However, they can also be used to ask other questions such as which subnet to add a new virtual machine to.

---

## Usage
Tasks are typically created using the [`Create Approval Request`]({{ site.baseurl }}/activities/tasks/create-approval) activity. After creation, their status is monitored using either the [`Wait For Event`]({{ site.baseurl }}/activities/tasks/wait-for-event) activity or an [Approval Task Event]({{ site.baseurl }}/events/approval). A workflow can create an approval task and wait for it to be acted upon or it can create an approval task for another workflow to act on later.

Here's what a completed approval task looks like:
![]({{ site.baseurl }}/assets/images/tasks/sample.png)
