> On August 11, 2023, Cisco [announced](https://www.cisco.com/c/en/us/products/collateral/security/securex/securex-eol.html) that Cisco SecureX will go end-of-life on July 31, 2024. The content in this Github repository will not be actively maintained following this announcement.

# Cisco SecureX orchestration
[![published](https://static.production.devnetcloud.com/codeexchange/assets/images/devnet-published.svg)](https://developer.cisco.com/codeexchange/github/repo/CiscoSecurity/sxo-05-security-workflows)

SecureX orchestration provides a no-to-low code approach for building automated workflows. These workflows can interact with various types of resources and systems, whether they're from Cisco or a third-party. Our GitHub repositories contain a wide variety of atomic actions and workflows that can be imported into SecureX orchestration.

## Getting Started
To get started with SecureX orchestration, we recommend checking out our [Getting Started](https://ciscosecurity.github.io/sxo-05-security-workflows/getting-started) page.

---

## Atomic Actions
Atomic actions are self-contained workflows that are similar to a function in traditional programming. They can consume input, perform various actions, and then return output. They're designed to be portable, re-usable, and make building workflows more efficient.

* [Documentation](https://ciscosecurity.github.io/sxo-05-security-workflows/atomics/)

---

## Workflows
Workflows are the larger component of orchestration and are similar to a script in traditional programming. A workflow can be simple and only have a few actions or be complex and string together many different actions for different products.

* [Documentation](https://ciscosecurity.github.io/sxo-05-security-workflows/workflows/)

---

## Activities
SecureX orchestration comes with a variety of built-in activities for core functionality. These activities handle things like date and time manipulation, JSON and XML parsing, HTTP requests, and more. This section contains helpful hints, best practices, and sample workflows for some of these activities.

* [Documentation](https://ciscosecurity.github.io/sxo-05-security-workflows/activities/)
