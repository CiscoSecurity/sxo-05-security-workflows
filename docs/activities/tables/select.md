---
layout: page
title: Select from Table
permalink: /activities/tables/select
parent: Tables
grand_parent: Activities
---

# Select from Table
_Category: Table_

This activity allows you to select rows from a table. To use this activity, you need to provide:
1. An input table to select rows from
1. Criteria for selecting rows
1. Which columns you want to select
1. How many rows to select
1. (Optional) Sorting options

In the Select section of the activity's properties, you configure all of these items. We'll cover this section in two parts. This sample shows selecting rows from a table where their `id` equals `3`. For each matching row, all columns are being selected.

![]({{ site.baseurl }}/assets/images/activities/tables/select1.png)

The next section is where we define how many rows to select and provide sorting options. In this sample, we're selecting up to 5 rows and sorting by the `id` column in ascending order:

![]({{ site.baseurl }}/assets/images/activities/tables/select2.png)

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