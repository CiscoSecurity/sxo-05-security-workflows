# SecureX orchestration atomic actions
Atomic actions are self-contained workflows that are similar to a function in traditional programming. They can consume input, perform various actions, and then return output. They're designed to be portable, re-usable, and make building workflows more efficient.

## Best practices
The following best practices should be followed when building an atomic action.
### Overall
* Name the atomic "Product - Function" (ex: Umbrella - Get Destination Lists)
* Provide a detailed description. For example:
```
Gets a list of destination lists for a given organization ID.

Target: HTTP endpoint for "management.api.umbrella.com"

Account Key: HTTP basic with Umbrella Management API key (client ID as username, client secret as password)

Steps:
[] Request the destination lists from Umbrella
[] Check if the API request succeeded:
[]> If it did, attempt to extract the list of records and set the output variable
[]> If it didn't, output an error

More information about this API: https://docs.umbrella.com/umbrella-api/reference#get_v1-organizations-organizationid-destinationlists
```
### A Note on Global Variables
* It's generally best not to use a global variable within an atomic. If you want to use a global variable for something like an API key or Bearer token, consume it as an input variable and then use the input variable within the atomic. Be sure to use the same data type for the input variable as the global variable and mark it required if the atomic will fail without it.
### Variables
* Give all of your variables (input, output, and local) meaningful names and descriptions. This includes noting possible values, values which should not be exceeded, and so on in the description.
* Make input variables required if the atomic will fail to function if the variables are left blank.
* For numeric variables, provide an appropriate default value.
* Use Secure Strings for sensitive values such as API keys, passwords, or other credentials that should be hidden from view.
### Targets
* All atomics should have their target set to `Specify Target On Workflow Start`
### Account Keys
* All atomics should have their account key set to `Use Target's Default Account Keys`
### Activities
* Give all of your activities (including logic components) meaningful display names.
### Activity Specific
#### HTTP Request (Web Service)
* Check the `Continue on HTTP Error Status Code` box and use a `Condition Block` to check the HTTP status code. This requires understanding the expected response of the API call you're making. For example, you may want to have one `Condition Branch` check that the status code is 200 (indicating a success) and have another `Condition Branch` that checks that the status code is not equal to 200 (meaning something may have gone wrong). Note that there are other 2xx status codes indicating success, so this logic will vary depending on the API.
* If sending a JSON payload in a POST or PUT, it's sometimes best to build the JSON payload in Python as opposed to directly in the `Request Body` activity input. Building JSON in the activity's input does not handle escaping, so nested quotes or other complex data can break the JSON syntax.
#### JSONPath Query (Core)
* Check the `Continue Workflow Execution on Failure` box and use a `Condition Block` to check whether or not the path query was successful. This helps make sure your atomic fails with a useful error message and only continues if the path query succeeds.
