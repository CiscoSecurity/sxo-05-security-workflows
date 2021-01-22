---
layout: page
title: Triggers
permalink: /workflows/triggers
parent: Workflows
nav_order: 25
---

# Triggers
Triggers cause a workflow to execute when an [event]({{ site.baseurl }}/events) happens or based on a [schedule]({{ site.baseurl }}/schedules).

---

## Workflow Properties
When viewing a workflow's properties, you'll see a **Triggers** section that shows any triggers the workflow has and their status. Here's a sample of what this looks like for an [Email Event]({{ site.baseufl }}/events/email):

![]({{ site.baseurl }}/assets/images/workflows/triggers/properties.png)

---

## Configuration
To configure a trigger, you first need to make sure you have an [event]({{ site.baseurl }}/events) or [schedule]({{ site.baseurl }}/schedules) configured. Once you have one of those, you can add a trigger to your workflow.

1. Open the workflow you want to trigger in the workflow editor and scroll down to the **Triggers** section in its properties
1. Click the **Add Trigger** button
1. Give the trigger a meaningful name
1. Select the **Type** of trigger based on whether or not you're using an event or schedule
	* If using a schedule: select the schedule to use
	* If using an event: select the event to use
1. If you want to create the trigger but prevent it from executing your workflow, you can check the **Disable Trigger** box. If you leave this unchecked, the workflow will be executed by the trigger
1. Click the **Save** button

Here's a sample of what an [Email Event]({{ site.baseufl }}/events/email) trigger looks like:

![]({{ site.baseurl }}/assets/images/workflows/triggers/edit-trigger.png)