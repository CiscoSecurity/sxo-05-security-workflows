---
layout: page
title: Default Account Keys
permalink: /account-keys/default
parent: Account Keys
---

# Default Account Keys
This page lists all of the account keys that are created by default when an orchestration instance is provisioned. These are used with the [default targets]({{ site.baseurl }}/targets/default) that are also configured.

---

## AMP_Credentials
This account key is used to make requests to Cisco Secure Endpoint (formerly AMP for Endpoints). Note that while this account key is created by default, you will still need to provide a client ID and secret.

* **Type:** HTTP Basic Authentication
* **Username:** `To be configured by customer`
* **Password:** `To be configured by customer`
* **Target:** AMP_Target

---

## CTR_Credentials
There are two versions of this account key, but both are used to access SecureX APIs. For more information about the two different configurations you can use, see [this page]({{ site.baseurl }}/account-keys/securex-token).

### SecureX Token (New)
This account key automatically generates a token as needed during workflow execution. You don't need to worry about creating a SecureX API client, once you create this type of account key SecureX orchestration creates an API client for you.
* **Type:** SecureX Token
* **Target:** CTIA_Target, CTR_Target, Private_CTIA_Target

### HTTP Basic Authentication (Old)
This target is used to fetch a bearer token from SecureX which is then used for subsequent API calls. This method uses a client ID and secret for the SecureX API.
* **Type:** HTTP Basic Authentication
* **Username:** `Pre-configured`
* **Password:** `Pre-configured`
* **Target:** CTR_For_Access_Token

---

## Git_Credentials
This account key is used to import content from GitHub.

* **Type:** Git Password-Based Credentials
* **Username:** `Pre-configured`
* **Password:** `Pre-configured`
* **Target:** N/A (used by the Git Repository configuration under Admin)

---

## Orbital_Credentials
This account key is used to get access tokens from Orbital. These tokens are then used for subsequent API calls to Orbital.

* **Type:** HTTP Basic Authentication
* **Username:** `To be configured by customer`
* **Password:** `To be configured by customer`
* **Target:** Orbital_For_Access_Token
