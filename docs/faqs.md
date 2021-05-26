---
layout: page
title: Frequently Asked Questions
permalink: /faqs
nav_order: 10
---

# Frequently Asked Questions
{: .no_toc }
This page contains a list of frequently asked questions about SecureX Orchestration. FAQs for the broader SecureX platform can be found [here](http://cs.co/SecureX_faq).

- TOC
{:toc}

---

### Q: Where is SecureX Orchestration hosted?
**A**: The orchestration components of SecureX are hosted in Amazon Web Services. The AWS region depends on which instance of SecureX you're using. For more information about AWS regions and SecureX privacy, please visit the [Cisco Trust Center](https://trustportal.cisco.com#/1592946938366835)

### Q: Do you provide a list of source IPs/hostnames for orchestration nodes?
**A**: No, we don't. Since orchestration is in AWS, we can't quantify the ever-changing IP assignments of the orchestration nodes.

### Q: How do I connect to on-premise devices?
**A**: You can use the SecureX Orchestration Remote to integrate on-premise resources into your workflows. Check out [this page]({{ site.baseurl }}/remote) for more information.

### Q: What Python modules are available?
**A**: See the [Python Modules]({{ site.baseurl }}/activities/python/modules) page.

### Q: Can I install custom Python modules?
**A**: No. Python scripts in SecureX Orchestration run inside a container that can't be customized.

### Q: How do I make a workflow appear in Threat Response/SecureX ribbon/product pivot menus?
**A**: See the [Response Workflows]({{ site.baseurl }}/workflows/response/) page.