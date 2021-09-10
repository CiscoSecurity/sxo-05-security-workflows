---
layout: page
title: System Objects
permalink: /atomics/system
parent: Atomic Actions
---

# System Objects
Atomic actions that are system objects are built into the platform. As in, they're available in all SecureX orchestration tenants without needing to be imported. When you see a workflow that uses system atomics, that simply means you don't need to import those atomic actions before importing the workflow. Non-system atomics, such as those in this Github repository, still need to be imported prior to the workflow being imported.

<div class="cisco-alert cisco-alert-info"><i class="fa fa-info-circle mr-1 cisco-icon-info"></i> System objects are new and there are some changes you should be aware of related to how they work. Please see the sections below for more information</div>

---

## Things to Know
1. All of your existing atomic actions are being left as-in but may be hidden from certain parts of the SecureX orchestration user interface. This is to encourage you to migrate to the new atomics without breaking your existing workflows.
2. All of the workflows that Cisco publishes have been updated to use the new system objects. This will make them much simpler to import as most of the pre-requisites will already be imported. Each workflow's documentation has been updated accordingly.
3. You cannot modify system objects.

---

## Deprecated Atomic Actions
All atomic actions for Cisco products have been converted to system objects. The benefit of this change is that they'll all be available without needing to be imported and you'll always have the latest version. The old, tenant-specific versions of these atomics are now considered deprecated and, if you're using them, we encourage you to update your workflows to use the new, system versions. To help with these, we're publishing the following table which shows how the old atomics map to the new system objects:

