---
layout: page
title: Files
permalink: /activities/files/
parent: Activities
has_children: true
---

# Files
Orchestration workflows have limited file handling available. For the most part, workflows are limited to downloading files from a remote source and uploading files to a remote destination. You do not have access to the filesystem itself, nor do most other activities support files as input.

---

## Notes
* A workflow can have a `File` as an [input variable]({{ site.baseurl }}/variables/workflow#input-variables) but not as an [output variable]({{ site.baseurl }}/variables/workflow#output-variables).
* Orchestration does not have persistent storage for files. If a workflow downloads a file, it is only stored for the duration of the workflow instance and when the workflow completes it's deleted.
