---
layout: page
title: Targets
permalink: /targets/
has_children: true
nav_order: 50
has_toc: false
---

# Targets
Targets are essentially the things you want your workflows to be able to communicate with. They come in a wide variety of different types depending on the product or platform you want to connect to. Targets can have an [account key]({{ site.baseurl }}/account-keys/) associated with them but an account key isn't required. SecureX orchestration comes out of the box with some [default targets]({{ site.baseurl }}/targets/default) configured.

---

## Connectivity
Keep in mind that SecureX orchestration runs in a public cloud. This means that any target you want your workflows to communicate with must be accessible from the public internet. Internal targets behind a firewall will likely not be reachable from orchestration until an on-premise connector is available.

---

## Target Types
Targets come in a variety of different types. Keep in mind that if a target requires an account key, the account key type should match the target type.

| Target Type | Purpose/Product |
|:------------|:------------|
| AWS Endpoint | Amazon Web Services APIs |
| Git Endpoint | Git repositories |
| Google Cloud Platform Endpoint | Google Cloud Platform |
| HTTP Endpoint | HTTP-based APIs |
| JDBC Database Server | MySQL, Microsoft SQL, Oracle, and SAP HANA database servers |
| Meraki Endpoint | Meraki devices |
| Microsoft Windows Endpoint | Windows-based hosts and servers |
| SMTP Endpoint | Sending email via SMTP |
| SNMP Endpoint | SNMP-based device management |
| Terminal Endpoint | SSH-based endpoints like switches and routers |
| Terraform Endpoint | Terraform |
| Unix/Linux Endpoint | Unix/linux-based hosts and servers |

---

## Target Groups
Target groups are a more advanced, but important, concept that allows your workflows to dynamically pick targets from a collection. Groups can contain multiple targets of the same type or mix and match different target types.

[More Information]({{ site.baseurl }}/targets/groups){: .btn-cisco-sky-blue }