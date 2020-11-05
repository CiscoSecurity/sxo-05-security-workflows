---
layout: page
title: Execute Python Script
permalink: /activities/python/
parent: Activities
has_children: true
has_toc: false
---

# Execute Python Script
*Category: Python*

Since SecureX orchestration is cloud-based and containerized, the Python activity has a pre-defined set of modules available to it. You cannot add your own modules using `pip` or other package managers. To see which modules are available, you can run a workflow with the Python activity and the following script:
```python
# Output a list of available modules
help("modules")
```

After running the workflow, the `Execute Python Script` activity's output should show a list of available modules. Sample output from this command can be found [here]({{ site.baseurl }}/activities/python/modules).