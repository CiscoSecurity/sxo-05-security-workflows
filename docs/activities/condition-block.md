---
layout: page
title: Condition Block
permalink: /activities/condition-block
parent: Activities
---

# Condition Block
_Category: Logic_

Condition blocks allow you to have your workflow follow a different path based on a series of one or more conditions. These are the same as a traditional "if...then...else" type statements in scripting.

![]({{ site.baseurl }}/assets/images/activities/condition-block/sample.png)

---

## Hints
* Terminology: A condition block is an activity that contains one or more condition branches.
* Condition blocks can have one or more branches. A single branch is useful for checking a condition and, if it's true, ending a workflow.
* Branches are evaluated from left to right. Only the first branch with a `true` condition will be executed.
* You're not required to have a branch that accounts for every scenario. If none of the branches have a `true` condition, none of them will be executed and the workflow will continue past the condition block.

---

## Building a Condition
Condition branches are only executed if their condition is `true`. As with any standard conditional, these conditions have a left operand, operator, and right operand. Essentially, the item on the left is compared to the item on the right using the operator chosen. This is what it looks like:

![]({{ site.baseurl }}/assets/images/activities/condition-block/condition.png)

The left operand must always be a variable. The right operand can be another variable or can be a value you type in yourself (depending on the data type of the variable being used).

### Operators
The operators available within a condition vary depending on the type of values being compared. Here's a summary of what's available by data type:

| Data Type | Operators |
|:----------|:----------|
| Boolean | Equals, Not equals |
| Date Time | After, Before, Equals, No earlier than, No later than, Not equals |
| Decimal | Equals, Greater than, Greater than equals, Less than, Less than equals, Not equals |
| Integer | Equals, Greater than, Greater than equals, Less than, Less than equals, Not equals |
| Secure String | Can't be used with a condition block |
| String | Does not match wildcard, Equals, Equals (Case InSensitive), Matches Regular Expression, Matches wildcard, Not equals |

### Combining Conditions
When building conditions, you can combine multiple together using `AND` or `OR`. Note that you can't easily mix the two since order of operations gets complicated. To add another condition to an existing one, simply click **Add Condition** below your existing condition and select whether you want it to be an `AND` or an `OR`. Then, you can provide the next condition and orchestration will assemble the logic when they're evaluated.

---

## Building an "Else"
There's no "else" branch in orchestration. To have a branch function as an else, you need to either set its condition to the opposite of the other branches (explicit) OR to something that's always true (implicit).

### Explicit Else
An explicit else means that you make a condition branch whose condition is the opposite of all of the other branches combined. For example, if one branch checks for `variable EQUALS value-a` and another branch checks for `variable EQUALS value-b`, your else branch's condition would be `variable NOT EQUALS value-a AND variable NOT EQUALS value-b`:

![]({{ site.baseurl }}/assets/images/activities/condition-block/explicit-else.png)

Depending on how many branches you have and how complex the conditions are, this can get complicated. Usually an implicit else is more efficient.

### Implicit Else
An implicit else basically means creating a branch that's executed by default because its condition is always true. If you make a branch with a condition like this last (as in, the right-most branch within the condition block), it'll always be executed if none of the other branch conditions are met. The easiest way to build a condition that's always true is to check if the workflow's instance ID is equal to itself:

![]({{ site.baseurl }}/assets/images/activities/condition-block/implicit-else.png)

---

## Sample Workflows
The following sample workflows are available in our repository's workflows folder to help you get familiar with this activity. These can be imported using the instructions [here]({{ site.baseurl }}/importing) or you can view the workflow in GitHub by clicking on it.

* [Sample - Condition Block]({{ site.github.repository_url }}/tree/Main/Workflows/Sample-ConditionBlock__definition_workflow_01KLKB69FILY13x9a7AsWOnew9jRmOLMM8A/definition_workflow_01KLKB69FILY13x9a7AsWOnew9jRmOLMM8A.json)