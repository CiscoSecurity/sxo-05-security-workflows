---
layout: page
title: Best Practices
permalink: /atomics/best-practices
parent: Atomic Actions
nav_order: 5
---

# Best Practices
The following best practices should be followed when building an atomic action.

[<i class="fa fa-video mr-1"></i> Building an Atomic](https://www.youtube.com/watch?v=sNN6SLgeNpQ&list=PLPFIie48Myg2tu2gHbgm-moYg8LDaXsSo){: .btn-cisco-outline }

<div class="cisco-alert cisco-alert-info"><i class="fa fa-info-circle mr-1 cisco-icon-info"></i> Want to see how well your atomic action adheres to our standards? Try the new <a href="{{ site.baseurl }}/analyzer/">Workflow Analyzer</a></div>

---

## Overall
* Name the atomic `Product - Function` (ex: `Umbrella - Get Destination Lists`).
* Provide a detailed description. For example:

```text
Gets a list of destination lists for a given organization ID.

Target: HTTP endpoint for "management.api.umbrella.com"

Account Key: HTTP basic with Umbrella Management API key (client ID as username, client secret as password)

Steps:
[] Request the destination lists from Umbrella
[] Check if the API request succeeded:
[]> If it did, attempt to extract the list of records and set the output variable
[]> If it didn't, output an error

More information about this API: https://docs.umbrella.com/umbrella-api/reference#get_v1-organizations-organizationid-destinationlists
```

---

## Variables
* Give all of your variables (input, output, and local) meaningful names and descriptions. In our atomics, we typically use formal variable names like: `Variable Name`. Descriptions should include information about the variable's purpose and useful hints about possible values.
* Make input variables required if the atomic will fail to function if the variables are left blank.
* For numeric variables, provide an appropriate default value.
* Use `Secure Strings` for sensitive values such as API keys, passwords, or other credentials that should be hidden from view.
* When using date/time stamps, try to use the actual `Date Time` variable type where possible, especially for input and output variables. You can always use the `Format Date` and `Parse Date` activities to convert to/from strings.
* We generally recommend avoiding `Tables` for atomic action input and output. Creating custom table types is messy and tables don't always scale well. It's better to simply return and consume JSON.

**A Note on Global Variables**

It's best not to use a global variable within an atomic. If you want to use a global variable inside an atomic, pass it through an input variable from the workflow calling the atomic action and then use the input variable within the atomic. Be sure to use the same data type for the input variable as the global variable and mark it required if the atomic will fail without it.

---

## Targets
* All atomics should have their target set to `Specify Target On Workflow Start`.
* When creating additional atomics for a product (as in, a product that we already have atomics for), they must be compatible with the targets used by the existing atomics. For example: if the existing atomics expect the target to have a path of `api/`, the new atomics should do the same.

---

## Account Keys
* All atomics should have their account key set to `Use Target's Default Account Keys`.

---

## Activities
* Give all of your activities (including logic components) meaningful display names.
* More information about specific activities can be found in [this section]({{ site.baseurl }}/activities/).