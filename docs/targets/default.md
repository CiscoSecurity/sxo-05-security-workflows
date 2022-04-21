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
* **Account Keys:** None (uses a CTR access token)

---

## CTR_For_Access_Token
This target is used to get access tokens for the Threat Response API.

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
* **Account Key:** None (uses a CTR access token)

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
* **Account Keys:** None (uses a CTR access token)

---

## ThreatGrid_Target
This target is used to make requests to ThreatGrid.

* **Type:** HTTP Endpoint
* **Protocol:** `HTTPS`
* **Host:** `panacea.threatgrid.com`
* **Path:** None
* **Account Key:** None (uses a ThreatGrid API key)
