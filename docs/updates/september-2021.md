---
layout: page
title: Upcoming Maintenance
permalink: /updates/september-2021
redirect_from:
  - /updates/august-2021
  - /updates/database-migration
nav_order: 12
---

# Upcoming Maintenance
As part of our ongoing commitment to enhancing the SecureX platform, SecureX orchestration will undergo scheduled maintenance to improve performance and scalability. The maintenance will occur on the following staggered schedule:

<div class="cisco-alert cisco-alert-info"><i class="fa fa-info-circle mr-1 cisco-icon-info"></i> The schedule for this maintenance has been changed. Please see the new dates in the table below.</div>

| Region | Date | Start and End Time | Window Length |
|:-------|:-----|:-------------------|:--------------|
| Asia Pacific (APJC) | Saturday, September 11, 2021 | 5:00 AM - 10:00 AM SGT | 5 Hours |
| EMEAR (EU) | Saturday, September 18, 2021 | 9:00 PM - 2:00 AM CEST | 5 Hours |
| US and LATAM (US) | Saturday, September 25, 2021 | 5:00 PM - 11:30 PM EDT | 6.5 Hours |

*Please note that dates and times are subject to change*

As part of the maintenance, Cisco is also implementing the following changes to how orchestration content is managed:
* Workflow execution logs (also known as “Runs”) will only be retained for 90 days going forward. We will migrate 90 days of workflow runs during the maintenance window and then keep a rolling 90-day history of runs going forward.
* Atomic Actions for Cisco products will become “system objects.” This means that all tenants will have these atomic actions available by default without having to import them. Atomics for third-party products will continue to be published in our public GitHub repository for you to import as needed.

---

## Frequently Asked Questions

### When will the maintenance window take place?
Please see the table above. Dates and times are subject to change.
### How long will orchestration be unavailable?
The amount of time SecureX orchestration will be unavailable will vary by region. Please see the table above for more details.
### What behavior can I expect during the maintenance window?
During the maintenance window, SecureX orchestration will be unavailable intermittently. Attempting to access orchestration during this period may result in a splash page that will inform you that maintenance is still in progress. While the maintenance is in progress, orchestration workflows may not execute. This includes scheduled workflows and workflows triggered by external events such as emails.

---

## Looking for support?
If you have any questions about this maintenance or require additional support, please contact [Cisco TAC](https://support.cisco.com/).

Thank you for using SecureX and for being a Cisco customer!