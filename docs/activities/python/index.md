---
layout: page
title: Execute Python Script
permalink: /activities/python/
parent: Activities
has_children: true
has_toc: false
---

# Execute Python Script
_Category: Python_

This activity allows you to run a Python script within an orchestration workflow.

---

## Modules
Since SecureX orchestration is cloud-based and containerized, the Python activity has a pre-defined set of modules available to it. You cannot add your own modules using `pip` or other package managers. To see which modules are available, you can run a workflow with the Python activity and the following script:
```python
# Output a list of available modules
help("modules")
```

After running the workflow, the `Execute Python Script` activity's output should show a list of available modules. Sample output from this command can be found [here]({{ site.baseurl }}/activities/python/modules).

---

## Script Output
A Python script can provide its output in two ways: printed to the activity's `Response Body` or through script queries.

### Response Body
If you use functions like `print()` in your script, all of the printed output will be put in the activity's `Response Body` variable. This can be useful for printing a variety of output throughout your script, but keep in mind that all of the output will be treated as a single string.

### Script Queries
If you want to extract the value of one or more of your script's variables, you can do that using script queries. These queries essentially let you extract the value of a Python variable and make it available in the activity's output. The benefit of using this approach is that you can extract multiple separate values and tell orchestration each value's data type.

---

## Sample Workflows
The following sample workflows are available in our repository's workflows folder to help you get familiar with this activity. These can be imported using the instructions [here]({{ site.baseurl }}/importing) or you can view the workflow in GitHub by clicking on it.

* [Sample - Execute Python Script]({{ site.github.repository_url }}/tree/Main/Workflows/Sample-ExecutePythonScript__definition_workflow_01K876BUQ4HEH6IFMs1eWbqeo9c4ZxlzQfH)