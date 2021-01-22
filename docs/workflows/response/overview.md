---
layout: page
title: Overview
permalink: /workflows/response/overview
parent: Response Workflows
grand_parent: Workflows
nav_order: 1
---

# Overview
Response workflows are a powerful tool that allows you to customize the actions available in Threat Response and SecureX pivot menus.

[<i class="fa fa-video mr-1"></i> Response Workflows](https://www.youtube.com/watch?v=KlV0bGO4qRI&list=PLPFIie48Myg2tu2gHbgm-moYg8LDaXsSo&index=4){: .btn-cisco-outline }

---

## User Experience

Here's what workflows look like in the pivot menu after pivoting on a domain:

![]({{ site.baseurl }}/assets/images/workflows/response/pivot-menu.png)

When you select a workflow to execute, you'll see a small success message at the bottom right of the page. Note that this success message only indicates that the workflow was started successfully; it does not mean the workflow completed successfully. To view the workflow's status and result, you'll need to go into SecureX orchestration and view its runs.

---

## Requirements
In order for a workflow to appear in pivot menus, it must:
1. Have a category of `response`
1. Have a `String` input named `observable_type`
1. Have a `String` input named `observable_value`
1. Be in a **Validated** state

---

## Valid Observable Types
Observables come in a wide variety and it's up to your workflow to decide which observables to support. Your workflow can choose to support a single type of observable or multiple. We provide a sample workflow for each of these scenarios below. Some examples of observable types include:

```text
ip
ipv6
domain
sha256
url
email
amp_computer_guid
orbital_node_id
hostname
mac_address
file_name
file_path
```

For a full list of valid observable types, see the [vocabularies schema](https://github.com/threatgrid/ctim/blob/6053e75846044e56788f201d19e7d731193af0d3/src/ctim/schemas/vocabularies.cljc#L241) in the CTIM specification.

---

## Triggering via the Threat Response API
Response workflows can be triggered via the Threat Response API. This is useful if you want to be able to trigger a workflow from outside of SecureX. For more information about how to do this, see [this page]({{ site.baseurl }}/workflows/response/ctr-api).

---

## Sample Workflows
The following sample workflows are available in our repository's workflows folder to help you get familiar with this concept. These can be imported using the instructions [here]({{ site.baseurl }}/importing) or you can view the workflow in GitHub by clicking on it.

* [Sample - Response Workflows (Single Type)]({{ site.github.repository_url }}/tree/Main/Workflows/Sample-ResponseWorkflowsSingleType__definition_workflow_01KAD9R8KXSH52I2mwB2ubQwAuUhLuLzai0)
* [Sample - Response Workflows (Multiple Types)]({{ site.github.repository_url }}/tree/Main/Workflows/Sample-ResponseWorkflowsMultipleTypes__definition_workflow_01KADIVELFWWM6lAYVsIwoHIWVBtNej0fdF)