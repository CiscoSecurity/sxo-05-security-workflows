---
layout: page
title: Write File
permalink: /activities/files/write
parent: Files
grand_parent: Activities
---

# Write File
_Category: Unix/Linux System_

This activity allows you to write a file to a remote Unix/Linux [target]({{ site.baseurl }}/targets). The output of this activity includes the contents of the file written, the file's name, and it's path.

---

## Hints
* This activity does not return a `File` that you can use with activities like [`Upload File`]({{ site.baseurl }}/activities/files/upload). It returns the contents of the file as a string.
* The `Local File Name` input tells the activity which file to write to on the remote system. This can either be a relative path based on the user's home directory (`filename.txt`) or an absolute path (`/etc/something/filename.txt`).
* A variety of encoding options are available for your content, including: `ASCII`, `UTF-7`, `UTF-8`, `UTF-16`, and `UTF-32`.
* The following options are available for handling changes to a file that already exists:
	* `Append to existing file`
	* `Overwrite existing file`
	* `Do not overwrite if file exists`

---

## Usage
Here's a sample of writing a simple HTML file to `/var/www/html/index.html`:
![]({{ site.baseurl }}/assets/images/activities/files/write/payload.png)