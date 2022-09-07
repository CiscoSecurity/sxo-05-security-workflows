---
layout: page
title: Request Threat Containment
permalink: /workflows/panorama/0050-request-threat-containment
redirect_from:
  - /workflows/0050
parent: Palo Alto Panorama
grand_parent: Workflows
---

# Request Threat Containment
<div markdown="1">
Workflow #0050
{: .label }

Response Workflow
{: .label }
</div>

This workflow is designed to be triggered by ServiceNow in response to a new Firewall Rule Task. When triggered, it gets data from ServiceNow which is used to update rules in Palo Alto Panorama. If an address or service object for the given input is not found, new objects are created using the following naming convention:
* SXo-DestinationAddressObject-{Timestamp}
* SXo-SourceAddressObject-{Timestamp}
* SXo-ServiceObject-{Timestamp}

<div class="cisco-alert cisco-alert-info"><i class="fa fa-info-circle mr-1 cisco-icon-info"></i> While this workflow is listed as a response workflow, it won't work if triggered from a SecureX pivot menu. This workflow expects a JSON payload from ServiceNow and is only marked as a response workflow so it can be triggered using the SecureX <a href="{{ site.baseurl }}/workflows/response/tr-api">response API</a></div>

[<i class="fab fa-github mr-1"></i> GitHub]({{ site.github.repository_url }}/tree/Main/Workflows/0050-Panorama-RequestThreatContainment__definition_workflow_01RHSZ328KBTC3l51l1VSqIwTjyiWKNMD9N){: .btn-cisco-outline }

---

## Change Log

| Date | Notes |
|:-----|:------|
| Nov 4, 2021 | - Initial release |
| Sep 7, 2022 | - Minor updates to naming and descriptions |

_See the [Important Notes]({{ site.baseurl }}/notes) page for more information about updating workflows_

---

## Requirements
* The following [system atomics]({{ site.baseurl }}/atomics/system) are used by this workflow:
	* None
* The following atomic actions must be imported before you can import this workflow:
	* Palo Alto - Panorama - Add Address Object to Address Group ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Palo Alto - Panorama - Add Service Object to Service Group ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Palo Alto - Panorama - Create Address Object ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Palo Alto - Panorama - Create Service Object ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Palo Alto - Panorama - Search Address Object by Value ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Palo Alto - Panorama - Search Service Objects ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* Palo Alto - Panorama - Update Security Policy Pre Rule ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
	* ServiceNow - Add Work Note to Firewall Rule Task ([CiscoSecurity_Atomics]({{ site.baseurl }}/configuration))
