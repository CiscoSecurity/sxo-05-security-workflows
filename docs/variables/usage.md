---
layout: page
title: Using Variables
permalink: /variables/usage
parent: Variables
---

# Using Variables
Orchestration provides a Variable Browser that you can use to explore and select variables while building a workflow. If you want to update a variable's value, you simply use the [`Set Variables`]({{ site.baseurl }}/activities/set-variables) activity.

---

## Variable Browser
The variable browser allows you to explore all of the variables available to you while building a workflow. This is a combination of variables from activities, global variables, and [workflow variables]({{ site.baseurl }}/variables/workflow).

![]({{ site.baseurl }}/assets/images/variables/workflow/atomic-output.png)

The variable browser's Activities section is hierarchical. As in, you'll have to step through it following the same path as the workflow itself. Variables are only available within the scope they're defined in. As in, if you have an atomic action within a loop, you won't be able to access its output outside of the loop.