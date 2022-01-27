# SDK-AC

This System is done as a University project/seminar for
the class of Built-in Computer Systems at FESB university of Split.

## SERVICE WORKFLOW

The mobile APP sends a POST request to the server on the local
network once the device connects to the WiFi. The POST request
consists of the users unique ID in JSON format.

The server then checks if the users ID is on the verified user
list and then checks if the users MAC address is in fact
connected to the network. So that the user can not open the
door if he/she is not connected to the network. With this we
avoid the problem of users opening the door from their homes.

The mobile APP also can be used to start monitoring the work
start/end from the "Work from home" option inside the APP.
Which is then also received by the server so the ADMIN can view it
via the WEB APP.

The WEB APP sends POST requests and receives GET requests to/from
the server's open 'localhost' port or via its public IP address (domain).
Its Data Base is on the MongoDB Atlas service but we can deploy it also
on a separate container on the server if the client so wishes. It contains:
### USER DATA
1. Unique ID
2. Name
3. Email
4. MAC address
5. Active status
### WORK LOG DATA (to be added)
1. Complete work log

## TECH DETAILS

The server is based on NodeJS and runs as a docker
container on the main server. The server scrips and programs
are written in javascript and bash.
The mobile APP is done with React Native,
The WEB APP is done using VueJS.
And lastly the hardware and the API for the hardware are provided
by the SPICA company that specializes in access control software.

## INSTALLATION GUIDE
This will lead you through the various installations for the SDK-AC
service.
### SERVER
To install the server you need to download to have a Linux system to
run it. Also you need to have nmap installed. This is a precondition.
Then you need to:
1. Install NodeJS if you do not have it.
2. Then clone the GitHub repository and run: 'npm install'
3. Add a .env file and add the line:
```
MONGO_URI="mongodb+srv://<username>:<password>@dnd-helper-sbhmd.mongodb.net/SDK-AC?retryWrites=true&w=majority"
```
4. After it all finishes you can run the server using the 'node Server.js'
command or using the Development script 'npm run dev'.
5. Then you have the server running on localhost:5000
### WEB app
-- Stella
### MOBILE app
--- Dina

Written by
Karlo Mijaljević, Stella Anđelić and Dina Cvitanović
