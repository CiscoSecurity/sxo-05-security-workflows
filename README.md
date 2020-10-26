# Cisco SecureX orchestration
SecureX orchestration provides a no-to-low code approach for building automated workflows. These workflows can interact with various types of resources and systems, whether they're from Cisco or a third-party.

* [SecureX product page](https://cisco.com/go/securex)
* [SecureX orchestration video series](https://www.youtube.com/playlist?list=PLPFIie48Myg2tu2gHbgm-moYg8LDaXsSo)

## Disclaimer
All content in this repository is provided AS-IS under the [Cisco Sample Code License](https://developer.cisco.com/site/license/cisco-sample-code-license/).

## Atomic Actions
Atomic actions are self-contained workflows that are similar to a function in traditional programming. They can consume input, perform various actions, and then return output. They're designed to be portable, re-usable, and make building workflows more efficient.

## Workflows
Workflows are the larger component of orchestration and are similar to a script in traditional programming. A workflow can be simple and only have a few actions or be complex and string together many different actions for different products.

## How to Configure
To use this repository, you need to configure three things in SecureX orchestration: an account key and two Git repositories.

### Generating a Personal Access Token
If you already have a personal access token with "repo" scopes, you can skip this section. If you need to generate an access token, follow the steps on [this article](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token). When selecting scopes, be sure to select all of the "repo" options.

### Creating an Account Key
1. In SecureX orchestration, expand the main menu and click on Account Keys
2. Click the New Account Key button
3. For the account key type, select "Git Password-Based Credentials"
4. Provide a name for the account key
5. For the username, enter your GitHub email address
6. For the password, enter your personal access token
7. Click Submit

### Creating the Git Repository for Atomic Actions
*Note: If you previously used the SecureX TME repository, you should update the existing Git configuration instead of creating a new repository*
1. In SecureX orchestration, expand the main menu and click on Admin and then Git Repositories
2. Click on the New Git Repository button (or click on the existing repository you want to update)
3. Provide a name for the repository (suggested: CiscoSecurity-Atomics)
4. Select the account key you created earlier
5. Fill in the Git information:
- Protocol: HTTPS
- REST API Repository Type: GitHub
- REST API Repository: api.github.com/repos/CiscoSecurity/sxo-05-security-workflows
- Branch: Main
- Code Path: Atomics
6. Click Submit

### Creating the Git Repository for Workflows
*Note: If you previously used the SecureX TME repository, you should update the existing Git configuration instead of creating a new repository*
1. In SecureX orchestration, expand the main menu and click on Admin and then Git Repositories
2. Click on the New Git Repository button (or click on the existing repository you want to update)
3. Provide a name for the repository (suggested: CiscoSecurity-Workflows)
4. Select the account key you created earlier
5. Fill in the Git information:
- Protocol: HTTPS
- REST API Repository Type: GitHub
- REST API Repository: api.github.com/repos/CiscoSecurity/sxo-05-security-workflows
- Branch: Main
- Code Path: Workflows
6. Click Submit
