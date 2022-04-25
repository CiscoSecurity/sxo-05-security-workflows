---
layout: page
title: Documentation Template
permalink: /content-quality/documentation-template
parent: Content Quality
---

# Documentation Template
When developing workflows meant to be published in this repository, please use the following documentation template. Note that documentation is only published for workflows, not for atomic actions. If you're unsure about how to complete a section of the template, have a look at the raw documentation for one of our [existing workflows]({{ site.github.repository_url }}/tree/Main/docs/workflows).

```markdown
---
layout: page
title: WORKFLOW NAME
permalink: /workflows/PRODUCT-NAME/0xxx-WORKFLOW-NAME
redirect_from:
  - /workflows/0xxx
parent: PRODUCT NAME
grand_parent: Workflows
---

# WORKFLOW NAME
<div markdown="1">
Workflow #0xxx
{: .label }
</div>

DESCRIPTION OF THE WORKFLOW AND WHAT IT DOES

---

## Change Log

| Date | Notes |
|:-----|:------|
| Month Day, Year | - Initial release |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* NAME OF ATOMIC (ex: Secure Endpoint - Get Events)
* The following atomic actions must be imported before you can import this workflow:
	* NAME OF ATOMIC (ex: ServiceNow - Create Incident)
* The [targets](#targets) and [account keys](#account-keys) listed at the bottom of the page
* NAME OF REQUIRED PRODUCT
* NAME OF REQUIRED PRODUCT

---

## Workflow Steps
1. Steps
1. The Workflow:
	* Follows
	* During Execution

---

## Configuration
* Set the `VARIABLE NAME` local variable to DESCRIPTION OF THE VALUE
* Update the `NAME OF ACTIVITY` activity with the DESCRIPTION OF VALUE TO CHANGE/UPDATE

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| NAME OF TARGET | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `something.somewhere.com`<br />_Path:_ `/v1` | NAME OF ACCOUNT KEY (if applicable) | |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| NAME OF ACCOUNT KEY | HTTP Basic Authentication | _Username:_ Client ID<br />_Password:_ Client Secret | |
```
