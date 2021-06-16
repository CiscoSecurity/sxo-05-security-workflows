---
layout: home
title: Home
nav_order: 1
---

![]({{ site.baseurl }}/assets/images/header-graphic.png)

# SecureX orchestration
SecureX orchestration provides a no-to-low code approach for building automated workflows. These workflows can interact with various types of resources and systems, whether they're from Cisco or a third-party. Our GitHub repositories contain a wide variety of [atomic actions](#atomic-actions) and [workflows](#workflows) that can be imported into SecureX orchestration.

[Get Started <i class="fa fa-arrow-right ml-1"></i>]({{ site.baseurl }}/getting-started){: .btn-cisco-sky-blue }

---

## <i class="far fa-star mr-1"></i> What's New
[SecureX orchestration remote]({{ site.baseurl }}/remote) is now available! SXO remote allows you to deploy a virtual appliance on-premise so you can use your on-premise products in orchestration workflows. The initial release of SXO remote only supports `HTTP Endpoint` [targets]({{ site.baseurl }}/targets). Support for additional target types will be added in future releases.

[Learn More]({{ site.baseurl }}/remote){: .btn-cisco-outline }

---

## Atomic Actions
Atomic actions are self-contained workflows that are similar to a function in traditional programming. They can consume input, perform various actions, and then return output. They're designed to be portable, re-usable, and make building workflows more efficient.

[Documentation]({{ site.baseurl }}/atomics/){: .btn-cisco-outline .mr-2 } [<i class="fab fa-github mr-1"></i> Available Atomics]({{ site.github.repository_url }}/tree/Main/Atomics){: .btn-cisco-outline }

---

## Workflows
Workflows are the larger component of orchestration and are similar to a script in traditional programming. A workflow can be simple and only have a few actions or be complex and string together many different actions for different products.

[Documentation]({{ site.baseurl }}/workflows/){: .btn-cisco-outline .mr-2 } [<i class="fab fa-github mr-1"></i> Available Workflows]({{ site.github.repository_url }}/tree/Main/Workflows){: .btn-cisco-outline }

---

## Activities
SecureX orchestration comes with a variety of built-in activities for core functionality. These activities handle things like date and time manipulation, JSON and XML parsing, HTTP requests, and more. This section contains helpful hints, best practices, and sample workflows for some of these activities.

[Documentation]({{ site.baseurl }}/activities/){: .btn-cisco-outline }
