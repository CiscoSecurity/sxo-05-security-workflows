---
layout: page
title: Default Account Keys
permalink: /account-keys/default
parent: Account Keys
---

# Default Account Keys
This page lists all of the account keys that are created by default when an orchestration instance is provisioned. These are used with the [default targets]({{ site.baseurl }}/targets/default) that are also configured.

---

### SecureX Token
This account key automatically generates a token as needed during workflow execution. You don't need to worry about creating a SecureX API client, once you create this type of account key SecureX orchestration creates an API client for you.
* **Type:** SecureX Token
* **Target:** CTIA_Target, CTR_Target, Private_CTIA_Target
