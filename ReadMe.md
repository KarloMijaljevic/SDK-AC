# SDK-AC
This System is done as a University project/seminar for
the class of Built-in Computer Systems at FESB university of Split.
The only missing part is the device and device API to open the door.
## SERVICE WORKFLOW
Here is the detailed explanation of the Servers workflow aka its
communication with other devices (web app and mobile app).
### MOBILE APP COMMUNICATION
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
### WEB APP COMMUNICATION
The WEB APP sends GET requests to fetch users or dates it also sends
POST request to create a user, and one to log in to the app. It also has
a PUT request to update a user.
## DATA BASE
The DB is in provided by MongoDB Atlas and is in the cloud. It is done
using the mongoose npm package. And lastly the DB only contains two models:
VerifiedUser and WorkHours. They are described below as user data and date data.
### USER DATA
1. Unique ID
2. Name
3. Email
4. MAC address
5. Active status
6. Work from home status
7. Role
8. Password
### DATE DATA
1. Unique ID
2. Date
3. Users array -> Contains all user info necessary to monitor work. For
example start work time and end work time and also full work time.
## TECH DETAILS
The server is based on NodeJS. The server scrips and programs
are written in javascript and bash. The mobile APP is done with Android Studio,
the WEB APP is done using VueJS.
## INSTALLATION GUIDE
This will lead you through the various installations for the SDK-AC
service.
### SERVER
To install the server you need to  have a Linux system to run it (for nmap).
Also you need to have nmap installed. This is a precondition.
Then you need to:
1. Install NodeJS if you do not have it.
2. Then clone the GitHub repository and run: 'npm install'
3. Add a .env file and add the line:
```
MONGO_URI="mongodb+srv://<username>:<password>@dnd-helper-sbhmd.mongodb.net/SDK-AC?retryWrites=true&w=majority"
JWT=<secret>
```
4. After it all finishes you can run the server using the 'node Server.js'
command or using the Development script 'npm run dev'.
5. Then you have the server running on localhost:5000
To make all this work you need to have a MongoDB account and place a JWT secret.
### WEB app
https://github.com/sandje00/sdk-access-control-web
### MOBILE app
--- Dina

Written by
Karlo Mijaljević, Stella Anđelić and Dina Cvitanović
