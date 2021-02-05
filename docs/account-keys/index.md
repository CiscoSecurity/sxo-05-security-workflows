---
layout: page
title: Account Keys
permalink: /account-keys/
has_children: true
nav_order: 10
has_toc: false
---

# Account Keys
Account keys are what SecureX Orchestration calls credentials. They come in a wide variety of different types that correspond to the types of [targets]({{ site.baseurl }}/targets/) that are available. Targets are not required to have account keys, however, for targets with account keys the key type must match the target type. SecureX Orchestration comes out of the box with some [default account keys]({{ site.baseurl }}/account-keys/default) configured.

---

## Key Types
Account keys come in a variety of different types. Keep in mind that an account key's type must match the target it's being used with.

| Key Type | Target Types |
|:---------|:-------------|
| AWS Credentials | AWS Endpoint |
| Email Credentials | POP3 Endpoint, SMTP Endpoint |
| Git Password-Based Credentials | Git Endpoint |
| Git Token-Based Credentials | Git Endpoint |
| Google Cloud Platform Authentication | Google Cloud Platform Endpoint |
| HTTP Basic Authentication | HTTP Endpoint |
| HTTP Client Certificate Authentication | HTTP Endpoint |
| HTTP Signature Authentication | HTTP Endpoint |
| JDBC Login Credentials | JDBC Database Server |
| Meraki Credentials | Meraki Endpoint |
| Microsoft Windows Credentials | Microsoft Windows Endpoint |
| SNMP Credentials | SNMP Endpoint |
| Terminal Key-Based Credentials | Terminal Endpoint, Terraform Endpoint, Unix/Linux Endpoint |
| Terminal Password-Based Credentials | Terminal Endpoint, Terraform Endpoint, Unix/Linux Endpoint |

---

## API Credentials
Wondering how to store API credentials? It depends...

[More Information]({{ site.baseurl }}/activities/http-request/authentication){: .btn-cisco-sky-blue }