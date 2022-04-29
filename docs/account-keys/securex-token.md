---
layout: page
title: SecureX Token
permalink: /account-keys/securex-token
parent: Account Keys
---

# SecureX Token
The SecureX Token is a new type of [account key]({{ site.baseurl }}/account-keys/) which allows for easier use of SecureX APIs. Instead of having to generate an API client in SecureX and then enter the client ID and secret in orchestration, you can now simply use the SecureX Token account key. When you create this type of account key, an API client is automatically generated for you and can be associated with your HTTP-based [targets]({{ site.baseurl}}/targets/).

<div class="cisco-alert cisco-alert-info"><i class="fa fa-info-circle mr-1 cisco-icon-info"></i> Some workflows will be designed to use the legacy HTTP Basic Authentication account key and others may be designed to use the new SecureX Token. This page explains the differences between these two methodologies and how to migrate between them.</div>

<div class="cisco-alert cisco-alert-info"><i class="fa fa-info-circle mr-1 cisco-icon-info"></i> If you want to use the new SecureX Token account key with an <a href="{{ site.baseurl }}/remote/">orchestration remote</a>, you will need to update your remote to the latest version.</div>

---

## Using HTTP Basic Authentication (Old Method)
Accessing SecureX APIs using HTTP Basic Authentication requires two steps. First, we request an access token using `Threat Response - Generate Access Token` and then we use that token with subsequent activities. For this to work, an API client must be created in SecureX and then an account key must be created with that client's client ID and secret. Note that this is done automatically when SecureX orchestration tenants are provisioned unless the tenant was created after the transition to the new SecureX Token account key.

In workflows, this is how this method works:
1. Fetch an access token using `Threat Response - Generate Access Token` with the **CTR_For_Access_Token** target and **CTR_Credentials** account key. This gives you a bearer token for SecureX.
2. Pass the bearer token to subsequent activities such as `Threat Response - Create Incident` using the corresponding target (**CTR_Target**, **CTIA_Target**, or **Private_CTIA_Target**).

---

## Using the SecureX Token (New Method)
When using the new SecureX Token account key, accessing SecureX APIs is one step. Once the SecureX Token is created, you simply use that account key when communicating with SecureX and a token is automatically generated. No need to generate the token yourself, pass it between activities, or worry about it expiring.

In workflows, this is how this method works:
1. Simply use any Threat Response activity with the appropriate target (**CTR_Target**, **CTIA_Target**, or **Private_CTIA_Target**) using your SecureX Token account key. The token is automatically generated and passed to the API at runtime.

---

## Migrating Between these Methods
Depending on when your orchestration tenant was provisioned, one of the two configurations above will have been created for you. Since some workflows will use the old way and some will use the new way, it's important to know how to migrate your workflows between the two configurations. It's also important to remember that these two configurations can technically be used in parallel if you create two sets of targets and account keys.

### Moving from the Old to the New
If you want to migrate to the new style of authentication using SecureX Tokens, follow these steps:
1. If you don't already have a SecureX Token account key, go to your **Account Keys** page and create one. We recommend naming it `SecureX_Token`.
1. Navigate to your **Targets** page and edit the SecureX targets to use your new SecureX Token account key (**CTR_Target**, **CTIA_Target**, and **Private_CTIA_Target**).
1. In your workflows using SecureX APIs, do the following:
	* For each Threat Response-related activity, delete the variable from the **Access Token** input variable. This is typically the output variable from the `Threat Response - Generate Access Token` activity or a local variable holding the token.
	* Once references to the access token are removed, you can delete the `Threat Response - Generate Access Token` activites and other activites related to token generation. For example, in some workflows we periodically check if the token is still valid and, if not, regenerate it. All of that logic can be removed since the token is regenerated as needed.

### Move from the New to the Old
If you have a newer tenant with the SecureX Token account key and want to use workflows that use the old method, follow these steps:
1. If you haven't already, generate an API client in SecureX and make note of the client ID and secret. You should select the following scopes:
	* Casebook
	* Enrich:read
	* Global Intel:read
	* Inspect:read
	* Private Intel
	* Response
1. Go to your **Account Keys** page and create a new **HTTP Basic Credential** account key. Give it a meaningful name and use the client ID as the username and the secret as the password.
1. Go to your **Targets** page and create the targets you need. Information about specific target configuration can be found [here]({{ site.baseurl }}/targets/default).

### Using Both Methods
If you want to use both of the above methods at the same time, you absolutely can! Just remember that account key and target names should be unique and you will need two sets of account keys and two sets of targets. For example:
* If your tenant was provisioned using the old method, you can create objects that use the new method. Just call your account key something like `SecureX_Token` and name the targets to match (for example: **CTR_Target_Token**)
* If your tenant was provisioned using the new method, you can create objects that use the old method. Just call your account key something like `CTR_Credentials_Legacy` and name the targets to match (for example: **CTR_Target_Legacy**)
If you need guidance on how to configure the individual targets, please see [this page]({{ site.baseurl }}/targets/default).
