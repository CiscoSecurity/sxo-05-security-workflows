---
layout: page
title: Using this Repository
permalink: /configuration
nav_order: 5
---

# Using this Repository
To use this repository, you need to configure three things in SecureX orchestration: an account key and two Git repositories.

---

**A Note For SecureX TME Repository Users**

If you previously used the SecureX TME repository, you can use your existing account key (assuming it's a personal access token as described below). You can also update your existing targets instead of deleting them and creating new ones.

---

## Generating a GitHub Personal Access Token
If you already have a personal access token for GitHub with "repo" scopes, you can skip this section. If you need to generate an access token, follow the steps on [this article](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token). When selecting scopes, be sure to select all of the "repo" options.

## Creating an Account Key
1. In SecureX orchestration, expand the main menu and click on **Account Keys**
2. Click the **New Account Key** button
3. For the account key type, select **Git Password-Based Credentials**
4. Provide a name for the account key
5. For the username, enter your GitHub email address
6. For the password, enter your personal access token
7. Click **Submit**

## Creating the Git Repository for Atomic Actions
1. In SecureX orchestration, expand the main menu and click on **Admin** and then **Git Repositories**
2. Click on the **New Git Repository** button (or click on the existing repository you want to update)
3. Provide a name for the repository (suggested: `CiscoSecurity-Atomics`)
4. Select the account key you created earlier
5. Fill in the Git information:
- Protocol: `HTTPS`
- REST API Repository Type: `GitHub`
- REST API Repository: `api.github.com/repos/CiscoSecurity/sxo-05-security-workflows`
- Branch: `Main`
- Code Path: `Atomics`
6. Click **Submit**

## Creating the Git Repository for Workflows
1. In SecureX orchestration, expand the main menu and click on **Admin** and then **Git Repositories**
2. Click on the **New Git Repository** button (or click on the existing repository you want to update)
3. Provide a name for the repository (suggested: `CiscoSecurity-Workflows`)
4. Select the account key you created earlier
5. Fill in the Git information:
- Protocol: `HTTPS`
- REST API Repository Type: `GitHub`
- REST API Repository: `api.github.com/repos/CiscoSecurity/sxo-05-security-workflows`
- Branch: `Main`
- Code Path: `Workflows`
6. Click **Submit**