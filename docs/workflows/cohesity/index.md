---
layout: page
title: Cohesity Helios
permalink: /workflows/cohesity/
parent: Workflows
has_children: true
---

# Cohesity Helios

<div class="cisco-alert cisco-alert-info"><i class="fa fa-info-circle mr-1 cisco-icon-info"></i> We're working on improving how we publish content developed by third parties. In the meantime, we encourage you to use <a href="https://github.com/cohesity/SecureX" target="_blank">Cohesity's GitHub Repository</a> to import content for Helios. The information you need to add their repository to SecureX orchestration can be found below.</div>

---

## Atomic Actions
To configure SecureX orchestration to import atomic actions from Cohesity, refer to [this page]({{ site.baseurl }}/managing-repos) which explains how to add a new Git repository and use the repository information below:

* **Display Name:** `Cohesity_Atomics`
* **No Account Keys:** `True`
* **Protocol:** `HTTPS`
* **REST API Repository Type:** `GitHub`
* **REST API Repository:** `api.github.com/repos/cohesity/SecureX`
* **Branch:** `Main`
* **Code Path:** `Atomics`

---

## Workflows
To configure SecureX orchestration to import workflows from Cohesity, refer to [this page]({{ site.baseurl }}/managing-repos) which explains how to add a new Git repository and use the repository information below:

* **Display Name:** `Cohesity_Workflows`
* **No Account Keys:** `True`
* **Protocol:** `HTTPS`
* **REST API Repository Type:** `GitHub`
* **REST API Repository:** `api.github.com/repos/cohesity/SecureX`
* **Branch:** `Main`
* **Code Path:** `Workflows`
