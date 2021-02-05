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

## Creating the Git Repository for Atomic Actions
1. In SecureX Orchestration, expand the main menu and click on **Admin** and then **Git Repositories**
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

---

## Creating the Git Repository for Workflows
1. In SecureX Orchestration, expand the main menu and click on **Admin** and then **Git Repositories**
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

---

## Next Steps
Once you have your repositories configured, you can start importing content!

[<i class="fa fa-download mr-1"></i> Importing Content]({{ site.baseurl }}/importing){: .btn-cisco-sky-blue }