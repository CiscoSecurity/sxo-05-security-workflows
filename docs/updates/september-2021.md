---
layout: page
title: September 2021 Maintenance
permalink: /updates/september-2021
redirect_from:
  - /updates/august-2021
  - /updates/database-migration
parent: Frequently Asked Questions
---

# September 2021 Maintenance
SecureX orchestration underwent scheduled maintenance in September 2021 to improve performance and scalability. The following table shows when this maintenance was performed by region:

| Region | Date | Start and End Time | Window Length |
|:-------|:-----|:-------------------|:--------------|
| Asia Pacific (APJC) | Saturday, September 11, 2021 | 11:00 PM - 4:00 AM SGT | 5 Hours |
| EMEAR (EU) | Saturday, September 18, 2021 | 9:00 PM - 2:00 AM CEST | 5 Hours |
| US and LATAM (US) | Saturday, September 25, 2021 | 5:00 PM - 11:30 PM EDT | 6.5 Hours |

As part of this maintenance, Cisco also implemented the following changes to how orchestration content is managed:
* Workflow execution logs (also known as “Runs”) are only retained for 90 days. We migrated 90 days of workflow runs for you and will keep a rolling 90-day history of runs going forward.
* Atomic Actions for Cisco products are now “[system objects]({{ site.baseurl }}/atomics/system).” This means that all orchestration tenants have these atomic actions available by default without having to import them. Atomics for third-party products will continue to be published in our public GitHub repository for you to import as needed.

<div class="cisco-alert cisco-alert-danger">
	<i class="fa fa-exclamation-circle mr-1 cisco-icon-danger"></i> If you have any <a href="../remote">SecureX orchestration remotes</a>, they will need to be replaced after your region's maintenance window due to a certificate change. Even though the remotes may show as connected, they will not function properly. For more information about deploying a new remote, please see <a href="../remote">this page</a>
</div>

---

## Looking for support?
If you have any questions about this maintenance or require additional support, please contact [Cisco TAC](https://support.cisco.com/).

Thank you for using SecureX and for being a Cisco customer!