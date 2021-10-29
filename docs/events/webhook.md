---
layout: page
title: Webhook Events
permalink: /events/webhook
parent: Events
---

# Webhook Events
The webhook event allows SecureX orchestration to respond to incoming [webhooks]({{ site.baseurl }}/webhooks) from other products. When a webhook is received, if the conditions in the event are met, a workflow can be executed by a [trigger]({{ site.baseurl }}/workflows/triggers).

---

## Webhook
To use the webhook event, you first need to make sure you have a [webhook]({{ site.baseurl }}/webhooks) configured in SecureX orchestration. The webhook configuration will provide a URL for you to send events to. Events sent to that URL will trigger the event you create.

---

## Criteria
Once you configure the event's display name and select a webhook, you can define criteria. The event's criteria allow you to filter the incoming webhooks and check if they contain a specific HTTP header or a certain value in the request body.

---

## Using an Event
After creating your event, you need to configure a workflow to listen to the event using a [trigger]({{ site.baseurl }}/workflows/triggers).