* The [targets](#targets) and [account keys](#account-keys) listed below
* Palo Alto Panorama
* ServiceNow (you must complete the [ServiceNow Configuration](#servicenow-configuration) steps below)

---

## Workflow Steps
* Validate the input from ServiceNow and check for required inputs
* Convert the input into a table we can loop through
* For each object in the input:
	* Check if an address object exists for this item:
		* If it does, store its name in a local variable
		* If it doesn't, create a new address object and store its name in a local variable
	* Add the address object to the configured address group
* Check if a service object exists for this service:
	* If it does, store its name in a local variable
	* If it doesn't, create a new service object and store its name in a local variable
* Add the service object to the configure service group
* Update the configured security policy pre rule with the address and service object
* Post a work note with results to the ServiceNow firewall rule task

---

## Configuration
* Set the `API Key` local variable to your Palo Alto Panorama API key
* Set the `Destination Address Group Name` local variable to the name of the address group to add the rule's destination objects to
* Set the `Device Group Name` local variable to the name of the device group to manage objects for. This is only required when Location is set to device-group
* Set the `Location` local variable to the availability zone of the objects. Valid values include: shared, device-group. If you use device-group, you must provide a Device Group Name
* Set the `Security Policy Pre Rule Name` local variable to the name of the security policy pre rule to make changes to
* Set the `Service Group Name` local variable to the name of the service object group to add the rule's service objects to
* Set the `Source Address Group Name` local variable to the name of the address group to add the rule's source objects to
* If you want to change the name of this workflow in the pivot menu, change its display name

---

## Targets
**Note:** If your Panorama instance is on-premises and not accessible from the internet, you will need a [SecureX orchestration remote]({{ site.baseurl }}/remote/) to use it with orchestration.

Target Group: `Default TargetGroup`

| Target Name | Type | Details | Account Keys | Notes |
|:------------|:-----|:--------|:-------------|:------|
| Palo Alto Panorama | HTTP Endpoint | _Protocol:_ `HTTPS` <br/> _Host:_ `your-panorama-instance` <br/> _Path_: `restapi` | None | If you use a self-signed certificate, disable certificate validation on the target |
| ServiceNow | HTTP Endpoint | _Protocol:_ `HTTPS`<br />_Host:_ `<instance>.service-now.com`<br />_Path:_ `/api` | ServiceNow_Credentials | Be sure to use your instance URL |

---

## Account Keys

| Account Key Name | Type | Details | Notes |
|:-----------------|:-----|:--------|:------|
| ServiceNow_Credentials | HTTP Basic Authentication | _Username:_ ServiceNow User ID<br />_Password:_ ServiceNow Password | |

---

## ServiceNow Configuration
Follow the steps below to configure ServiceNow to trigger this workflow when a Firewall Rule Task is created. The task will be updated with a work note showing the results of workflow execution.

### Register OAuth Provider
1. In ServiceNow, navigate to **System OAuth** > **Application Registry**
1. Click **New** and select **Connect to a third party OAuth Provider**
1. Fill in the following values:
	* Name: Name to uniquely identify the OAuth provider (for example: Cisco SecureX)
	* Client ID: The client ID for your SecureX API client (must have the `response` scope, see [these instructions]({{ site.baseurl }}/workflows/response/tr-api#generating-an-api-client))
	* Client Secret: The secret for your SecureX API client
	* Token URL: OAuth server token endpoint
		* North America: `https://visibility.amp.cisco.com/iroh/oauth2/token`
		* Europe: `https://visibility.eu.amp.cisco.com/iroh/oauth2/token`
		* Asia Pacific: `https://visibility.apjc.amp.cisco.com/iroh/oauth2/token`
	* Default Grant Type: `Client Credentials`
	* Send Credentials: `In Request Body (Form URL-Encoded)`
1. Click **Submit** in the upper right corner

### Create a New REST Message
1. In ServiceNow, navigate to **System Web Services** > **REST Message**
1. Click **New** and fill in the following values:
	* Name: Enter a descriptive name for this message. (for example: `Palo Alto - Create Policy Rule`)
	* Endpoint: One of the following
		* North America: `https://visibility.amp.cisco.com/iroh/iroh-response/`
		* Europe: `https://visibility.eu.amp.cisco.com/iroh/iroh-response/`
		* Asia Pacific: `https://visibility.apjc.amp.cisco.com/iroh/iroh-response/`
1. Under **Authentication**, select `OAuth 2.0` for the **Authentication type** and set the **OAuth profile** to the profile you created in the previous section
1. Click **Submit**
1. Select the **REST Message** you just created from the list
1. In the **HTTP Methods** section, click **New**
1. Fill in the following values:
	* Name: `Default POST`
	* HTTP method: `POST`
	* Endpoint: `https://visibility.amp.cisco.com/iroh/<action_URL>` (see [these instructions]({{ site.baseurl }}/workflows/response/tr-api#getting-the-response-workflows-details))
1. Select **Inherit from parent** for the **Authentication type**
1. Click **Submit**
1. Select the **Default POST** method you just created
1. Click **New** under **Variable Substitutions**
1. Enter the name `observable_value` and click **Submit**
1. Under **HTTP Request**, add the following **HTTP Query Parameters**:
	* observable_type: `ip`
	* observable_value: `${observable_value}`
	* workflow_id: The ID of the Request Threat Containment workflow in your SecureX orchestration environment (this is shown in the browser URL when you have the workflow open in the workflow editor, for example: `01S95E2UAWP6G22rL4MPUgNjAPvF0lI7OkB`)
1. Click **Update** in the upper right corner

### Create a New Business Rule
1. In ServiceNow, navigate to **System Definition** > **Business Rules**
1. Click **New** and fill in the following values:
	* Name: Enter a name for the business rule
	* Table: `Change Request [change_request]`
    * Advanced: Select this check box
	* Active: Select this check box
1. Under **When to run**, check the **Insert** box and select `after` for the **When** box
1. Under **Filter Condition**, set **field** to `Task Type`, **oper** to `is`, and **value** to `Change Request`
1. Under **Advanced**, paste the following script into code section (be sure to enter the name of the REST Message you created earlier):
```javascript
(function executeRule(current, previous) {
	try {
		var rule_task = new GlideRecord("sn_disco_firewall_rule_task");
		rule_task.get("sys_id", current.parent);
		
		data = {
			"Destination Host IP": rule_task.getValue("destination_ip"),
			"Source Host IP": rule_task.getValue("source_ip"),
			"Access Action": rule_task.getValue("action"),
			"Protocol": rule_task.getValue("protocol"),
			"ServiceNow Task ID": rule_task.getValue("sys_id"),
			"Destination Port": rule_task.getValue("destination_port")
		};
		
		var r = new sn_ws.RESTMessageV2("<name of your REST message>", "Default POST");
		r.setStringParameterNoEscape("observable_value", JSON.stringify(data));
		var response = r.execute();
		var responseBody = response.getBody();
		var httpStatus = response.getStatusCode();
	} catch (ex) {
		var message = ex.message;
	}
})(current, previous);
```
1. Click **Submit**

Now, when a firewall rule task is created, the SecureX orchestration workflow should run. See [this page](https://docs.servicenow.com/bundle/quebec-it-operations-management/page/product/discovery/concept/firewall-requests.html) for more information about ServiceNow firewall requests
