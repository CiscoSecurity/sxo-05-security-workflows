---
layout: page
title: Schedules
permalink: /schedules
has_children: true
has_toc: false
nav_order: 45
---

# Schedules
Schedules, when combined with a [calendar]({{ site.baseurl }}/calendars), allow you to execute your workflow automatically on pre-defined days and times. A calendar defines a collection of days and a schedule defines the frequency within a given day. For example, a calendar would specify that a workflow run every Thursday and the schedule would specify that the workflow run every hour.

**Note:** Only a schedule can be used as a [trigger]({{ site.baseurl }}/workflows/triggers). You cannot use a calendar to trigger a workflow on its own, it must be part of a schedule.

---

## Configuration
Under the **Schedules** section of SecureX orchestration, you can see existing schedules and create new ones. To create a new schedule:

1. Provide a meaningful **Display Name**
1. Select the **[Calendar]({{ site.baseurl }}/calendars)** you want the schedule to use. Remember, calendars are collections of days and schedules define how often something happens within a day
1. Select a **Timezone**. The schedule will run relative to this timezone and the default is UTC
1. Provide the schedule itself. Samples can be found [here]({{ site.baseurl }}/schedules/samples)
1. Click **Submit**

**Note:** If the start time for a schedule has already passed, it may not run until that start time occurs again. So, if you schedule a workflow to start at midnight and then run every hour, it may not start running until midnight has passed. To start a workflow running on a schedule immediately, start the workflow at a time closer to the current time (being mindful of the timezone).