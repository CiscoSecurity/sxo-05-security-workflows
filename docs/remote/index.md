---
layout: page
title: Remote
permalink: /remote
has_children: true
nav_order: 45
has_toc: false
---

# Remote
SecureX Orchestration Remote is an on-premise virtual appliance that allows your workflows to communicate with resources inside your network behind a firewall. Since many on-premise devices aren't exposed to the internet, SXO Remote bridges the gap between those devices and the cloud so they can be incorporated into your workflows.

<div class="cisco-alert cisco-alert-info">
	<i class="fa fa-info-circle mr-1 cisco-icon-info"></i> The initial release of SXO Remote only supports HTTP Endpoint targets. Support for additional target types will be added in future releases.
</div>

To get an orchestration remote up and running, you need to do three things:
1. [Create a new remote in SecureX Orchestration]({{ site.baseurl }}/remote/create)
1. [Generate and download the remote configuration]({{ site.baseurl }}/remote/create)
1. [Download and deploy the virtual appliance]({{ site.baseurl }}/remote/setup)

Once the remote is connected, you can [configure your targets]({{ site.baseurl }}/remote/targets) to use it.

---

## Virtual Appliance Requirements
The minimum requirements for a SecureX Orchestration Remote virtual appliance are:
* VMware ESXi version 5.5 or newer
* 2 vCPU
* 2 GB RAM
* 30 GB Disk

### Connectivity Requirements
In order for SecureX Orchestration Remote to reach the SecureX cloud, outbound TCPS connectivity on port 8883 is required to the following endpoints (depending on which region you're using):
* North America: `securex-sxo-remote.us.security.cisco.com`
* Europe: `securex-sxo-remote.eu.security.cisco.com`
* Asia Pacific: `securex-sxo-remote.apjc.security.cisco.com`