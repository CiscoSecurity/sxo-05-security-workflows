---
layout: page
title: Read File
permalink: /activities/files/read
parent: Files
grand_parent: Activities
---

# Read File
_Category: Unix/Linux System_

This activity allows you to read a file from a remote Unix/Linux [target]({{ site.baseurl }}/targets/). The contents of the file will be made available as a string, as well as the file's name and path.

---

## Hints
* This activity does not return a `File` that you can use with activities like [`Upload File`]({{ site.baseurl }}/activities/files/upload). It returns the contents of the file as a string.
* The `Local File Name` input tells the activity which file to read on the remote system. This can either be a relative path based on the user's home directory (`filename.txt`) or an absolute path (`/etc/something/filename.txt`).