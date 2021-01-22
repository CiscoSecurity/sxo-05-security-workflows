---
layout: page
title: Target Groups
permalink: /targets/groups
parent: Targets
---

# Target Groups
Target groups allow you to provide a workflow a collection of targets to use. The workflow and its activities can then dynamically select targets from within that group during workflow execution. The targets within the group can all be the same type or a mix of different types.

---

## Group Configuration
Target groups are configured on the **Target Groups** tab of the **Targets** page. By default, SecureX orchestration has a `Default TargetGroup` which contains all `HTTP Endpoints`. You can add additional target types to the default group or you can create your own target groups. When selecting a target type to include in a group, you can choose to:
* Include all targets of that type;
* Provide criteria for target inclusion; or
* Include specific targets

---

## Workflow Configuration
When configuring a workflow to use a target group, you need to provide criteria for a default target. In the example below:
* The `Default TargetGroup` is being used;
* `HTTP Endpoint` targets are being selected; and
* The default target is an `HTTP Endpoint` whose `Display Name` equals `CTR_API`

**Note:** `Choose first with matching criteria` means that the first matching target will be selected. If you select `Choose all with matching criteria` the workflow will execute for each matching target.

![]({{ site.baseurl }}/assets/images/workflows/target-groups/workflow.png)

---

## Activity Configuration
After a workflow is configured to use a target group, you can configure its activities to use the group's members. You can either configure activities to use the default target (as explained above) or override the target group criteria. Examples of both of these types of configurations are provided below.

### Using the Default Target
To use the default target selected at the workflow level, simply select `Use Workflow Target Group` as the activity's target:

![]({{ site.baseurl }}/assets/images/workflows/target-groups/activity2.png)

### Overriding the Target Group Criteria
To override the default target and select a different target from the group, select `Override Workflow Target Group Critera` and provide alternate criteria. In this example, the workflow's default target is `CTR_API` and this activity is overriding the target to `CTR_For_Access_Token`:

![]({{ site.baseurl }}/assets/images/workflows/target-groups/activity1.png)

---

## Sample Workflows
The following sample workflows are available in our repository's workflows folder to help you get familiar with this concept. These can be imported using the instructions [here]({{ site.baseurl }}/importing) or you can view the workflow in GitHub by clicking on it.

* [Sample - Target Groups]({{ site.github.repository_url }}/tree/Main/Workflows/Sample-TargetGroups__definition_workflow_01JXUIVJ6VJXX6zclBJvmH65Wca5sWxbDoy)