---
layout: page
title: Webex Atomics
permalink: /atomics/webex
parent: Atomic Actions
---

# Webex Atomics
Webex Teams is used in a variety of our workflows so we've published some Webex atomics:

| Atomic Name | Purpose |
|:------------|:--------|
| Add Member to Room | Adds a user to an existing Teams room |
| Create Room | Creates a new Teams room |
| Post Message to Room | Posts a plain text or markdown message to a Teams room |
| Search for Room | Searches for a Teams room and returns its information, including its ID |
| Search for Team | Searches for a Team and returns its information |
| Send Message to User | Sends a message directly to a user by their email address or ID |

## Webex Bots
If you're interacting with Webex from your workflows, we recommend *highly* that you use a bot. When you create a Webex Bot, you'll be given an authorization token that doesn't expire. This makes authenticating to the API much simpler since you can just store this token in a `Secure String`.

[<i class="fa fa-robot mr-1"></i> Webex Documentation](https://developer.webex.com/docs/bots){: .btn-cisco-sky-blue }

---

## Configuring Our Workflows
Many of our workflows have the option of posting messages to Webex Teams. This section explains how to configure these workflows with the information necessary for Webex or, if you don't want to use Webex, how to disable it.

### Using Webex?
* Make sure you've invited your bot to the room you want to post messages to
* Add your Webex Bot Token to the `Webex Teams Bot Token` local variable (or, if you have a token in a global variable already, set the local variable to the global's value using the `Fetch Global Variables` group at the beginning of the workflow)
* Provide either a `Webex Teams Room Name` or `Webex Teams Room ID` in their respective local variable. If only one of these local variables exists, fill in whichever is there. If both exist, you typically only need to provide one or the other

### Not Using Webex?
* Select each Webex-related activity and check the `Skip Activity Execution` box in its properties
