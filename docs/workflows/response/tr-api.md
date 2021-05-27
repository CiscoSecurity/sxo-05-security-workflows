---
layout: page
title: Triggering via the Threat Response API
permalink: /workflows/response/tr-api
parent: Response Workflows
grand_parent: Workflows
nav_order: 5
---

# Triggering via the Threat Response API
{: .no_toc}
If you want to trigger a workflow from outside of SecureX, you can trigger response workflows via the Threat Response API.

[Response API Documentation](https://visibility.amp.cisco.com/iroh/iroh-response/index.html){: .btn-cisco-outline }

- TOC
{:toc}

---

## Limitations
The following limitations apply to using the Threat Response API with workflows:
* The workflow must be a response workflow (see [this page]({{ site.baseurl }}/workflows/response/))
* The only input you can provide the workflow are two strings named `observable_type` and `observable_value`
* You will not be able to get the result or status of the workflow, only that it has been executed successfully

---

## Generating an API Client
If you don't already have a SecureX API client with the **Response** scope, follow these steps:

1. Log into SecureX and click on the **Administration** tab
1. Click on **API Clients** on the left menu
1. Click the **Generate API Client** button
1. Enter a meaningful name for the API client and check the box for the **Response** scope
1. Click **Add New Client** and make a note of the client ID and client secret

---

## Getting the Response Workflow's Details
To trigger a response workflow through the Threat Response API, you need to know the response action's module instance ID and action ID. For response workflows, the action ID is the workflow's ID. The easiest way to get this information is to import the `Sample - Listing Threat Response Response Actions` workflow from the [Sample Workflows](#sample-workflows) section below and run it.

If you run the workflow and examine the output of the `Convert module list into readable text` activity, you should see a list of information like this for each available action:
```text
------------------------------------------------------------------------------------------------------------------
Module Name: SecureX orchestration
Instance ID: 125abde6-152f-45d2-1234-6d7bc955c8ec
Action ID: 01KB905UJEA56332IxZSm89rlqiVbNg7xWO
Action Title: 0005 - SCA - Generate Casebook with Flow Links
Action URL: /iroh-response/respond/trigger/125abde6-152f-45d2-1234-6d7bc955c8ec/01KB905UJEA56332IxZSm89rlqiVbNg7xWO?observable_type=ip&observable_value=192.168.1.1&workflow_id=01KB905UJEA56332IxZSm89rlqiVbNg7xWO
------------------------------------------------------------------------------------------------------------------
```

Look for the workflow you want to run and make a note of its `Action URL`.

---

## Getting an Access Token
To use Threat Response APIs, you need an access token. You can get an access token from the Threat Response API using the client ID and client secret from your Threat Response API client (see [above](#generating-an-api-client)). To exchange your client information for a token, make the following API request:
* HTTP Method: `POST`
* URL: `http://visibility.amp.cisco.com/iroh/oauth2/token`
* Authorization:
	* Username: `Client ID`
	* Password: `Client Secret`
* Headers:
	* Content-Type: `application/x-www-form-urlencoded`
* Body: `grant_type=client_credentials`

You'll get a response that looks something like this (you need to extract the value of `access_token`):
```json
{
    "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIs(token shortened)",
    "token_type": "bearer",
    "expires_in": 600,
    "scope": "response"
}
```

Here's a full HTTP example:
```text
POST /iroh/oauth2/token HTTP/1.1
Host: visibility.amp.cisco.com
Authorization: Basic base64encode(<client ID>:<client secret>)
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
```

Note that access tokens are only valid for 10 minutes. When your token expires, you'll need to request a new one.

---

## Triggering a Workflow
One you have your access token and the workflow's action URL, you can request the workflow be triggered via the Threat Response API. You need to make the following API request:
* HTTP Method: `POST`
* URL: `http://visibility.amp.cisco.com/iroh<action URL>`
* Headers:
	* Authorization: `Bearer <Threat Response access token>` (see [above](#getting-an-access-token))

Here's a full HTTP example:
```text
POST /iroh/iroh-response/respond/trigger/125abde6-152f-45d2-1234-6d7bc955c8ec/01KB905UJEA56332IxZSm89rlqiVbNg7xWO?observable_type=ip&observable_value=192.168.1.1&workflow_id=01KB905UJEA56332IxZSm89rlqiVbNg7xWO HTTP/1.1
Host: visibility.amp.cisco.com
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIs(token shortened)
Content-Type: application/json
```

---

## Sample Workflows
The following sample workflows are available in our repository's workflows folder to help you get familiar with this concept. These can be imported using the instructions [here]({{ site.baseurl }}/importing) or you can view the workflow in GitHub by clicking on it.

* [Sample - Listing Threat Response Response Actions]({{ site.github.repository_url }}/tree/Main/Workflows/Sample-ListingCTRResponseActions__definition_workflow_01KEU8H4I287304q6vzCWsqURk39j2wAKoZ)