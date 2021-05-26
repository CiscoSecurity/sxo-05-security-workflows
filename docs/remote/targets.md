---
layout: page
title: Target Configuration
permalink: /remote/targets
parent: Remote
---

# Target Configuration
Once you have an orchestration remote up and running, you can configure targets to use it. Each target can have its own remote configured since you may have multiple remotes running in different data centers or environments. If a target does not have a remote defined, SecureX Orchestration will attempt to connect to it directly.

To use a remote to communicate with a specific target:
1. Expand the main menu and click on **Targets**
1. Select the target you want to add a remote to
1. Under the **Remotes** section, select the remote you want to use with this target from the drop down list
![]({{ site.baseurl }}/assets/images/remote/target-1.png)

1. Click **Submit**

If you haven't already configured your remote, see [this page]({{ site.baseurl }}/remote) for more information