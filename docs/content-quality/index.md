---
layout: page
title: Content Quality
permalink: /content-quality/
has_children: true
nav_order: 8
---

# Content Quality
Cisco-developed content for this repository follows strict standards for assessing both technical capability and use case quality. In addition to running successfully, a workflow or atomic action must: be relatively easy to understand, have consistent and meaningful error handling, and accomplish a well-defined outcome.

One of the many benefits of SecureX orchestration is that anyone can customize a workflow to accommodate their specifc needs. Therefore, workflows should be written with flexibility and ease of use by others in mind. For example: use variables wherever feasible to allow for customization. Error handling is one of the most important aspects of designing a workflow. Others using your workflow may run into problems and should receive clear error messages to guide them to the issue. In addition, if a worklflow fails to accomplish its objective, it should fail so that it is obvious that the intended action was not completed. More examples can be found in our best practices for [atomic actions]({{ site.baseurl }}/content-quality/atomic-best-practices) and [workflows]({{ site.baseurl }}/content-quality/workflow-best-practices).

Finally, workflows should have a clear, specific objective and accomplish that objective within well-defined requirements. While the goal of SOAR is to automate as much as possible, workflows should focus only on a specific task and work inside those task requirements. For example: if a workflow requires approval via Webex before accomplishing a task, it should fail if no approval is given instead of proceeding after a timeout.

The purpose of this section is to:
1. Enable transparency so customers and partners can see how Cisco develops and tests content; and
1. Document Cisco's standards and best practices for others who want to develop their own content.
