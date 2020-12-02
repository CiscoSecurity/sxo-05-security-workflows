---
layout: page
title: While Loop
permalink: /activities/while-loop
parent: Activities
---

# While Loop
_Category: Logic_

While loops are one of the two types of loops available in SecureX orchestration. This type of loop will continue running as long as its control condition is true. If you want to loop through a list of objects in a table, you should look at the [`For Each Loop`]({{ site.baseurl }}/activities/foreach-loop).

---

## Hints
* You can stop a loop using the `Break` activity.
* You can skip the rest of a single iteration of a loop using the `Continue` activity.

---

## Loop Control
While loops run as long as their control condition is true. This control condition works the same as a [`Condition Block`]({{ site.baseurl }}/activities/condition-block#building-a-condition) in that it's simply checking a logical statement. You can either:
1. Set this condition to something that will always be true and use a `Break` to stop the loop; or
1. Use a loop control variable that you change the value of when you want the loop to end

**Be careful! If you forget to stop a while loop, it will keep running for quite a while before stopping... If you're iterating through a list of items, it's usually better to use a [`For Each Loop`]({{ site.baseurl }}/activities/foreach-loop)**

### Using a Loop Control Variable
1. Create a local variable using the `Boolean` data type and set its value to `true`
1. Add a `While Loop` activity and set its condition to check whether or not the local variable you created is _equal_ to `true`
1. Inside the loop, when you're ready for the loop to end, you can either set the local variable to `false` or use a `Break` activity

---

## Sample Workflows
The following sample workflows are available in our repository's workflows folder to help you get familiar with this activity. These can be imported using the instructions [here]({{ site.baseurl }}/importing) or you can view the workflow in GitHub by clicking on it.

* [Sample - While Loops]({{ site.github.repository_url }}/tree/Main/Workflows/Sample-WhileLoops__definition_workflow_01K8584C0G6O935bAwMy4rWNOJzlksaxCby)