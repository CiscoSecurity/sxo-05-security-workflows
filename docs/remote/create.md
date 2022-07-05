---
layout: page
title: Creating a Remote
permalink: /remote/create
parent: Remote
---

# Creating a Remote
The first step to setting up an orchestration remote is to create it in your SecureX orchestration instance. This gives you the configuration necessary to deploy the virtual appliance.

[<i class="fa fa-video mr-1"></i> Remote Overview](https://www.youtube.com/watch?v=EC2nCiAn1HM&list=PLPFIie48Myg2tu2gHbgm-moYg8LDaXsSo){: .btn-cisco-outline }

<div class="cisco-alert cisco-alert-info"><i class="fa fa-info-circle mr-1 cisco-icon-info"></i> Note that the virutal machine's configuration cannot be easily modified after it is deployed. You can SSH or console into the Ubuntu host operating system, however, we do not support or document how to make configuration changes to the VM directly (with the exception of configuring NTP servers).</div>

To create a new remote:
1. Expand the main menu, click on **Admin** and then click on **Remote Configuration**.
1. Click the **New Remote** button:
![]({{ site.baseurl }}/assets/images/remote/create-1.png)

1. Provide the remote a meaningful **Display Name**:
![]({{ site.baseurl }}/assets/images/remote/create-2.png)

1. Under the remote details section, select whether you want to use DHCP or a Static IP address for the virtual machine.
	* If using a Static IP, provide the:
		* IP address in CIDR notation (ex: 192.168.1.100/24)
		* List of DNS servers (ex: 192.168.1.1,192.168.1.2)
		* Default gateway (ex: 192.168.1.1)
![]({{ site.baseurl }}/assets/images/remote/create-3.png)

1. If a proxy is required for the remote to access the internet, set **Requires Proxy** to yes and provide the proxy address (only SOCKS5 proxies are supported).
1. Click **Submit**.

---

## Configuration Download
Now that the remote is created in orchestration, you can download the virtual machine configuration:
1. Hover over the new remote you just created on the **Remotes** page.
1. Click the arrow button in the Actions column on the right:
![]({{ site.baseurl }}/assets/images/remote/create-4.png)

1. Click **Connect** and then click the **Generate Package** button:
![]({{ site.baseurl }}/assets/images/remote/create-5.png)

1. A ZIP file with the remote's configuration will be downloaded.

---

## Next Steps
Now that you've created the remote in orchestration and downloaded the configuration bundle, you can proceed to virtual appliance setup.

[Virtual Appliance Setup]({{ site.baseurl }}/remote/setup){: .btn-cisco-sky-blue }