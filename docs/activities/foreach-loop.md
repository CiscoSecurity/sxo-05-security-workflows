---
layout: page
title: For Each Loop
permalink: /activities/foreach-loop
parent: Activities
---

# For Each Loop
_Category: Logic_

For each loops are one of the two types of loops available in SecureX orchestration. This type of loop consumes an array of data and runs the content of the loop once for each item in the array. If you want to loop for an arbitrary number of times or while a condition is true, you should look at the [`While Loop`]({{ site.baseurl }}/activities/while-loop).

---

## Hints
* You can stop a loop using the `Break` activity.
* You can skip the rest of a single iteration of a loop using the `Continue` activity.

---

## Source Data
The source data for a `For Each Loop` must be an array. These often come from activities like [`Read Table from JSON/Text/XML`]({{ site.baseurl }}/activities/tables/read) or `Split String`. To give a `For Each Loop` its source, you simply pick the array variable:

![]({{ site.baseurl }}/assets/images/activities/foreach-loop/source-array.png)

---

## Column Variables
Within the `For Each Loop`, you'll probably want to use the values in your table's columns. You can do this by using the variable browser to:
1. Select the loop
1. Select its `Source Array`
1. Select `Items`
1. Select the column you want

Here's a sample of the source array's `name` column being used as a variable:

![]({{ site.baseurl }}/assets/images/activities/foreach-loop/column-variables.png)

---

## Sample Workflows
The following sample workflows are available in our repository's workflows folder to help you get familiar with this activity. These can be imported using the instructions [here]({{ site.baseurl }}/importing) or you can view the workflow in GitHub by clicking on it.

* [Sample - For Each Loops]({{ site.github.repository_url }}/tree/Main/Workflows/Sample-ForEachLoop__definition_workflow_01KANSOLF1JJE7HlmFljhTIQYU9iXtdpl9E)