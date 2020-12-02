---
layout: page
title: Workflow Variables
permalink: /variables/workflow
parent: Variables
---

# Workflow Variables
Within a workflow or atomic action, you can define four types of variables: input, output, local, and static. Each of these variable types has a purpose as explained below.

![]({{ site.baseurl }}/assets/images/variables/workflow/properties.png)

---

## Input Variables
Input variables allow your workflow or atomic action to consume information when they're executed. If a workflow has input variables and you click the **Run** button, you'll be asked to provide values for those variables before the workflow runs.

![]({{ site.baseurl }}/assets/images/variables/workflow/input.png)

If an atomic action has input variables, you'll be able to provide their values when editing the atomic's properties within a workflow.

![]({{ site.baseurl }}/assets/images/variables/workflow/atomic-input.png)

Input variables can be optional or required. If set to required for a workflow, the workflow won't run without input. If set to required for an atomic, the workflow won't validate unless input is provided.

---

## Output Variables
Output variables can be used by workflows, but are most commonly seen in atomic actions. Many atomic actions consume input using input variables, do something, and then produce output in output variables. Output variables are available after a workflow or atomic action runs and are then usually used by subsequent activities.

![]({{ site.baseurl }}/assets/images/variables/workflow/atomic-output.png)

---

## Local Variables
Local variables only exist within a workflow or atomic action. As in, you don't provide their values to a workflow when it starts and their values are not accessible outside of the workflow after it ends. You can only get or set their values within the workflow itself. These are useful as placeholders for assembling text for Webex Teams messages, for example.

---

## Static Variables
Static variables also only exist within a workflow or atomic action. These variables have a pre-set value which cannot be modified. If you try to use a [`Set Variables`]({{ site.baseurl }}/activities/set-variables) to modify one, it'll fail.
