---
layout: page
title: ManageEngine
permalink: /atomics/configuration/manageengine
redirect_from:
  - /atomics/manageengine
parent: Configuration
grand_parent: Atomic Actions
---

# ManageEngine
ManageEngine offers a variety of cloud-based and on-premise products for managing different aspects of your technology.

| Product | Atomic Name | Purpose |
|:--------|:------------|:--------|
| ServiceDesk Plus | SDP - Add Work Note to Incident | Adds a work note to an existing incident |
| ServiceDesk Plus | SDP - Create Change Request | Creates a new change request |
| ServiceDesk Plus | SDP - Create Incident | Creates a new incident |
| Multiple | Get Tokens | Fetches authentication tokens for subsequent API requests |
| Multiple | Refresh Tokens | Refreshes existing authentication tokens |

---

## Generating API Credentials
Before you can integrate with ManageEngine APIs, you need to create an API client in the Zoho developer console and fetch your first access/refresh tokens.

### Creating an API Client
Note: These steps show an example of how to create an API client with scopes for ServiceDesk Plus

1. Log in to the [Zoho Developer Console](https://api-console.zoho.com/)
1. Select **Self Client** from the list of client types and click the **Create** button
![]({{ site.baseurl }}/assets/images/atomics/configuration/manageengine/self-client.png)

1. Click **OK** in the pop-up to enable the self client
1. On the **Client Secret** tab, make note of your client ID and client secret
![]({{ site.baseurl }}/assets/images/atomics/configuration/manageengine/client-id-secret.png)

1. Click the **Generate Code** tab
	* Enter the following scopes: `SDPOnDemand.requests.ALL, SDPOnDemand.changes.ALL`
	* Set the **Time Duration** to how long you want the grant code to be valid (we recommend 10 minutes)
	* Enter a description and click the **Create** button

	![]({{ site.baseurl }}/assets/images/atomics/configuration/manageengine/generate-code.png)

1. Make note of the code that's displayed

![]({{ site.baseurl }}/assets/images/atomics/configuration/manageengine/grant-code.png)

### Getting Your First Tokens
After you follow the steps above, you must exchange the code you generated for access and refresh tokens before the code expires (based on the **Time Duration** selected above). Once you have the access and refresh tokens, you'll be able to use the ManageEngine APIs and refresh the access token as needed. To get the access and refresh tokens, use the `ManageEngine - Get Tokens` atomic with the client ID, client secret, and grant code generated above.

---

## Target URLs
When you create your ManageEngine target, be sure to use the correct domain for the Zoho region your instance is hosted in:
* United States: `accounts.zoho.com`
* Europe: `accounts.zoho.eu`
* India: `accounts.zoho.in`
* China: `accounts.zoho.com.cn`
* Australia: `accounts.zoho.com.au`

---

## OAuth Redirect URIs
These redirect URLs are used by the token atomics during authentication. The URLs will vary depending on the product and region you're using.

### ServiceDesk Plus
* United States: `https://sdpondemand.manageengine.com`
* Europe: `https://sdpondemand.manageengine.eu`
* India: `https://sdpondemand.manageengine.in`
* China: `https://servicedeskplus.cn`
* Australia: `https://servicedeskplus.net.au`
