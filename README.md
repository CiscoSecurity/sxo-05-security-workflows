# Cisco SecureX orchestration
[![published](https://static.production.devnetcloud.com/codeexchange/assets/images/devnet-published.svg)](https://developer.cisco.com/codeexchange/github/repo/CiscoSecurity/sxo-05-security-workflows)

SecureX orchestration provides a no-to-low code approach for building automated workflows. These workflows can interact with various types of resources and systems, whether they're from Cisco or a third-party.

* [Documentation](https://ciscosecurity.github.io/sxo-05-security-workflows/)

## Getting Started
To get started with SecureX orchestration, we recommend checking out our [Getting Started](https://ciscosecurity.github.io/sxo-05-security-workflows/getting-started) page. This page lists helpful resources for learning about SecureX orchestration and getting this repository configured. If you'd rather skip to getting this repository added to your SecureX instance, keep reading...

## Creating the Git Repository for Atomic Actions
1. In SecureX orchestration, expand the main menu and click on **Admin** and then **Git Repositories**
1. Click on the **New Git Repository** button (or click on the existing repository you want to update)
1. Provide a name for the repository (suggested: `CiscoSecurity_Atomics`)
1. Set **No Account Keys** to `True`
1. Fill in the Git information:
	* Protocol: `HTTPS`
	* REST API Repository Type: `GitHub`
	* REST API Repository: `api.github.com/repos/CiscoSecurity/sxo-05-security-workflows`
	* Branch: `Main`
	* Code Path: `Atomics`
1. Click **Submit**

## Creating the Git Repository for Workflows
1. In SecureX orchestration, expand the main menu and click on **Admin** and then **Git Repositories**
1. Click on the **New Git Repository** button (or click on the existing repository you want to update)
1. Provide a name for the repository (suggested: `CiscoSecurity_Workflows`)
1. Set **No Account Keys** to `True`
1. Fill in the Git information:
	* Protocol: `HTTPS`
	* REST API Repository Type: `GitHub`
	* REST API Repository: `api.github.com/repos/CiscoSecurity/sxo-05-security-workflows`
	* Branch: `Main`
	* Code Path: `Workflows`
1. Click **Submit**

## Next Steps
Once you have your repositories configured, you can start importing content!

[Continue Reading...](https://ciscosecurity.github.io/sxo-05-security-workflows/importing)

## Disclaimer
All content in this repository is provided AS-IS under the [Cisco Sample Code License](https://developer.cisco.com/site/license/cisco-sample-code-license/).
