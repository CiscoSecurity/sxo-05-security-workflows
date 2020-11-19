---
layout: page
title: Update Row in Table
permalink: /activities/tables/update
parent: Tables
grand_parent: Activities
---

# Update Row in Table
_Category: Table_

This activity allows you to update existing rows in a table. To use this activity, you need to provide:
1. An input table to make updates to
1. The columns you want to update
1. The new values for those columns
1. Criteria for selecting rows to update

In the Table section of the activity's properties, you configure the first three of these items. This sample shows how to update the `username` column with a new value of `cbauch`:

![]({{ site.baseurl }}/assets/images/activities/tables/update1.png)

In the Select section, you configure the criteria for selecting rows. You can either select to update all of the rows in the table or provide criteria in the where clause. This sample shows a clause that will only update rows where the `id` is equal to a variable:

![]({{ site.baseurl }}/assets/images/activities/tables/update2.png)

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