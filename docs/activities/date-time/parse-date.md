---
layout: page
title: Parse Date
permalink: /activities/date-time/parse-date
parent: Date and Time
grand_parent: Activities
---

# Parse Date
This activity parses a string into a `Date Time`. You simply tell it what format of datetime to expect and it'll parse and convert the input string into a `Date Time` variable.

---

## Usage
The input expected by this activity will vary slightly depending on whether or not you're using a default date format or using a custom one. In either case, you need to provide the `Input String` to parse into a `Date Time`.

If you want to use one of the default date formats, you just select the output format you want. If you want to use a custom format, you check the `Use Custom Datetime Format` box and provide your own format (as described [below](#custom-datetime-formats)).

---

## Hints
* When using the variable browser to use this activity's output, be careful which variable you select. Every activity has a `Start time` and `End time` which represent when the activity itself started and stopped running. The output from the activity is actually in the `Result` variable.

---

## Supported Input Date Formats
The following datetime formats can be used as input into this activity:

```text
2018-01-02T15:04:05-0700
Tue Jan 2 15:04:05 2018
Tue Jan 2 15:04:05 MST 2018
Tue Jan 02 15:04:05 -0700 2018
02 Jan 18 15:04 MST
02 Jan 18 15:04 -0700
Tuesday, 02-Jan-18 15:04:05 MST
Tue, 02 Jan 2018 15:04:05 MST
Tue, 02 Jan 2018 15:04:05 -0700
2018-01-02T15:04:05Z
2018-01-02T15:04:05-07:00
2018-01-02T15:04:05.999999999Z
2018-01-02T15:04:05.999999999-07:00
20180102-150405
02012018-150405 (Europe time format)
2018-01-02
02-01-2018
```

---

## Custom Datetime Formats
If you want to define your own datetime input format, you can use the placeholders defined below to create your own format:

```text
LongMonth = 'January'
Month = 'Jan'
NumMonth = '1'
ZeroMonth = '01'
LongWeekDay = 'Monday'
WeekDay = 'Mon'
Day = '2'
UnderDay = '_2'
ZeroDay = '02'
Hour = '15'
Hour12 = '3'
ZeroHour12 = '03'
Minute = '4'
ZeroMinute = '04'
Second = '5'
ZeroSecond = '05'
LongYear = '2018'
Year = '18'
PM = 'PM'
pm = 'pm'
TZ = 'MST'
ISO8601TZ = 'Z0700'
ISO8601SecondsTZ = 'Z070000'
ISO8601ShortTZ = 'Z07'
ISO8601ColonTZ = 'Z07:00'
ISO8601ColonSecondsTZ = 'Z07:00:00'
NumTZ = '-0700'
NumSecondsTz = '-070000'
NumShortTZ = '-07'
NumColonTZ = '-07:00'
NumColonSecondsTZ = '-07:00:00'
FracSecond0= '.0', '.00', ... ,
FracSecond9 = '.9', '.99', ...,
```

Here are some examples of custom formats and what input would be expected for December 1st, 2020 at 10:30 PM:

| Custom Format | Expected Input |
|:--------------|:---------------|
| January 01, 2018 03:04:05 PM | December 01, 2020 10:30:00 PM |
| 2 Jan 2018 15:04:05 | 1 Dec 2020 22:30:00 |
| 01-02-2018 | 12-01-2020 |
| 15:04:05 | 22:30:00 |

---

## Sample Workflows
The following sample workflows are available in our repository's workflows folder to help you get familiar with this activity. These can be imported using the instructions [here]({{ site.baseurl }}/importing) or you can view the workflow in GitHub by clicking on it.

* [Sample - Date and Time]({{ site.github.repository_url }}/tree/Main/Workflows/Sample-DateAndTime__definition_workflow_01KMHVP4736GU5X8CmvrPj65vPe3wImdeup)