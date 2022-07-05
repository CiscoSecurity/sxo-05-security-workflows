---
layout: page
title: Frequently Asked Questions
permalink: /faqs
nav_order: 10
---

# Frequently Asked Questions
{: .no_toc }
This page contains a list of frequently asked questions about SecureX orchestration. FAQs for the broader SecureX platform can be found [here](http://cs.co/SecureX_faq).

- TOC
{:toc}

---

### Q: Where is SecureX orchestration hosted?
**A**: As with most of SecureX, orchestration is hosted in Amazon Web Services (AWS). The AWS region depends on which instance of SecureX you're using. For more information about AWS regions and SecureX privacy, please visit the [Cisco Trust Center](https://trustportal.cisco.com#/1592946938366835).

### Q: Do you provide a list of source IPs/hostnames for orchestration nodes?
**A**: Please see the following table for the source IPs used by SecureX orchestration:

| Region | Source IPs |
|:-------|:-----------|
| Asia Pacific (APJC) | 18.181.14.110<br />13.230.182.244<br />35.72.117.19 |
| Europe (EU) | 52.48.136.126<br />63.33.97.243<br />3.251.20.134 |
| North America (NAM) | 54.166.136.151<br />18.213.248.192<br />54.211.175.37 |

### Q: How do I connect to on-premises devices?
**A**: You can use the SecureX orchestration remote to integrate on-premises resources into your workflows. Check out [this page]({{ site.baseurl }}/remote/) for more information.

### Q: What Python modules are available?
**A**: See the [Python Modules]({{ site.baseurl }}/activities/python/modules) page.

### Q: Can I install custom Python modules?
**A**: No. Python scripts in SecureX orchestration run inside a container that can't be customized.

### Q: How do I make a workflow appear in Threat Response/SecureX ribbon/product pivot menus?
**A**: See the [Response Workflows]({{ site.baseurl }}/workflows/response/) page.

### Q: How long are workflow execution logs kept?
**A**: Workflow execution logs, also known as runs, are kept for 90 days. Note that we only keep a workflow run's full details for 30 days. After 30 days, only a summary of the workflow's execution will be available.

### Q: Does SecureX orchestration have an API?
**A**: No, SecureX orchestration does not have a publicly available API. However, if you want to run a workflow from an external system you can do so in one of two ways. The first is to use the SecureX [response API](https://visibility.amp.cisco.com/iroh/iroh-response/) to trigger a [response]({{ site.baseurl }}/workflows/response) workflow. The second is to use a [webhook]({{ site.baseurl }}/webhooks).
