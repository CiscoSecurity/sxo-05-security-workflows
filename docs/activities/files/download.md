---
layout: page
title: Download File
permalink: /activities/files/download
parent: Files
grand_parent: Activities
---

# Download File
_Category: File Operations_

This activity allows you to download a file from an HTTP-based [target]({{ site.baseurl }}/targets/). The output of this activity will be the `File Name`, `File Hash`, and the file itself in a special variable called `File Path`. The `File Path` variable represents the file on the filesystem and can only be used with activities that support files as input (of which there are few).

Usage of this activity is almost the same as the [HTTP Request]({{ site.baseurl }}/activities/http-request/) activity.