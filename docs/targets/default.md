---
layout: page
title: Default Targets
permalink: /targets/default
parent: Targets
---

# Default Targets
This page lists all of the targets that are created by default when an orchestration instance is provisioned. These are used with the [default account keys]({{ site.baseurl }}/account-keys/default) that are also configured.

---

## AMP_Target
This target is used to make requests to AMP for Endpoints.

* **Type:** HTTP Endpoint
* **Protocol:** `HTTPS`
* **Host:** `api.amp.cisco.com`
* **Path:** `/v1`
* **Account Key:** AMP_Credentials

---

## CTIA_Target
This target is used for operations related to public threat intelligence.

* **Type:** HTTP Endpoint
* **Protocol:** `HTTPS`
* **Host:** `intel.amp.cisco.com`
* **Path:** None
* **Account Keys:**
	* If using the SecureX Token account key: CTR_Credentials
	* If using the [legacy method]({{ site.baseurl }}/account-keys/securex-token): None

---

## CTR_For_Access_Token
This target is used to get access tokens for the Threat Response API. This target is only used if you haven't migrated to the new SecureX token account keys. More information about the different types of targets and account keys for SecureX APIs can be found [here]({{ site.baseurl }}/account-keys/securex-token).

* **Type:** HTTP Endpoint
* **Protocol:** `HTTPS`
* **Host:** `visibility.amp.cisco.com`
* **Path:** `/iroh`
* **Account Key:** CTR_Credentials

---

## CTR_API
This target is used to access the Threat Response API for things like inspection, enrichment, and deliberation.

* **Type:** HTTP Endpoint
* **Protocol:** `HTTPS`
* **Host:** `visibility.amp.cisco.com`
* **Path:** `/iroh`
* **Account Keys:**
	* If using the SecureX Token account key: CTR_Credentials
	* If using the [legacy method]({{ site.baseurl }}/account-keys/securex-token): None

---

## Orbital_For_Access_Token
This target is used to get access tokens for Orbital.

* **Type:** HTTP Endpoint
* **Protocol:** `HTTPS`
* **Host:** `visibility.amp.cisco.com`
* **Path:** `/iroh`
* **Account Key:** Orbital_Credentials

---

## Orbital_Target
This target is used to make requests to Orbital.

* **Type:** HTTP Endpoint
* **Protocol:** `HTTPS`
* **Host:** `orbital.amp.cisco.com`
* **Path:** `/v0`
* **Account Key:** None (uses an Orbital access token)

---

## Private_CTIA_Target
This target is used for operations related to private threat intelligence such as casebooks and incidents.

* **Type:** HTTP Endpoint
* **Protocol:** `HTTPS`
* **Host:** `private.intel.amp.cisco.com`
* **Path:** None
* **Account Keys:**
	* If using the SecureX Token account key: CTR_Credentials
	* If using the [legacy method]({{ site.baseurl }}/account-keys/securex-token): None

---

## ThreatGrid_Target
This target is used to make requests to ThreatGrid.

* **Type:** HTTP Endpoint
* **Protocol:** `HTTPS`
* **Host:** `panacea.threatgrid.com`
* **Path:** None
* **Account Key:** None (uses a ThreatGrid API key)
