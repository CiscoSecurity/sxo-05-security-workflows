---
layout: page
title: Default Repositories
permalink: /default-repos
parent: Using Our GitHub Repositories
grand_parent: Getting Started
---

# Default Repositories
When a SecureX orchestration tenant is created, various default GitHub targets are created. Some of them are used to import initial content and others are made available so you can easily import additional content yourself. This page contains a list of repositories you may see in SecureX orchestration and some information about them.

---

## CiscoSecurity_Atomics and CiscoSecurity_Workflows
These repositories contain atomic actions and workflows published by Cisco. Content in these repositories has passed Cisco's strict review process (as outlined [here]({{ site.baseurl }}/content-quality/)) and follows Cisco's style guide.

## CiscoSecurity_Default_Workflows
This repository contains the [default workflows]({{ site.baseurl }}/workflows/default/) that are automatically imported during tenant creation. If you need to re-import one of the default workflows, you can use this repository. The content in this repository is published by Cisco, has passed Cisco's strict review process (as outlined [here]({{ site.baseurl }}/content-quality/)), and follows Cisco's style guide.

---

## Github_Target_Atomics and Github_Target_Workflows
These are legacy repositories which your tenant may or may not have. If you have them, you should just ignore them. If you don't have them, there's no need to add them.

## Github_Target_Utils
This repository contains utilities used during tenant creation and provisioning. You should ignore it.

---

## But wait, I don't have these...
- If you're missing one of the CiscoSecurity repositories, you can follow the instructions on [this page]({{ site.baseurl }}/configuration) to configure them.
- If you're missing one of the Github_Target repositories, that's okay! These are legacy repositories that we don't actively maintain.
