---
layout: page
title: XPath Query
permalink: /activities/xpath-query
parent: Activities
---

# XPath Query
_Category: Core_

This activity allows you to easily extract information from an XML-formatted string. Instead of having to use complicated regular expression to parse XML, you can use an XPath to traverse the XML's structure and extract the data you want. These paths can be simple (`/root/someProperty`) or complex (`/root/row[username = 'ehowell']/email`).

---

## Hints
* Some XML contains namespaces to help describe the content. The `XPath Query` activity can be configured to understand namespaces by adding them under the `Namespaces` section of its properties.

---

## Helpful Links
* [XPath Syntax](https://www.w3schools.com/xml/xpath_syntax.asp)
* [XPath Examples](https://www.w3schools.com/xml/xpath_examples.asp)
* [XPath Tester](https://codebeautify.org/Xpath-Tester)

---

## Sample Workflows
The following sample workflows are available in our repository's workflows folder to help you get familiar with this activity. These can be imported using the instructions [here]({{ site.baseurl }}/importing) or you can view the workflow in GitHub by clicking on it.

* [Sample - XPath Query]({{ site.github.repository_url }}/tree/Main/Workflows/Sample-XPathQuery__definition_workflow_01KANETY9D6814jzM6ZVKRaOJYo0BYULQG3)