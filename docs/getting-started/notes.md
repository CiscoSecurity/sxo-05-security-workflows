---
layout: page
title: Important Notes
permalink: /notes
parent: Getting Started
nav_order: 5
---

# Important Notes
When using SecureX orchestration, it's important to be aware of the items listed on this page.

---

## Workflows
* A workflow must be in a valid state to be executed manually or triggered by an event. Examples:
	* If you make changes to a workflow and don't validate it, the next time the workflow is scheduled to run it may fail to execute.
	* If you have a workflow configured with an [`Email Event`]({{ site.baseurl }}/events/email) [trigger]({{ site.baseurl }}/workflows/triggers) and you're working on the workflow when an email arrives, the workflow may fail to execute if it isn't in a valid state.
* Loops are limited to a total of 500 iterations. This limit cannot be changed. If you need to iterate over more than 500 objects, you can nest loops inside each other or use a [Python script]({{ site.baseurl }}/activities/python/).
* If you want to import an updated version of a workflow that you already have, keep in mind that any changes you've made will be overwritten. To avoid overwriting your changes, you can always import a workflow as a copy.

---

## Targets
* Targets must be accessible from the internet since SecureX orchestration resides within a public cloud. If you want to integrate an on-premises product into a workflow, check out the [orchestration remote]({{ site.baseurl }}/remote/).

---

## Events
* The [`Email Event`]({{ site.baseurl }}/events/email) event will only parse 5 emails per minute. If more than 5 messages arrive within that timeframe, the event will continute parsing emails five at a time until it catches up.
* If a trigger using the [`Email Event`]({{ site.baseurl }}/events/email) fails and has to re-start polling, any emails received during the time the trigger wasn't running will be ignored.
* Each type of event can only trigger workflows up to 5,000 times per 24 hour period (based on UTC time). For example, if you have 3 email events configured, they can only trigger 5,000 workflow executions total within a 24 hour period. This limit does not apply to other workflow execution methods such as clicking the run button or using a schedule.