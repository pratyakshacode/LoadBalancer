### DESCRIPTION
* This is the load balancer which helps to distribute and redirect the request between two servers.
* It works on round robin algorithm.
* It is written in node js with typescript

### HOW TO START THE SERVER
* Firstly we need to install the dependencies by using **npm install**. It will install the dependencies like typescript, ts-node, ts-node-dev.
* ts-node-dev helps to restart the server again and again and transpile the typescript code whenever there is any change happens
* After installing dependencies and to start the server, we will use **npm run dev**

### CONFIGURATIONS
* By default it distribute the request between two servers but we can add more servers into the code.
* We can give host and port for the servers in env file or by default it uses localhost:3003 for first server and localhost:3002 for second server.
* It itself runs on localhost:3000 so if anyone wants to send the request from the frontend so it will be sending to localhost:3000 for the load balancer then load balancer will redirect the request to the respective server with round-robin algorithm.
