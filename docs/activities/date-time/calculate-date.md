---
layout: page
title: Calculate Date
permalink: /activities/date-time/calculate-date
parent: Date and Time
grand_parent: Activities
---

# Calculate Date
This activity allows you to take a `Date Time` and add or substract seconds from it. For example, you could take the current time, add 86400 seconds to it, and you'd have the same time tomorrow.

---

## Usage
This activity expects two inputs. The first is a `Date Time` to use as the basis for adjustments. As in, this is the date that will be added to or subtracted from. You can provide this date as a string (in a [supported format](#supported-date-formats)) or from a `Date Time` variable.

The second input is the adjustment to make to the original date, measured in seconds. By default, the number of seconds provided will be added to the date. If you provide a negative number of seconds, such as `-86400`, the adjustment will be subtracted instead. The activity's output will be the new `Date Time`.

---

## Hints
* When using the variable browser to use this activity's output, be careful which variable you select. Every activity has a `Start time` and `End time` which represent when the activity itself started and stopped running. The output from the activity is actually in the `Result` variable.

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