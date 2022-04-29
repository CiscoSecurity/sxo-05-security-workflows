---
layout: page
title: Remote
permalink: /remote/
has_children: true
nav_order: 45
has_toc: false
---

<div class="cisco-alert cisco-alert-info"><i class="fa fa-info-circle mr-1 cisco-icon-info"></i> If you want to use the new <a href="{{ site.baseurl }}/account-keys/securex-token">SecureX Token</a> account key, you will need to update your orchestration remote to the latest version.</div>

# Remote
SecureX orchestration remote is an on-premises virtual appliance that allows your workflows to communicate with resources inside your network behind a firewall. Since many on-premises devices aren't exposed to the internet, SXo remote bridges the gap between those devices and the cloud so they can be incorporated into your workflows.

[<i class="fa fa-video mr-1"></i> Remote Overview](https://www.youtube.com/watch?v=EC2nCiAn1HM&list=PLPFIie48Myg2tu2gHbgm-moYg8LDaXsSo){: .btn-cisco-outline }

To get an orchestration remote up and running, you need to do three things:
1. [Create a new remote in SecureX orchestration]({{ site.baseurl }}/remote/create)
1. [Generate and download the remote configuration]({{ site.baseurl }}/remote/create)
1. [Download and deploy the virtual appliance]({{ site.baseurl }}/remote/setup)

Once the remote is connected, you can [configure your targets]({{ site.baseurl }}/remote/targets) to use it.

---

## Virtual Appliance Requirements
The minimum requirements for a SecureX orchestration remote virtual appliance are:
* VMware ESXi version 5.5 or newer
* 2 vCPU
* 2 GB RAM
* 30 GB Disk

### Connectivity Requirements
In order for SecureX orchestration remote to reach the SecureX cloud, outbound TCPS connectivity on port 8883 is required to the following endpoints (depending on which region you're using):
* North America: `securex-sxo-remote.us.security.cisco.com`
* Europe: `securex-sxo-remote.eu.security.cisco.com`
* Asia Pacific: `securex-sxo-remote.apjc.security.cisco.com`
