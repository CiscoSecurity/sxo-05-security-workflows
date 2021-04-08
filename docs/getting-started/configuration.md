---
layout: page
title: Using this Repository
permalink: /configuration
parent: Getting Started
has_children: true
has_toc: false
nav_order: 10
---

# Using this Repository
To use the content in this repository, you must have the necessary Git Repositories configured in orchestration. For many tenants, these repositories are configured by default. If your tenant is missing them, you can use the instructions below to add them.

[<i class="fa fa-video mr-1"></i> Managing Git Repositories](https://www.youtube.com/watch?v=qVZHXcxYj9k&list=PLPFIie48Myg2tu2gHbgm-moYg8LDaXsSo&index=6){: .btn-cisco-outline }

---

## 403 - Rate Limit Exceeded
Are you seeing a 403 error when you try to import content from GitHub? When SecureX Orchestration is provisioned, we add this Git repository for you by default. However, since we don't configure it with credentials, GitHub imposes some rate limits for API requests. If you run into this issue, you can update the repository configurations with an [account key]({{ site.baseurl }}/account-keys) using the [steps below](#adding-an-account-key).

---

## Creating the Git Repository for Atomic Actions
1. In SecureX Orchestration, expand the main menu and click on **Admin** and then **Git Repositories**
1. Click on the **New Git Repository** button (or click on the existing repository you want to update)
1. Provide a name for the repository (suggested: `CiscoSecurity_Atomics`)
1. Set **No Account Keys** to `True` (see [above](#403---rate-limit-exceeded))
1. Fill in the Git information:
	* Protocol: `HTTPS`
	* REST API Repository Type: `GitHub`
	* REST API Repository: `api.github.com/repos/CiscoSecurity/sxo-05-security-workflows`
	* Branch: `Main`
	* Code Path: `Atomics`
1. Click **Submit**

---

## Creating the Git Repository for Workflows
1. In SecureX Orchestration, expand the main menu and click on **Admin** and then **Git Repositories**
1. Click on the **New Git Repository** button (or click on the existing repository you want to update)
1. Provide a name for the repository (suggested: `CiscoSecurity_Workflows`)
1. Set **No Account Keys** to `True` (see [above](#403---rate-limit-exceeded))
1. Fill in the Git information:
	* Protocol: `HTTPS`
	* REST API Repository Type: `GitHub`
	* REST API Repository: `api.github.com/repos/CiscoSecurity/sxo-05-security-workflows`
	* Branch: `Main`
	* Code Path: `Workflows`
1. Click **Submit**

---

## Adding an Account Key
Note: If your GitHub account has two-factor authentication enabled, you'll need to use a personal access token. To generate a token, check out [these instructions](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).

1. In SecureX Orchestration, expand the main menu and click on **Account Keys**
1. Click on the **New Account Key** button and change the type to **Git Password-Based Credentials**
1. Give the account key a meaningful **Display Name**
1. Enter your GitHub username and password under the **Git** section (Note: If you're using a personal access token, put the token instead of your password)
1. Click **Submit**
1. Expand the main menu and click on **Admin** and then **Git Repositories**
1. Click on **CiscoSecurity_Atomics**:
	* Change **No Account Keys** to `False`
	* Select the account key you created as the **Default Account Key**
	* Click the **Submit** button
1. Repeat step 7 for the **CiscoSecurity_Workflows** repository

---

## Next Steps
Once you have your repositories configured, you can start importing content!

[<i class="fa fa-download mr-1"></i> Importing Content]({{ site.baseurl }}/importing){: .btn-cisco-sky-blue }