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
This account key is used to make requests to AMP for Endpoints. Note that while this account key is created by default, you will still need to provide a client ID and secret for the AMP API.

* **Type:** HTTP Basic Authentication
* **Username:** `To be configured by customer`
* **Password:** `To be configured by customer`
* **Target:** AMP_Target

---

## CTR_Credentials
This account key is used to get access tokens from Threat Response. These tokens are then used for subsequent API calls to CTR.

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
* **Username:** `Pre-configured`
* **Password:** `Pre-configured`
* **Target:** Orbital_For_Access_Token