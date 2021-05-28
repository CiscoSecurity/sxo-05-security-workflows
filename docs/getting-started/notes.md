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

## General
* If you see the error `upstream connect error or disconnect/reset before headers. reset reason: connection termination`, clear your cache/cookies and try again. This is a known issue and a fix is being worked on.
	* [Instructions for Chrome](https://support.google.com/accounts/answer/32050?hl=en&co=GENIE.Platform=Desktop)
	* [Instructions for Firefox](https://support.mozilla.org/en-US/kb/how-clear-firefox-cache)
	* [Instructions for Safari](https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac)
	* [Instructions for Edge](https://support.microsoft.com/en-us/microsoft-edge/view-and-delete-browser-history-in-microsoft-edge-00cf7943-a9e1-975a-a33d-ac10ce454ca4)

---

## Workflows
* A workflow must be in a valid state to be executed manually or triggered by an event. Examples:
	* If you make changes to a workflow and don't validate it, the next time the workflow is scheduled to run it may fail to execute.
	* If you have a workflow configured with an [`Email Event`]({{ site.baseurl }}/events/email) [trigger]({{ site.baseurl }}/workflows/triggers) and you're working on the workflow when an email arrives, the workflow may fail to execute if it isn't in a valid state.
* By default, loops are limited to 500 iterations. If a loop attempts to run more than 500 times, the loop will be terminated and the workflow will fail. You can change the maximum number of iterations using the `AO_LOOP_LIMIT` environment [variable]({{ site.baseurl }}/variables).
* If you want to import an updated version of a workflow that you already have, keep in mind that any changes you've made will be overwritten. To avoid overwriting your changes, you can always import a workflow as a copy.

---

## Targets
* Targets must be accessible from the internet since SecureX orchestration resides within a public cloud. In the future, an on-premise connector will be available to enable integration with on-premise devices.

---

## Events
* The [`Email Event`]({{ site.baseurl }}/events/email) event will only parse 5 emails per minute. If more than 5 messages arrive within that timeframe, the event will continute parsing emails five at a time until it catches up.
* If a trigger using the [`Email Event`]({{ site.baseurl }}/events/email) fails and has to re-start polling, any emails received during the time the trigger wasn't running will be ignored.
* Each type of event can only trigger workflows up to 5,000 times per 24 hour period (based on UTC time). For example, if you have 3 email events configured, they can only trigger 5,000 workflow executions total within a 24 hour period. This limit does not apply to other workflow execution methods such as clicking the run button or using a schedule.