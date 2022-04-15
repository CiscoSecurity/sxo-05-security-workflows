---
layout: page
title: Licensing
permalink: /licensing
nav_order: 12
---

# Licensing
When you import content into Cisco SecureX orchestration, such as workflows and atomic actions, it's important to be mindful of and comply with the applicable license for that content. This page explains some of the different license sources you are likely to see depending on where content is obtained from and what your responsibilities are as a user of the platform.

Use of the SecureX platform is governed by the [Cisco End User License Agreement](https://www.cisco.com/c/en/us/about/legal/cloud-and-software/end_user_license_agreement.html) and the [SecureX Offer Description](https://www.cisco.com/c/dam/en_us/about/doing_business/legal/OfferDescriptions/cisco-securex-offer-description.pdf) unless you have a different applicable signed agreement with Cisco.

However, workflows and atomic actions you import into SecureX are governed by different license agreements. You are responsible for checking the source of what you import into SecureX and reviewing the applicable agreement. Below are a few of the common sources and licenses that may govern workflows and atomic actions for SecureX.

*Regardless of which agreement applies, it is very important that you test your workflows and atomic actions carefully in a test environment before putting them into production.*

---

## Which License Applies?
The following table gives some examples of sources for SecureX workflows and atomic. We recommend you go to the source repository to review licensing details when in doubt.

| Content Source | Applicable License |
|:---------------|:-------------------|
| The following Cisco Security Github Repositories:<br />[CiscoSecurity_Workflows]({{ site.github.repository_url }}/tree/Main/Workflows)<br />[CiscoSecurity_Atomics]({{ site.github.repository_url }}/tree/Main/Atomics)<br /><br />Note: These repositories contain workflows and atomic actions developed by Cisco as well as third party integration partners. All atomic actions and workflows sourced from this repository are governed by the MIT License. | [MIT License]({{ site.github.repository_url }}/blob/Main/LICENSE.md) |
| [Cisco DevNet](https://developer.cisco.com/) | Content in DevNet Code Exchange and Automation Exchange is typically hosted in Github. As such, you should refer to the repository you're obtaining content from for any applicable licenses. |
| Third Party | When you obtain content from third parties, it is your responsibility to know how the content is licensed. Typically, the license is available in the applicable repository. If not, you should ask the provider for the applicable license. |
