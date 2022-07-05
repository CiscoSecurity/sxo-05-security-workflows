---
layout: page
title: Virtual Appliance Setup
permalink: /remote/setup
parent: Remote
---

# Virtual Appliance Setup
Once you create a remote in SecureX orchestration, you can deploy the virtual appliance OVA and apply the configuration you downloaded. Here's a summary of this process:
1. Download the latest version of the SecureX orchestration remote OVA.
1. Generate an SSH key pair and console password.
1. Deploy the OVF template.
1. Verify remote connectivity.
1. (Optional) Define NTP servers.

[<i class="fa fa-video mr-1"></i> Remote Overview](https://www.youtube.com/watch?v=EC2nCiAn1HM&list=PLPFIie48Myg2tu2gHbgm-moYg8LDaXsSo){: .btn-cisco-outline }

<div class="cisco-alert cisco-alert-info"><i class="fa fa-info-circle mr-1 cisco-icon-info"></i> Note that the virutal machine's configuration cannot be easily modified after it is deployed. You can SSH or console into the Ubuntu host operating system, however, we do not support or document how to make configuration changes to the VM directly (with the exception of configuring NTP servers).</div>

---

## Download the OVA
1. In SecureX orchestration, navigate to the **Remote Configuration** page (under the **Admin** section).
1. Click the **Download Appliance** link next to the **New Remote** button:
![]({{ site.baseurl }}/assets/images/remote/create-6.png)

If you want to verify the file hash of the OVA, please refer to the following table:

| File Name | File Size | SHA256 Hash |
|:----------|:----------|:------------|
| sxo-remote-1.6.ova | 1.6 GB | 2cc3ffc5cb753d20ffc438598f1246b44dca7e1145cbfcb48da68fc9daa193c3 |

---

## Deploying the VM
1. In your VMware vCenter client, right click on the folder you want to deploy the remote in and select **Deploy OVF Template**:
![]({{ site.baseurl }}/assets/images/remote/deploy-1.png)

1. Select the **Local file** option, select the remote OVA you downloaded, and click **Next**:
![]({{ site.baseurl }}/assets/images/remote/deploy-2.png)

1. Give the virtual appliance a unique name, confirm the machine's location, and click **Next**:
![]({{ site.baseurl }}/assets/images/remote/deploy-3.png)

1. Select the compute resource to deploy the virtual appliance on and click **Next**:
![]({{ site.baseurl }}/assets/images/remote/deploy-4.png)

1. Review the details of the deployment and click **Next**.
1. Select the datastore you want to use for the virtual appliance and click **Next**.
	* Note: We recommend a minimum of 30 GB of disk space be available for an orchestration remote.
![]({{ site.baseurl }}/assets/images/remote/deploy-5.png)

1. Select the network you want to deploy the virtual appliance on and click **Next**:
![]({{ site.baseurl }}/assets/images/remote/deploy-6.png)

1. On the customize template screen, you'll need to provide some information:
	* Provide a unique ID and hostname for the virtual appliance:
	![]({{ site.baseurl }}/assets/images/remote/deploy-7.png)
	
	* (Optional) Provide an SSH public key for SSH access (see [these instructions](#generating-an-ssh-key-pair)).
	* Set `Encoded user-data` to the contents of `remoteconfig.txt` (from the `remotePackage.zip` you downloaded during [remote creation]({{ site.baseurl }}/remote/create)).
	* Provide a password for the virtual appliance for console access (the username will be `ubuntu`).
	![]({{ site.baseurl }}/assets/images/remote/deploy-8.png)
	
	* Click **Next**.
1. Review all of the virtual appliance's details and, if everything looks correct, click **Finish**.

Once the virtual appliance finishes deploying, be sure to power it on! Once online, the remote's status should change from `Not Connected` to `Connected` on the remotes list in SecureX orchestration. Note that a newly deployed remote can take up to 10 minutes to show as connected!

![]({{ site.baseurl }}/assets/images/remote/deploy-9.png)

---

## (Optional) Define NTP Servers
After deploying your SecureX orchestration remote, you can configure the virtual appliance to use custom NTP servers using these steps:
1. Log in to your virtual appliance by either:
	* Opening a console to the VM in vCenter and logging in with your password; or
	* SSHing to the VM using the key pair you created during setup.
1. Open the file `/etc/chrony/chrony.conf` and change the NTP servers to your preferred servers.
1. Save and close the file.
1. Run the following command to restart the NTP service and check that the time is correct: `systemctl restart chronyd ; watch chronyc tracking`.

---

## Generating an SSH Key Pair
If you want to be able to SSH to your remote appliance, you'll need to generate a key pair for authentication. You can use any key pair you want, as long as it's valid for a standard Ubuntu `authorized_hosts` file. Below, we give examples of how to generate a default RSA key pair.

### Linux/macOS
1. Open a terminal.
1. Execute the command: `ssh-keygen -t rsa -b 4096 -f /path/to/output/keypair` (for a 4096-bit RSA key).
1. If you want to use a passphrase, provide it and then confirm it. If not, press enter twice.
1. A public and private key will be generated at the path you provided. In this example:
	* `keypair` will contain the private key.
	* `keypair.pub` will contain the public key.

### Windows
One of the easiest ways to generate a key pair on Windows is by using the PuTTygen utility:
1. Download PuTTygen from [this page](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html) (look for `puttygen.exe` under **Alternative binary files**).
1. Run `puttygen.exe`.
1. If you want a passphrase on your key pair, provide it in **Key passphrase** and **Confirm passphrase**.
1. Select the type of key and key length at the bottom of the window (we recommend at least a 2048-bit RSA key).
1. Click the **Generate** button.
1. Use the **Save public key** and **Save private key** buttons to export the keys.

---

## Next Steps
Now that you've deployed the orchestration remote virtual appliance, you can configure your on-premises targets to use it!

[Target Configuration]({{ site.baseurl }}/remote/targets){: .btn-cisco-sky-blue }
