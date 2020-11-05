---
layout: page
title: HTTP Request
permalink: /activities/http-request
parent: Activities
---

# HTTP Request
*Category: Web Service*

* Check the `Continue on HTTP Error Status Code` box and use a `Condition Block` to check the HTTP status code. This requires understanding the expected response of the API call you're making. For example, you may want to have one `Condition Branch` check that the status code is 200 (indicating a success) and have another `Condition Branch` that checks that the status code is not equal to 200 (meaning something may have gone wrong). Note that there are other 2xx status codes indicating success, so this logic will vary depending on the API.

* If sending a JSON payload in a POST or PUT, it's sometimes best to build the JSON payload in Python as opposed to directly in the `Request Body` activity input. Building JSON in the activity's input does not handle escaping, so nested quotes or other complex data can break the JSON syntax.