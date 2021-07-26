---
layout: page
title: Database Migration (August 2021)
permalink: /updates/database-migration
nav_order: 36
---

# Database Migration (August 2021)
As part of our ongoing commitment to enhancing the SecureX platform, SecureX orchestration will undergo a scheduled maintenance window to perform a database migration that will improve performance and scalability. The migration will occur on the following staggered schedule:

| Region | Date | Start and End Time | Window Length |
|:-------|:-----|:-------------------|:--------------|
| Asia Pacific (APJC) | Saturday, August 14, 2021 | 5:00 AM - 10:00 AM SGT | 5 Hours |
| EMEAR (EU) | Saturday, August 21, 2021 | 9:00 PM - 2:00 AM CEST | 5 Hours |
| US and LATAM (US) | Saturday, August 28, 2021 | 5:00 PM - 11:30 PM EDT | 6.5 Hours |

*Please note that dates and times are subject to change*

During the migration to the new database infrastructure, Cisco is also implementing the following changes to how orchestration content is managed:
* Workflow execution logs (also known as “Runs”) will only be retained for 90 days going forward. We will migrate 90 days of workflow runs during the maintenance window and then keep a rolling 90-day history of runs going forward.
* Atomic Actions for Cisco products will become “system objects.” This means that all tenants will have these atomic actions available by default without having to import them. Atomics for third-party products will continue to be published in our public GitHub repository for you to import as needed.

## Frequently Asked Questions

### When will the maintenance window take place?
Please see the table above. Dates and times are subject to change.
### How long will orchestration be unavailable?
The amount of time SecureX orchestration will be unavailable will vary by region. Please see the table above for more details.
### What behavior can I expect during the maintenance window?
During the maintenance window, SecureX orchestration will be unavailable intermittently. Attempting to access orchestration during this period may result in a splash page that will inform you that migration is still in progress. While the migration is in progress, orchestration workflows may not execute. This includes scheduled workflows and workflows triggered by external events such as emails.

## Looking for support?
If you have any questions about this migration or require additional support, please contact Cisco TAC.

Thank you for using SecureX and for being a Cisco customer!