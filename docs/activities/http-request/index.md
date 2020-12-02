---
layout: page
title: HTTP Request
permalink: /activities/http-request
parent: Activities
has_children: true
has_toc: false
---

# HTTP Request
_Category: Web Service_

This activity allows you to make HTTP requests to a target and is highly customizable. You can select what HTTP method to use, define your own headers, provide a payload to send, and more. After the activity completes, it'll provide you information about the request such as the HTTP status code and the response received.

---

## Best Practices
* Check the `Continue on HTTP Error Status Code` box and use a [`Condition Block`]({{ site.baseurl }}/activities/condition-block) to check the HTTP status code. This requires understanding the expected response of the API call you're making. For example, you may want to have one `Condition Branch` check that the status code is 200 (indicating a success) and have another `Condition Branch` that checks that the status code is not equal to 200 (meaning something may have gone wrong). Note that there are other 2xx status codes indicating success, so this logic will vary depending on the API.

---

## Hints
* If sending a JSON payload in a `POST` or `PUT`, it's sometimes best to build the JSON payload in Python as opposed to directly in the `Request Body` activity input. Building JSON in the activity's input does not handle escaping, so nested quotes or other complex data can break the JSON syntax.

---

## Sample Workflows
The following sample workflows are available in our repository's workflows folder to help you get familiar with this activity. These can be imported using the instructions [here]({{ site.baseurl }}/importing) or you can view the workflow in GitHub by clicking on it.

* [Sample - HTTP Requests]({{ site.github.repository_url }}/tree/Main/Workflows/Sample-HTTPRequests__definition_workflow_01K8OUE30UIFT3L8Ugle9RMwhs5kIutlfUr)
* [Sample - HTTP Requests - Bearer Token]({{ site.github.repository_url }}/tree/Main/Workflows/Sample-HTTPRequests-BearerToken__definition_workflow_01KKTCSNCPMF56KPE3vS4dM3rG2bwHEqBQP)