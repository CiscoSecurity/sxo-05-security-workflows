---
layout: page
title: Where Clauses
permalink: /activities/tables/where-clause
parent: Tables
grand_parent: Activities
---

# Where Clauses
_Category: Table_

When you want to select, update, or delete rows in a table, you can provide a where clause to limit the rows affected.

Here are a few samples:

| Sample | Description |
|:-------|:------------|
| `id == [$variable$]` | Where the row's ID equals the variable provided |
| `username == "[$variable$]"` | Where the row's username equals the variable provided |
| `firstName == "[$variable1$]" AND lastName == "[$variable2$]"` | Where the row's first name and last name match the variables provided |
| `timestamp > [$variable$]` | Where the row's timestamp is greater than the variable provided |

---

## Sample Workflows
The following sample workflows are available in our repository's workflows folder to help you get familiar with this concept. These can be imported using the instructions [here]({{ site.baseurl }}/importing) or you can view the workflow in GitHub by clicking on it.

* [Sample - Tables]({{ site.github.repository_url }}/tree/Main/Workflows/Sample-Tables__definition_workflow_01KAF12W7PURP5AFHC28xRgNxpLr0qgVJjY)