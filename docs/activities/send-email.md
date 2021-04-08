---
layout: page
title: Send Email
permalink: /activities/send-email
parent: Activities
---

# Send Email
_Category: Email_

This activity allows you to send emails using an SMTP [target]({{ site.baseurl }}/targets).

---

## Hints
* If you don't specify a `From` address, the username from the target's [account key]({{ site.baseurl }}/account-keys) will be used.
* For the `To`, `CC`, and `BCC` inputs, you can specify multiple email addresses separated by commas or each on their own line.
* If you want your message sent as HTML, you must check the `Send as HTML` box. Otherwise, the email is sent as plain text.
* Emails can be sent with attachments, however, the attachments must have come from an activity that supports `File`-type outputs (such as [`Download File`]({{ site.baseurl }}/activities/files/download)).

---

## Usage
Here's a sample of sending an HTML-formatted email with an attachment that came from a [`Download File`]({{ site.baseurl }}/activities/files/download) activity:

![]({{ site.baseurl }}/assets/images/activities/send-email/html-sample.png)