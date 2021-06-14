---
layout: page
title: Submit URL to Threat Grid
permalink: /workflows/response/submit-url-threatgrid
parent: Response Workflows
grand_parent: Workflows
---

# Submit URL to Threat Grid
<div markdown="1">
Response Workflow
{: .label }
</div>

This workflow should be triggered from a SecureX pivot menu and supports URL observables. When triggered, this workflow will submit the URL provided to Threat Grid for analysis.

---

## Requirements
* The following atomic actions must be imported before you can import this workflow:
	* TG Submit URL ([Github_Target_Atomics]({{ site.baseurl }}/default-repos))
* The [targets](#targets) listed below
* An active Threat Grid account and API key

---

## Workflow Steps
1. Check that a supported observable was provided as input
1. Submit the URL provided as the observable to Threat Grid

---

## Configuration
* You must add your Threat Grid API key to the `Threat Grid API Key` global variable

---

## Targets
Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| [ThreatGrid_Target]({{ site.baseurl }}/targets/default#threatgrid_target) | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `panacea.threatgrid.com`<br />_Path:_ None | None | Created by default |
