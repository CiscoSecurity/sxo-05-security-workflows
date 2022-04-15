---
layout: page
title: Custom Table Types
permalink: /variables/custom-types
parent: Variables
---

# Custom Table Types
If you want to be able to use a table as a global, input, output, or local variable you need to create a variable type. Variable types are custom tables that are similar to an Excel spreadsheet. You define the columns you want the table to have and then you can add/remove/update rows.

---

## Creating a Table Type
Variable types are managed under the **Variable Types** tab of the **Variables** section. If you have any existing custom table types, they'll be listed there. To create a new one, click the **New Variable Type** button.

When creating a custom table, you'll need to provide a display name and then define your columns. Each column has various attributes:
* Required - Whether or not the field is required.
* Field Name - The name of the field when used as a variable.
* Field Title - A human-readable field name.
* Field Type - The [data type]({{ site.baseurl }}/variables/types) of the field.
* Max Length - The maximum length for values in this field (for strings).
* Minimum - The minimum value (for numeric data types).
* Maximum - The maximum value (for numeric data types).

Here's an example of a table called **My Endpoint Table** meant to contain a list of endpoints and whether or not they're active:

![]({{ site.baseurl }}/assets/images/variables/custom/table.png)

The columns in this table include:
* `ip_address` - The endpoints IP address as a string no longer than 15 characters.
* `hostname` - The endpoint's hostname as a string.
* `is_active` - Whether or not the endpoint is active as a boolean (true/false).

---

## Creating a Global Variable
Using a custom table type is more or less the same as any other variable type. You select your custom type as the **Data Type** and then provide a display name. However, when using a table type as a global variable, you have to provide at least one row to create the variable.

Here's what it looks like creating a global variable using a custom table type with one row in it:

![]({{ site.baseurl }}/assets/images/variables/custom/creating-global.png)

---

## Creating a Workflow Variable
Using a custom table type within a workflow is the same as any other variable type. You select your custom type as the **Data Type** and then provide a display name and scope. You can add default rows if you want, but it's not required.

Here's what it looks like creating a local variable within a workflow using a custom table type with no rows in it:

![]({{ site.baseurl }}/assets/images/variables/custom/creating-workflow.png)

---

## Usage
Custom table types behave the same as any other table when used within a workflow. For more information about using tables, check out the [Tables]({{ site.baseurl }}/activities/tables) section.

[More Information]({{ site.baseurl }}/activities/tables){: .btn-cisco-sky-blue }
