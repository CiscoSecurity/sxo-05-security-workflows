---
layout: page
title: API Access Methods
permalink: /workflows/secure-firewall/api-types
parent: Cisco Secure Firewall
grand_parent: Workflows
---

# API Access Methods
SecureX orchestration runs in the public cloud and cannot typically access on-premises resources that are behind a firewall, including Cisco Secure Firewall. You can integrate Secure Firewall with orchestration in one of two ways. This page explains the two different ways to use Secure Firewall with orchestration.

---

## Security Services Exchange Proxy
If your FMC is running version 7.2 or above and you have your devices registered with Cisco Security Services Exchange (SSE), you can use the [SecureX SSE Proxy API](https://visibility.amp.cisco.com/iroh/iroh-sse/index.html) to communicate with your FMC. When you send a request to the SSE proxy API, it will be securely delivered to your FMC behind the firewall and the response will be returned to the cloud. This method does not require opening holes in your firewall to allow API traffic from orchestration or deploying an [orchestration remote]({{ site.baseurl }}/remote).

To use this method, use the atomics in the "Cisco Secure Firewall (SSE)" category in the workflow editor's toolbox. These atomics are designed to use the standard `CTR_API` target which is where the SSE proxy API lives. Authentication for this API is managed by either providing an access token (generated using "Threat Response - Generate Access Token") or using your `CTR_API` target with a [SecureX Token]({{ site.baseurl }}/account-keys/securex-token) account key.

---

## Orchestration Remote
If you aren't running a new enough version of FMC or don't use Cisco Security Services Exchange (SSE), you can deploy an [orchestration remote]({{ site.baseurl }}/remote). This is an appliance you deploy on-premises to bridge the gap between the SecureX cloud and your on-premises resources. We refer to this method as "direct."

To use this method, use the atomics in the "Cisco Secure Firewall" category in the workflow editor's toolbox. These atomics will use a target for your FMC configured to use your orchestration remove. Authentication for these atomics is based on an access token fetched from FMC using the "Secure Firewall - Get Access Token" atomic.
