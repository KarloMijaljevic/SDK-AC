#!/usr/bin/bash
# First command list scans the local network for devices
# and saves their IP's to the IpList.txt file inside the
# Files directory.
nmap -sn "192.168.1.*" | grep -E "192.168.1.[0-9]+" | awk '{print $NF}' | sed 's/(//g;s/)//g' > Files/IpList.txt
# Second command list checks the arp cache and maps the
# coresponding MAC addresses to thier IP pairs.
arp -a | grep -v '<incomplete>' | awk '{print $2 "-->" $4}' | sed 's/(//g;s/)//g' > Files/IpToMacList.txt
