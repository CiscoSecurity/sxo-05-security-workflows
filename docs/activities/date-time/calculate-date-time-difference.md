---
layout: page
title: Calculate Date Time Difference
permalink: /activities/date-time/calculate-date-time-difference
parent: Date and Time
grand_parent: Activities
---

# Calculate Date Time Difference
This activity calculates the difference between two `Date Times`. It returns two sets of variables: one set represents the difference between the two dates and the other represents the total amount of time between the two in various units of time.

---

## Usage
This activity expects two inputs. The first is the `Original Datetime` that we'll subtract another date from. You can provide this date as a string (in a [supported format](#supported-date-formats)) or from a `Date Time` variable.

The second input is the date to subtract from the original. You can provide `Subtract Datetime` as a string (in a [supported format](#supported-date-formats)) or from a `Date Time` variable.

### Example
If `Original Datetime` is `2020-12-02T10:00:00Z` and `Subtract Datetime` is `2020-12-01T10:00:00+00:00`, we get the sample outputs below:

These variables represent the difference between the two datetimes. Note that these added together will equal the total amount of time between the two inputs:

| Variable Name | Sample Output |
|:--------------|:--------------|
| Days | 1 |
| Hours | 0 |
| Minutes | 0 |
| Seconds | 0 |
| Milliseconds | 0 |

These variables each represent the total amount of time between the two inputs, but in different units of time:

| Variable Name | Sample Output |
|:--------------|:--------------|
| Total Days | 1 |
| Total Hours | 24 |
| Total Minutes | 1440 |
| Total Seconds | 86400 |
| Total Milliseconds | 86400000 |

---

## Supported Date Formats
The following date formats can be used as input into this activity. You can also use a `Date Time` variable.

```text
ANSIC = 'Mon Jan 2 15:04:05 2018'
UnixDate = 'Mon Jan 2 15:04:05 MST 2018'
RubyDate = 'Mon Jan 02 15:04:05 -0700 2018'
RFC822 = '02 Jan 18 15:04 MST'
RFC822Z = '02 Jan 18 15:04 -0700'
RFC850 = 'Monday, 02-Jan-18 15:04:05 MST'
RFC1123 = 'Mon, 02 Jan 2018 15:04:05 MST'
RFC1123Z = 'Mon, 02 Jan 2018 15:04:05 -0700'
RFC3339 = '2018-01-02T15:04:05-07:00'
RFC3339Nano = '2018-01-02T15:04:05.999999999-07:00'
Custom formats:
'2018-01-02'
'02-01-2018'
'20180102-150405'
'02012018-150405 (Europe time format)'
Please notice that '01' always stands for Month and '02' stands for Day."
```

---

## Sample Workflows
The following sample workflows are available in our repository's workflows folder to help you get familiar with this activity. These can be imported using the instructions [here]({{ site.baseurl }}/importing) or you can view the workflow in GitHub by clicking on it.

* [Sample - Date and Time]({{ site.github.repository_url }}/tree/Main/Workflows/Sample-DateAndTime__definition_workflow_01KMHVP4736GU5X8CmvrPj65vPe3wImdeup)