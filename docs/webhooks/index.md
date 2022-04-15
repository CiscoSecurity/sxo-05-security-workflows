---
layout: page
title: Webhooks
permalink: /webhooks
nav_order: 68
---

<div class="cisco-alert cisco-alert-danger">
	<i class="fa fa-exclamation-triangle mr-1 cisco-icon-danger"></i>  Due to back end changes being made as part of orchestration's 5.7 release on January 20th, existing webhooks will need new API keys. If you're using a webhook, it may stop working after the upgrade. To resolve this, edit the webhook and make note of the new API key. Then, update whatever source systems are sending webhooks with the new API key.
</div>

# Webhooks
Webhooks allow you to push information from external platforms to orchestration workflows. Instead of your workflow having to reach out to an API to check for events, a webhook can be used to listen for incoming data and then [trigger]({{ site.baseurl }}/workflows/triggers) a workflow through an [event]({{ site.baseurl }}/events/) when data is received.

![]({{ site.baseurl }}/assets/images/webhooks/flow.png)

[<i class="fa fa-video mr-1"></i> Webhooks Overview](https://www.youtube.com/watch?v=AwqAWSwg5NI&list=PLPFIie48Myg2tu2gHbgm-moYg8LDaXsSo){: .btn-cisco-outline }

---

## A Note on Webhook Content Type Headers
SecureX orchestration is strict about the `Content-Type` header for incoming webhooks. If you don't know which content type your webhook is using, you can use a service like [RequestBin](https://requestbin.com/r) to find out. Here's how:

1. Go to [RequestBin](https://requestbin.com/r) and you should see an endpoint URL like this: `https://enrszd3sz7aa.x.pipedream.net`.
1. Configure the product you want to send webhooks from to send to the endpoint URL from step 1.
1. Once the source product sends a webhook, it will show up in your RequestBin.
1. Select the request in the list on the left and you should see the request details on the right.
1. Expand the **Headers** list and look for the `Content-Type`.
1. When creating your webhook in SecureX orchestration, be sure to select the same **Request Content Type** as your webhook.
    * If your webhook did not provide a `Content-Type` header, it probably won't work with SecureX orchestration. You'll need to contact support for the source product and see if they can add the header to their webhooks.
    * If the content type your webhook is using is not listed in orchestration, you'll need to contact Cisco TAC and they can log a request for a new content type.

---

## Creating a Webhook
When you create a webhook, you'll be given an HTTP endpoint you can push events to. You can have a single webhook trigger a single workflow or a single webhook can trigger multiple workflows.

1. Under the **Events & Webhooks** section, click the **Webhooks** tab.
1. Click on the **New Webhook** button.
1. Give the webhook a meaningful **Display Name** and then validate the **Request Content Type**. Content type options include:
	* `application/json`
    * `application/json; charset=utf-8`
	* `application/x-www-form-urlencoded`
	* `application/xml`
    * *Hint*: See the [section above](#a-note-on-webhook-content-type-headers) about webhook content type headers.
1. The webhook details will populate after the new webhook is created, so click the **Submit** button.
1. Back on the webhooks page, click on the webhook you just created to view its details.
1. Make note of the **Webhook URL**. This is the URL the source of the webhooks will push events to.

---

## Adding a Webhook to a Workflow
Once you've created a webhook using the steps above, you need to do two things:
1. Create an [event]({{ site.baseurl }}/events/) that will be triggered when the webhook receives data.
1. Add the event to your workflow as a [trigger]({{ site.baseurl }}/workflows/triggers).

Once the workflow is configured with a trigger, you can use the trigger's output variables in your workflow:

![]({{ site.baseurl }}/assets/images/webhooks/variables.png)

---

## Triggering a Webhook
To trigger a webhook, you can either configure a source product to send events to the webhook's URL or you can `POST` your own events using normal HTTP requests. Authentication is provided by the `api_key` in the URL and you must have `Content-Type` and `Accept` headers. A request body is not required but allows you to pass data to your workflow.

### Sample Requests
Here's a sample of a `POST` to trigger a webhook with no request body:

```
POST /webhooks/01MYFX09T0JZeDFNggAd92MlpAaWgoi?api_key=+61NtR8LBuYNMtBw6bdqwPAe8oGoIzjZuFxIXt/C8/MMfKE2R6d6WDppBLWWwYdywgMqInyClmAP7qN1ePi0H6vBFgHQIa5xnaT4P9iY++02X064s1+Q== HTTP/1.1
Host: securex-ao.us.security.cisco.com
Content-Type: application/json
Accept: application/json
```

Here's a sample of a `POST` to trigger a webhook with a JSON payload:

```
POST /webhooks/01MYFX09T0JZeDFNggAd92MlpAaWgoi?api_key=+61NtR8LBuYNMtBw6bdqwPAe8oGoIzjZuFxIXt/C8/MMfKE2R6d6WDppBLWWwYdywgMqInyClmAP7qN1ePi0H6vBFgHQIa5xnaT4P9iY++02X064s1+Q== HTTP/1.1
Host: securex-ao.us.security.cisco.com
Content-Type: application/json
Accept: application/json
Content-Length: 85

{
    "key": "value",
    "list_of_stuff": [
        "item1",
        "item2"
    ]
}
```

### Sample Response
If your request was accepted by SecureX orchestration, you will get an HTTP `202 Accepted` response with no body. Not working? See the [troubleshooting](#troubleshooting) section below.

---

## Troubleshooting

* Webhooks will not accept a request body larger than 1 MB.

* If your webhook responds with an HTTP status code of `429`, you may be sending too many webhooks and hitting a rate limit. Webhooks are limited to 5,000 executions per day and up to 5 executions per minute.

* If your webhook doesn't trigger or behave as expected, check these things:
    1. The webhook URL is correct, including the `api_key`.
    1. The HTTP request type you're using is a `POST`.
    1. The `Accept` header is set to `application/json`.
    1. The `Content-Type` header is set to an acceptable value (see [above](#a-note-on-webhook-content-type-headers)).
    1. The webhook is used by an [event]({{ site.baseurl }}/events/) and you've added the event as a [trigger]({{ site.baseurl }}/workflows/triggers) to a workflow.
    1. The workflow being triggered is in a valid state (the validation button should say **Validated** in the workflow editor's blue bar).
