---
layout: page
title: Tasks
permalink: /activities/tasks/
parent: Activities
has_children: true
---

# Tasks
_Category: Task_

Tasks allow your workflows to request approval or ask a question before taking an action. For example, you could have a workflow detect a compromised endpoint and request approval before enabling host isolation. Another example would be creating a task to ask which subnet to deploy a new virtual machine in. To achieve this functionality, you need to combine the [`Create Approval Request`]({{ site.baseurl }}/activities/task/create-approval) activity with either an [Approval Task Event]({{ site.baseurl }}/events/approval) or the [`Wait For Event`]({{ site.baseurl }}/activities/tasks/wait-for-event) activity.