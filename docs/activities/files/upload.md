---
layout: page
title: Upload File
permalink: /activities/files/upload
parent: Files
grand_parent: Activities
---

# Upload File
_Category: File Operations_

This activity allows you to upload a file to an HTTP-based [target]({{ site.baseurl }}/targets). The file must be from a file operations activity that returns a `File` variable. For example, you could download a file from one server using [`Download File`]({{ site.baseurl }}/activities/files/download) and upload it to a different one using this activity. Usage of this activity is almost the same as the [HTTP Request]({{ site.baseurl }}/activities/http-request/) activity.

---

## Hints
* This activity works the same as a file upload form you would see on a website. The file is simply part of the payload being pushed to the remote server via HTTP.

---

## Specifying a Payload
Unlike the normal [HTTP Request]({{ site.baseurl }}/activities/http-request/) activity which only allows you to use a string payload, this activity allows you to upload a file as either `Form-Data` or `Binary-Data`. After configuring the activity similar to a normal HTTP request, you need to specify the file or text payload and how it should be sent. Here's a sample showing how to upload a file that was previously downloaded using the [`Download File`]({{ site.baseurl }}/activities/files/download) activity:

![]({{ site.baseurl }}/assets/images/activities/files/upload/payload.png)
