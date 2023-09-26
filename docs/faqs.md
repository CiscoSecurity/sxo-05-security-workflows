---
layout: page
title: Frequently Asked Questions
permalink: /faqs
nav_order: 10
---

# Frequently Asked Questions
{: .no_toc }
This page contains a list of frequently asked questions about SecureX orchestration.

- TOC
{:toc}

---

### Q: Where is SecureX orchestration hosted?
**A**: As with most of SecureX, orchestration is hosted in Amazon Web Services (AWS). The AWS region depends on which instance of SecureX you're using. For more information about AWS regions and SecureX privacy, please visit the [Cisco Trust Center](https://trustportal.cisco.com).

### Q: Do you provide a list of source IPs/hostnames for orchestration nodes?
**A**: Please see the [in-product help](https://docs.securex.security.cisco.com/Orchestration-Help/Content/faqs.html).

### Q: How do I connect to on-premises devices?
**A**: You can use the SecureX orchestration remote to integrate on-premises resources into your workflows. Check out [this page]({{ site.baseurl }}/remote/) for more information.

### Q: What Python modules are available?
**A**: See the [Python Modules]({{ site.baseurl }}/activities/python/modules) page.

### Q: Can I install custom Python modules?
**A**: No. Python scripts in SecureX orchestration run inside a container that can't be customized.

### Q: How do I make a workflow appear in pivot menus?
**A**: See the [Response Workflows]({{ site.baseurl }}/workflows/response/) page.

### Q: How long are workflow execution logs kept?
**A**: Workflow execution logs, also known as runs, are kept for 90 days. Note that we only keep a workflow run's full details for 30 days. After 30 days, only a summary of the workflow's execution will be available.
