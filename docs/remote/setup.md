---
layout: page
title: Virtual Appliance Setup
permalink: /remote/setup
parent: Remote
---

# Virtual Appliance Setup
Once you create a remote in SecureX Orchestration, you can deploy the virtual appliance OVA and apply the configuration you downloaded. Here's a summary of this process:
1. Download the latest version of the SecureX Orchestration Remote OVA
1. Generate an SSH key pair and console password
1. Deploy the OVF template
1. Verify remote connectivity
1. (Optional) Define NTP servers

---

## Download the OVA
1. In SecureX Orchestration, navigate to the **Remote Configuration** page (under the **Admin** section)
1. Click the **Download Appliance** link next to the **New Remote** button
![]({{ site.baseurl }}/assets/images/remote/create-6.png)

---

## Deploying the VM
1. In your VMware vSphere client, right click on the folder you want to deploy the remote in and select **Deploy OVF Template**
![]({{ site.baseurl }}/assets/images/remote/deploy-1.png)

1. Select the **Local file** option, select the remote OVA you downloaded, and click **Next**
![]({{ site.baseurl }}/assets/images/remote/deploy-2.png)

1. Give the virtual appliance a unique name, confirm the machine's location, and click **Next**
![]({{ site.baseurl }}/assets/images/remote/deploy-3.png)

1. Select the compute resource to deploy the virtual appliance on and click **Next**
![]({{ site.baseurl }}/assets/images/remote/deploy-4.png)

1. Review the details of the deployment and click **Next**
1. Select the datastore you want to use for the virtual appliance and click **Next**
	* Note: We recommend a minimum of 30 GB of disk space be available for an orchestration remote
![]({{ site.baseurl }}/assets/images/remote/deploy-5.png)

1. Select the network you want to deploy the virtual appliance on and click **Next**
![]({{ site.baseurl }}/assets/images/remote/deploy-6.png)

1. On the customize template screen, you'll need to provide some information:
	* Provide a unique ID and hostname for the virtual appliance
	![]({{ site.baseurl }}/assets/images/remote/deploy-7.png)
	
	* (Optional) Provide an SSH public key for SSH access (see [these instructions](#generating-an-ssh-key-pair))
	* Set `Encoded user-data` to the contents of `remoteconfig.txt` (from the `remotePackage.zip` you downloaded during [remote creation]({{ site.baseurl }}/remote/create))
	* Provide a password for the virtual appliance (for console access)
	![]({{ site.baseurl }}/assets/images/remote/deploy-8.png)
	
	* Click **Next**
1. Review all of the virtual appliance's details and, if everything looks correct, click **Finish**

Once the virtual appliance finishes deploying, be sure to power it on! Once online, the remote's status should change from `Not Connected` to `Connected` on the remotes list in SecureX Orchestration.
![]({{ site.baseurl }}/assets/images/remote/deploy-9.png)

---

## (Optional) Define NTP Servers
After deploying your SecureX Orchestration Remote, you can configure the virtual appliance to use custom NTP servers using these steps:
1. Log in to your virtual appliance by either:
	* Opening a console to the VM in vSphere and logging in with your password; or
	* SSHing to the VM using the key pair you created during setup
1. Open the file `/etc/chrony/chrony.conf` and change the NTP servers to your preferred servers
1. Save and close the file
1. Run the following command to restart the NTP service and check that the time is correct: `systemctl restart chronyd ; watch chronyc tracking`

---

## Generating an SSH Key Pair
If you want to be able to SSH to your remote appliance, you'll need to generate an RSA key pair for authentication.

### Linux/macOS
1. Open a terminal
1. Execute the command: `ssh-keygen -t rsa -f /path/to/output/keypair`
1. If you want to use a passphrase, provide it and then confirm it. If not, press enter twice
1. A public and private key will be generated at the path you provided. In this example:
	* `keypair` will contain the private key
	* `keypair.pub` will contain the public key

### Windows
One of the easiest ways to generate a key pair on Windows is by using the PuTTygen utility:
1. Download PuTTygen from [this page](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html) (look for `puttygen.exe` under **Alternative binary files**)
1. Run `puttygen.exe`
1. If you want a passphrase on your key pair, provide it in **Key passphrase** and **Confirm passphrase**
1. Click the **Generate** button
1. Use the **Save public key** and **Save private key** buttons to export the keys

---

## Next Steps
Now that you've deployed the SXO Remote virtual appliance, you can configure your on-premise targets to use it!

[Target Configuration]({{ site.baseurl }}/remote/targets){: .btn-cisco-sky-blue }