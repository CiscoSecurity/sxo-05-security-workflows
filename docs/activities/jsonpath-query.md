---
layout: page
title: JSONPath Query
permalink: /activities/jsonpath-query
parent: Activities
---

# JSONPath Query
_Category: Core_

This activity allows you to easily extract information from a JSON-formatted string. Instead of having to use complicated regular expression to parse JSON, you can use a JSONPath to traverse the JSON's structure and extract the data you want. These paths can be simple (`$.user.firstName`) or complex (`$.users[?(@.firstName == 'John')].phoneNumbers[0].number`).

---

## Best Practices
* Check the `Continue Workflow Execution on Failure` box and use a [`Condition Block`]({{ site.baseurl }}/activities/condition-block) to check whether or not the path query was successful. This helps make sure your workflow fails with a useful error message and only continues if the path query succeeds.

---

## Hints
* There are more than one implementation of JSONPath. SecureX orchestration uses the Jayway implementation.

---

## Helpful Links
* [JSONPath Overview](https://restfulapi.net/json-jsonpath/)
* [JSONPath Tester](https://jsonpath.com/) (More user friendly but uses a slightly different implementation of JSONPath)
* [JSONPath Tester (Jayway)](https://jsonpath.herokuapp.com/) (Not as user friendly but uses the same implementation of JSONPath as SecureX)

---

## Sample Workflows
The following sample workflows are available in our repository's workflows folder to help you get familiar with this activity. These can be imported using the instructions [here]({{ site.baseurl }}/importing) or you can view the workflow in GitHub by clicking on it.

* [Sample - JSONPath Query]({{ site.github.repository_url }}/tree/Main/Workflows/Sample-JSONPathQuery__definition_workflow_01K8OBHXF4SW23uPTZEPHQvNLO8w8yksMxQ)
* [Sample - Parsing Nested JSON]({{ site.github.repository_url }}/tree/Main/Workflows/Sample-ParsingNestedJSON__definition_workflow_01M4SBQ0Z7ZDN6AfG3vIWGjvpX8Mrsb81sM)