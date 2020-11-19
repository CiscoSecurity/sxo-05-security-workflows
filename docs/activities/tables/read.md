---
layout: page
title: Read Table from JSON/Text/XML
permalink: /activities/tables/read
parent: Tables
grand_parent: Activities
---

# Read Table from JSON/Text/XML
_Category: Table_

If you want to parse data from an API so that you can iterate over multiple objects, you'll want to use one of the `Read Table from ...` activities. These activities allow you to convert JSON, XML, or delimited text into tables. Once you've created a table, you can use a [`For Each`]({{ site.baseurl }}/activities/foreach-loop) loop to iterate over its rows. You can also use these activities to [create an empty table](#creating-an-empty-table) to add data to.

---

## Notes
* Each of these activities has an option to populate column headers from their source data. We don't recommend using this option because the columns will only be populated at run time (since the workflow doesn't know what the source data will be until it runs). If you choose to populate headers automatically, you won't be able to use the columns when creating a [`For Each`]({{ site.baseurl }}/activities/foreach-loop) loop. You should always explicitly define your columns by clicking `Add` under the `Columns to Read` properties section and adding each column.
* Each of these activities has an option to `Persist Table`. If you want to be able to make changes to the table that's created, you need to persist it. Otherwise, you'll only be able to read from the table.

---

## Read Table from Text
This activity allows you to create a table from plain, delimited text such as comma-separated values. Here's a sample of some text you could read into a table using this activity:

```text
id,name,username,email
1,Leanne Graham,lgraham,leanne@company.com
2,Ervin Howell,ehowell,ervin@company.com
3,Clementine Bauch,wrongusername,clementine@company.com
4,Patricia Lebsack,plebsack,patricia@company.com
```

_Be sure to read the notes at the top of this page as they apply to each of these activities!_

---

## Read Table from JSON
This activity allows you to create a table from a list of JSON-formatted objects. To tell the activity which objects to select, you need to provide a JSON path (see the [`JSONPath Query`]({{ site.baseurl }}/activities/jsonpath-query) activity's documentation for more information about JSON Path). A JSON path to select all objects in the sample data below would be: `$.`

```json
[
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "lgraham",
    "email": "leanne@company.com"
  },
  {
    "id": 2,
    "name": "Ervin Howell",
    "username": "ehowell",
    "email": "ervin@company.com"
  },
  ...
]
```

_Be sure to read the notes at the top of this page as they apply to each of these activities!_

---

## Read Table from XML
This activity allows you to create a table from a list of XML-formatted objects. To tell the activity which objects to select, you need to provide an XML path (see the [`XPath Query`]({{ site.baseurl }}/activities/xpath-query) activity's documentation for more information about XML path). An XML path to select all objects in the sample data below would be: `/root/row`

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<root>
  <row>
    <id>1</id>
    <name>Leanne Graham</name>
    <username>lgraham</username>
    <email>leanne@company.com</email>
  </row>
  <row>
    <id>2</id>
    <name>Ervin Howell</name>
    <username>ehowell</username>
    <email>ervin@company.com</email>
  </row>
  ...
</root>
```

_Be sure to read the notes at the top of this page as they apply to each of these activities!_

---

## Creating an Empty Table
A simple trick to creating an empty table is to use the `Read Table from JSON` activity with an empty list as the source data:

```json
[]
```

---

## Sample Workflows
The following sample workflows are available in our repository's workflows folder to help you get familiar with these activities. These can be imported using the instructions [here]({{ site.baseurl }}/importing) or you can view the workflow in GitHub by clicking on it.

* [Sample - Tables]({{ site.github.repository_url }}/tree/Main/Workflows/Sample-Tables__definition_workflow_01KAF12W7PURP5AFHC28xRgNxpLr0qgVJjY)