---
layout: page
title: Using this Repository
permalink: /configuration
nav_order: 10
---

# Using this Repository
To use this repository, you need to configure three things in SecureX orchestration: an account key and two Git repositories.

---

**Note for SecureX TME Repository Users**

If you previously used the SecureX TME repository, you can use your existing account key. You can also update your existing targets instead of deleting them and creating new ones.

---

## Getting your GitHub Credentials
When communicating with GitHub from SecureX orchestration, we recommend using a Personal Access Token instead of your username and password. If you have two-factor authentication enabled, a personal access token will be required since orchestration won't be able to pass the two-factor check.
* If you already have a personal access token for GitHub with `repo` scopes, you can skip this section.
* If you need to generate an access token, follow the steps on [this article](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token). When selecting scopes, be sure to select all of the `repo` options.

---

## Creating an Account Key
1. In SecureX orchestration, expand the main menu and click on **Account Keys**
1. Click the **New Account Key** button
1. For the account key type, select **Git Password-Based Credentials**
1. Provide a name for the account key
1. For the username, enter your GitHub email address
1. For the password, enter your personal access token
1. Click **Submit**

---

## Creating the Git Repository for Atomic Actions
1. In SecureX orchestration, expand the main menu and click on **Admin** and then **Git Repositories**
1. Click on the **New Git Repository** button (or click on the existing repository you want to update)
1. Provide a name for the repository (suggested: `CiscoSecurity-Atomics`)
1. Select the account key you created earlier
1. Fill in the Git information:
	* Protocol: `HTTPS`
	* REST API Repository Type: `GitHub`
	* REST API Repository: `api.github.com/repos/CiscoSecurity/sxo-05-security-workflows`
	* Branch: `Main`
	* Code Path: `Atomics`
1. Click **Submit**

---

## Creating the Git Repository for Workflows
1. In SecureX orchestration, expand the main menu and click on **Admin** and then **Git Repositories**
1. Click on the **New Git Repository** button (or click on the existing repository you want to update)
1. Provide a name for the repository (suggested: `CiscoSecurity-Workflows`)
1. Select the account key you created earlier
1. Fill in the Git information:
	* Protocol: `HTTPS`
	* REST API Repository Type: `GitHub`
	* REST API Repository: `api.github.com/repos/CiscoSecurity/sxo-05-security-workflows`
	* Branch: `Main`
	* Code Path: `Workflows`
1. Click **Submit**

---

## Next Steps
Once you have your repositories configured, you can start importing content!

[Importing Content]({{ site.baseurl }}/importing){: .btn .btn-blue }