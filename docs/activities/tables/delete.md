---
layout: page
title: Delete from Table
permalink: /activities/tables/delete
parent: Tables
grand_parent: Activities
---

# Delete from Table
_Category: Table_

This activity allows you to delete rows from a table. To use this activity, you need to provide:
1. An input table to delete rows from
1. Criteria for selecting rows to delete

You can either select to delete all of the rows in the table or provide criteria in the **Where Clause**. This sample shows a clause that will only delete rows where the `id` is equal to a `1`:

![]({{ site.baseurl }}/assets/images/activities/tables/delete.png)

---

## Writing a Where Clause
See the [Where Clauses]({{ site.baseurl }}/activities/tables/where-clause) page.

---

## Hints
* If this activity isn't letting you select the table you want, check that the activity creating the table has `Persist Table` checked on its properties.

---

## Sample Workflows
The following sample workflows are available in our repository's workflows folder to help you get familiar with this activity. These can be imported using the instructions [here]({{ site.baseurl }}/importing) or you can view the workflow in GitHub by clicking on it.

* [Sample - Tables]({{ site.github.repository_url }}/tree/Main/Workflows/Sample-Tables__definition_workflow_01KAF12W7PURP5AFHC28xRgNxpLr0qgVJjY)