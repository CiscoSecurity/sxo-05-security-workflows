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

While adhering to the guidelines in this section is not required for you to be successful with SecureX Orchestration, it is required if you wish to submit your content for publishing in this repository. Information about contributing to this repository can be found [here]({{ site.baseurl }}/contributing).

---

## Our Process
Content being developed for publishing to this repository goes through these steps:
1. The content is created by the author following our best practices and guidelines.
1. The author submits the content to our SecureX ecosystem manager for review via [GitHub]({{ site.github.repository_url }}/issues/new?label=suggestion).
1. The content goes through one or more quality control checks to make sure:
	* Best practices and guidelines are followed.
	* There is an easily understood outcome.
	* Documentation is complete and clearly describes the success criteria for the use case (required products, dependencies, configuration steps, and so on). See our [documentation template]({{ site.baseurl }}/content-quality/documentation-template).
1. If all checks pass, the content is queued for publishing. If the review team finds issues or room for improvement, the content is returned to the author with notes and the cycle continues. Note that the content author is responsible for correcting any issues uncovered by the review team.

---

## Workflow Analyzer
Want an easy way to check if your content meets our requirements? Check out our [workflow analyzer]({{ site.baseurl }}/analyzer). The analyzer will check for **most** of our best practices and give you guidance on how to resolve potential issues. Keep in mind this is strictly a technical assessment and does not verify that the workflow will actually accomplish what it's intended to.
