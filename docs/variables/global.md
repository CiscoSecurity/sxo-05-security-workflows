---
layout: page
title: Global Variables
permalink: /variables/global
parent: Variables
---

# Global Variables
Global variables are useful when you want to:
* Store information between runs of a workflow; or
* Share information between multiple different workflows

Orchestration workflows don't have any concept of persistence; as in, the second time a workflow runs it doesn't know anything about the first time. Global variables can be used to bridge this gap by storing information that persists.

In some instances you may want multiple workflows to share information. A common example is an API key or Webex Teams room name.

---

## Creation
Global variables are created and managed under the **Variables** section of orchestration. All variables listed on this page are global variables.

![]({{ site.baseurl }}/assets/images/variables/global/menu.png)

To create a new global variable, simply click the **New Variable** button and fill in the form. Refer to the [data types]({{ site.base_url }}/variables/types) page for more information about the various data types available.

---

## Usage
Using a global variable within a workflow is the same as using any other variable: click the puzzle piece icon in a field and use the variable browser to select the variable you want:

![]({{ site.baseurl }}/assets/images/variables/global/browser.png)

You can also use the standard [`Set Variables`]({{ site.baseurl }}/activities/set-variables) activity to update the value in a global variable within a workflow.