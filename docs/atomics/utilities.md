---
layout: page
title: Utility Atomics
permalink: /atomics/utilities
parent: Atomic Actions
---

# Utility Atomics
Sometimes as we're building workflows we build utility atomics to make certain things easier. These atomics usually perform basic but useful functions not available in the platform's core activities. Feel free to import these (they're in the normal [Atomics]({{ site.github.repository_url }}/tree/Main/Atomics) folder) and use them in your own workflows.

| Category | Name | Description |
|:---------|:-----|:------------|
| JSON     | [Simple List to Objects]({{ site.github.repository_url }}/tree/Main/Atomics/Utilities-JSON-SimpleListToObjects__definition_workflow_01J2Y9IJWUDSU5tw4v3R7nY3BhhnIyqrdVW) | Converts a simple JSON list into a list of objects that can be inputted into `Read Table from JSON`<br /><br />_Sample Input:_ `[ "item1", "item2", ... ]`<br />_Sample Output:_ `[ { "item": "item1" }, { "item": "item2" }, ... ]` |
| String   | [Get Length]({{ site.github.repository_url }}/tree/Main/Atomics/Utilities-String-GetLength__definition_workflow_01J3STRKBDJ7H4DZmPyS7xOkHlrhXKxkH34) | Returns the length of the string provided as input |
| Time     | [DateTime to Unix Epoch]({{ site.github.repository_url }}/tree/Main/Atomics/Utilities-Time-DateTimeToUnixEpoch__definition_workflow_01JANGI152PWM5WXe1bvW1lHwfhcBNBpd6M) | Converts a DateTime input into a Unix Epoch timestamp |
| Time     | [Get X Hour Window]({{ site.github.repository_url }}/tree/Main/Atomics/Utilities-Time-GetXHourWindow__definition_workflow_01IX8GGX9MV8B5ihSMEc7KHwEmgTSLojS1m) | Calculates a window of X hours starting from `Window Start` or ending at `Window End.` If neither of these inputs are provided, the window will start X hours ago and end at the atomic's start time. If both of these inputs are provided, the start time is used and the end time is ignored |