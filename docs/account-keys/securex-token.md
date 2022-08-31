---
layout: page
title: SecureX Token
permalink: /account-keys/securex-token
parent: Account Keys
---

# SecureX Token
The SecureX Token is an [account key]({{ site.baseurl }}/account-keys/) which allows for easier use of SecureX APIs. Instead of having to generate an API client in SecureX and then enter the client ID and secret in orchestration, you can now simply use the SecureX Token account key. When you create this type of account key, an API client is automatically generated for you and can be associated with your HTTP-based [targets]({{ site.baseurl}}/targets/).

<div class="cisco-alert cisco-alert-info"><i class="fa fa-info-circle mr-1 cisco-icon-info"></i> We're in the process of updating our existing workflows to support SecureX Tokens. For customers already using SecureX Tokens, you'll be able to import these new versions and use them without needing to reconfigure them for tokens. For customers using legacy authentication, you can either import an older version of the workflow or update your account key and target configurations. This page contains more information about how to tell which method you're using and how to migrate between them.</div>

---

## How do I tell which method I'm using?
Depending on when your SecureX orchestration tenant was provisioned, you may be using the old method or the new method. To check which method your SecureX orchestration tenant is configured for, follow these steps:
1. In SecureX orchestration, go to the **Targets** page
1. Look for the target named **CTR_API** and click on it
1. Check the configuration under the **Account Keys** section:
	* If **No Account Keys** is set to `True`, you are using the *legacy method*
	* If **No Account Keys** is set to `False`, you are using the *new method*

More information about each method can be found below. If you want to migrate to the new method, see the migration steps below.

---

## What do I do if a workflow is using a different method than my tenant is configured for?
Our recommendation is to migrate to the new method. This means:
* If you import a workflow that uses the legacy method and your tenant is configured for the new method: you should update the workflow to support the new method OR check if a new version is available that supports SecureX Tokens.
* If you import a workflow that uses the new method and your tenant is configured for the old method: you should update your tenant configuration to support the new method.

Information about migrating to the new method for both your tenant configuration and your workflows can be found below.

---

## Can I use both methods at the same time?
Yes, you can use SecureX Tokens for some workflows and legacy authentication for others. You just need to create two sets of account keys and targets and configure the workflows accordingly. Information about account key and target configuration for these APIs can be found [here]({{ site.baseurl }}/account-keys/default) for account keys and [here]({{ site.baseurl }}/targets/default) for targets.

---

## Using the SecureX Token (New Method)
If your SecureX orchestration tenant is newer, it was provisioned with a SecureX Token automatically. When using the SecureX Token account key, accessing SecureX APIs is one step. You simply use that account key when communicating with SecureX and a token is automatically generated. No need to generate the token yourself, pass it between activities, or worry about it expiring.

In workflows, this is how this method works:
1. Simply use any SecureX or Threat Response activity with the appropriate target (**CTR_Target**, **CTIA_Target**, or **Private_CTIA_Target**). As long as the target is configured with the SecureX Token account key, the token will be automatically generated and passed to the API at runtime.

---

## Using HTTP Basic Authentication (Legacy Method)
If your SecureX orchestration tenant is older, it was provisioned with an API client in an HTTP Basic Authentication account key. Accessing SecureX APIs using HTTP Basic Authentication requires two steps. First, we request an access token using `Threat Response - Generate Access Token` and then we use that token with subsequent activities. For this to work, an API client must be created in SecureX and then an account key must be created with that client's client ID and secret.

In workflows, this is how this method works:
1. Fetch an access token using `Threat Response - Generate Access Token` with the **CTR_For_Access_Token** target and **CTR_Credentials** account key. This gives you a bearer token for SecureX.
1. Pass the bearer token to subsequent activities such as `Threat Response - Create Incident` using the corresponding target (**CTR_Target**, **CTIA_Target**, or **Private_CTIA_Target**).

---

## Migrating from the Legacy Method to the New Method
If your SecureX orchestration tenant is configured to use the legacy method, you can update your configuration and your workflows to use the new method using these steps.

1. If you don't already have a SecureX Token account key, go to your **Account Keys** page and create one. We recommend naming it `SecureX_Token`.
1. Navigate to your **Targets** page and edit the SecureX targets to use your new SecureX Token account key (**CTR_Target**, **CTIA_Target**, and **Private_CTIA_Target**).
1. In your workflows using SecureX APIs, do the following:
	* For each SecureX or Threat Response-related activity, delete the variable from the **Access Token** input variable. This is typically the output variable from the `Threat Response - Generate Access Token` activity or a local variable holding the token.
	* Once references to the access token are removed, you can delete the `Threat Response - Generate Access Token` activites and other activites related to token generation. For example, in some workflows we periodically check if the token is still valid and, if not, regenerate it. All of that logic can be removed since the token is regenerated as needed.