| Old Atomic Name | New System Object Name |
|:---------|:---------|
| AMP - Get Computer by GUID | Secure Endpoint - Get Computer by GUID |
| AMP - Get Connector GUID | Secure Endpoint - Get Connector GUID |
| AMP - Get Events | Secure Endpoint - Get Events |
| AMP - Get Group by Name | Secure Endpoint - Get Group by Name |
| AMP - Isolate Host | Secure Endpoint - Isolate Host |
| AMP - Move Computer to Group | Secure Endpoint - Move Computer to Group |
| AMP - Un-Isolate Host | Secure Endpoint - Un-Isolate Host |
| CDO - Get Devices | Defense Orchestrator - Get Devices |
| CTR Create Casebook | Deprecated (use Threat Response - Create Casebook) |
| CTR Create Incident | Deprecated (use Threat Response - Create Incident) |
| CTR Create Transient Incident Id | Deprecated |
| CTR Enrich Observable | Deprecated (use Threat Response - Enrich Observable) |
| CTR List Actions | Deprecated (use Threat Response - List Response Actions) |
| CTR Trigger an Action | Deprecated (use Threat Response - Trigger Response Action) |
| CTRCheckDeliberateVerdict | Deprecated (use Threat Response - Deliberate Observable) |
| CTRGenerateAccessToken | Deprecated (use Threat Response - Generate Access Token) |
| CTRInspect | Deprecated (use Threat Response - Inspect for Observables) |
| CTRListDeliberateVerdicts | Deprecated (use Threat Response - Deliberate Observable) |
| Duo - Auth | Duo - Auth - Authenticate |
| Duo - Auth Status | Duo - Auth - Authentication Status |
| Duo - Check | Duo - Auth - Check |
| Duo - Enroll | Duo - Auth - Enroll |
| Duo - Enroll Status | Duo - Auth - Enrollment Status |
| Duo - PreAuth | Duo - Auth - PreAuth |
| Duo Admin - Add User to Group | Duo - Admin - Add User to Group |
| Duo Admin - Get User | Duo - Admin - Get User |
| Duo Admin - Remove User from Group | Duo - Admin - Remove User from Group |
| SNA - Get Flows by IP Addresses | Secure Network Analytics - Get Flows by IP Addresses |
| SNA - Get Security Events by IP Address | Secure Network Analytics - Get Security Events by IP Address |
| SNA - Get Security Events by Name | Secure Network Analytics - Get Security Events by Name |
| SNA - Get Tenants | Secure Network Analytics - Get Tenants |
| SNA - Get Tokens | Secure Network Analytics - Get Tokens |
| SNA - Get Top Conversations by IP Address | Secure Network Analytics - Get Top Conversations by IP Address |
| SNA - Get Top Hosts by IP Address | Secure Network Analytics - Get Top Hosts by IP Address |
| SNA - Get Top Peers by IP Address | Secure Network Analytics - Get Top Peers by IP Address |
| SWC - Add Domain or IP to Watchlist | Secure Cloud Analytics - Add Domain to Watchlist |
| SWC - Get Alerts | Secure Cloud Analytics - Get Alerts |
| SWC - Get Device Details by ID | Secure Cloud Analytics - Get Device Details by ID |
| SWC - Get Flows by IPs | Secure Cloud Analytics - Get Flows by IPs |
| SWC - Get Observation Details by ID | Secure Cloud Analytics - Get Observation Details by ID |
| SWC - Get Observations | Secure Cloud Analytics - Get Observations |
| SWC - Get Roles by IP Address | Secure Cloud Analytics - Get Roles by IP Address |
| SWC - List Domains in Watchlist | Secure Cloud Analytics - List Domains in Watchlist |
| SWC - Remove Domain from Watchlist | Secure Cloud Analytics - Remove Domain from Watchlist |
| TG v2 - Get Sample Analysis | Secure Malware Analytics - Get Sample Analysis |
| TG v2 - Get Sample Status | Secure Malware Analytics - Get Sample Status |
| TG v2 - Get Samples by File Hash | Secure Malware Analytics - Get Samples by File Hash |
| TG v2 - Submit File | Secure Malware Analytics - Submit File |
| TG v2 - Submit URL | Secure Malware Analytics - Submit URL |
| TG Query for sample status | Deprecated (use Secure Malware Analytics - Get Sample Status) |
| TG Submit URL | Deprecated (use Secure Malware Analytics - Submit URL) |
| TGFetchSampleAnalysis | Deprecated (use Secure Malware Analytics - Get Sample Analysis) |
| TGFetchThreatScoreAndIOCS | Deprecated (use Secure Malware Analytics - Get Sample Analysis) |
| TGGetDisposition | Deprecated |
| TGListDomainsForSample | Deprecated |
| TGListIPsForSample | Deprecated |
| TGListProcessesForSample | Deprecated |
| TGSearchFileHash | Deprecated (use Secure Malware Analytics - Get Samples by File Hash) |
| TGSearchSample | Deprecated |
| TGSearchSampleDispositionsForHash | Deprecated |
| Threat Response v2 - Create Casebook | Threat Response - Create Casebook |
| Threat Response v2 - Create Incident | Threat Response - Create Incident |
| Threat Response v2 - Create Relationship | Threat Response - Create Relationship |
| Threat Response v2 - Create Sighting | Threat Response - Create Sighting |
| Threat Response v2 - Deliberate Observable | Threat Response - Deliberate Observable |
| Threat Response v2 - Enrich Observable | Threat Response - Enrich Observable |
| Threat Response v2 - Generate Access Token | Threat Response - Generate Access Token |
| Threat Response v2 - Inspect for Observables | Threat Response - Inspect for Observables |
| Threat Response v2 - List Response Actions | Threat Response - List Response Actions |
| Threat Response v2 - Trigger Response Action | Threat Response - Trigger Response Action |
| Umbrella - Management V1 - Add Record to Destination List | Umbrella - Management - Add Record to Destination List |
| Umbrella - Management V1 - Get Destination List Entries | Umbrella - Management - Get Destination List Entries |
| Umbrella - Management V1 - Get Destination Lists | Umbrella - Management - Get Destination Lists |
| Umbrella - Management V1 - Get Organizations | Umbrella - Management - Get Organizations |
| Umbrella - Management V1 - Remove Destination from List | Umbrella - Management - Remove Record from Destination List |
| Umbrella - Reporting V1 - Get Security Activity Report | Umbrella - Reporting - Get Security Activity Report |
