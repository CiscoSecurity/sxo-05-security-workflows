---
layout: page
title: Managing Git Repositories
permalink: /managing-repos
parent: Getting Started
nav_order: 14
---

# Managing Git Repositories
This page contains information about how to add, modify, and remove the Git repositories configured in SecureX orchestration.

---

## Adding a Repository
1. In SecureX orchestration, expand the main menu and click on **Admin** and then **Git Repositories**.
1. Click on the **New Git Repository** button.
1. Provide a name for the repository (this is what will appear in the Import window).
1. If using:
	* A public repository: you can set **No Account Keys** to `True`.
	* A private repository: set **No Account Keys** to `False` and then select the correct **Default Account Key**. See [this page]({{ site.baseurl }}/configuration/#adding-an-account-key) for more information about account keys for Git.
1. Fill in the Git repository information:
	* **Protocol:** `HTTPS`
	* **REST API Repository Type:** `GitHub` or `BitBucket`
	* **REST API Repository:** The API URL of the repository, for example: `api.github.com/repos/CiscoSecurity/sxo-05-security-workflows`
	* **Branch:** The name of the branch you want to use. This is typically `Main` or `Master`.
	* **Code Path:** The path within the repository to get content from. If the content is in the root directory, you can leave this blank. If the content is in a folder such as `Workflows`, set this to `Workflows`.
1. Click **Submit**.

---

## Modifying a Repository
1. In SecureX orchestration, expand the main menu and click on **Admin** and then **Git Repositories**.
1. Click on the repository you want to update.
1. Make the changes you want (see above for hints) and click **Submit**.

---

## Removing a Repository
1. In SecureX orchestration, expand the main menu and click on **Admin** and then **Git Repositories**.
1. Hover over the repository you want to delete and click the three dots that appear in the **Actions** column on the right.
1. Click **Delete** and confirm deletion.
	* Note that you cannot delete a repository that's in use by a workflow. To see which workflows are using a repository, click the **Used By** option in the action menu.
