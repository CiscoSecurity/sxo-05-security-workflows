---
layout: page
title: Email Events
permalink: /events/email
parent: Events
---

# Email Events
The email event allows you to monitor an inbox for new emails. When a new email arrives, if the conditions in the event are met, a workflow can be executed by a [trigger]({{ site.baseurl }}/workflows/triggers).

---

## Targets
To use the email event, you need a [target]({{ site.baseurl }}/targets/) for the mailbox you want to monitor. This can be either an `IMAP Endpoint` or a `POP3 Endpoint` target. The target should be configured according to your email provider's specifications.

---

## Criteria
Once you configure the event's display name and target, you can define criteria. The event's criteria determines which emails the event will select for processing and is optional. If no criteria are provided, all emails in the Inbox will be parsed. Here's an example of criteria that limits the event to emails sent by people in the `domain.com` domain:

![]({{ site.baseurl }}/assets/images/events/email/criteria.png)

---

## Message Action
After the event parses an email, you can choose what happens to the message. The available actions are to mark the message as read or to delete it. This section also allows you to decide if you want to download attachments for use within the triggered workflow.

![]({{ site.baseurl }}/assets/images/events/email/what-to-do.png)

---

## Using an Event
After creating your event, you need to configure a workflow to listen to the event using a [trigger]({{ site.baseurl }}/workflows/triggers).