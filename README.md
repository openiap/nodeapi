# OpenIAP nodejs API

This is the client (and server) side api needed to connect and consume an OpenIAP flow instance, using one of the multiple protocols supported.

This version is for nodejs only, for browser implementation please see the [jsapi](https://github.com/openiap/jsapi) version

## Table of Contents

- [Installation](#installation)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)

## installation
Install using npm with
```bash
npm install @openiap/nodeapi
```
For bleeding edge version directly from github, use
```bash
npm install openiap/nodeapi
```
note: this require you also have git installed

## Getting Started
We highly recomend you install the [vs code extention](https://marketplace.visualstudio.com/items?itemName=openiap.openiap-assistant) while working on your code. This can help you setup launch files with the correct envoriment variables and to publish your code to an OpenIAP flow instance.

```javascript
const { openiap } = require("@openiap/nodeapi");
client.connect().then(cli=> {
    console.log("Connected")
}

```
The npm package comes with type defenition for typescript as well, but for simplicity sake all examples are pure javascript. All functions rely on async/await patterns, so to login, add an entry to the entities collection, query it and close the connection again, we could
```javascript
const { openiap } = require("@openiap/nodeapi");
async function main() {
    const client = new openiap();
    await client.connect();
    const results = await client.Query( {
        query:  {"_type":"test"}, collectionname: "entities", projection: {"name": 1}
    })
    console.log(JSON.stringify(results, null, 2));
    client.Close();
}
main();
```

For code that will be running for a long time, like a webhook, or code waiting on message from a message queue, it's handy to do all initializaion in the onConnected callback. By default the client will auto connect to your OpenIAP flow instance, so by adding you initilizaion code here, it will get rerun when connected.

```javascript
async function onConnected(client) {
    const localqueue = await client.RegisterQueue({ queuename:""}, async (msg, payload, user, jwt)=> {
        if(payload == null) payload = {}
        payload.name = "A job well done."
        // Return updated payload to caller
        return payload;
    }
    console.log("listening on " + localqueue);
}
async function main() {
    const client = new openiap();
    client.onConnected = onConnected
    await client.connect();
}
main();
```

You **can** add the connection string to your OpenIAP flow instance using the client constructor.
```javascript
async function main() {
    const client = new openiap("grpc://grpc.app.openiap.io:443"");
    client.onConnected = onConnected
    await client.connect();
    client.Signin({username: "henrik", password: "SuperSecret"})
}
main();
```
You can also supply crendetials in the connection string, then you don't need to call Signin()
```javascript
async function main() {
    const client = new openiap("grpc://henrik:SuperSecret@grpc.app.openiap.io:443"");
    client.onConnected = onConnected
    await client.connect();
}
main();
```

OpenIAP Flow support multiple different transport protocols, and you define what protocol to use, in the connection strings protocol part

- `grpc://host.name:port`
is for connecting using GRPC. For kubernetes and docker deployments the default endpoint will be the instance's domain prefixed with grpc.
For instance https://app.openiap.io has an grpc endpoint at `grpc://grpc.app.openiap.io:443`
- `ws[s]://host.name/ws/v2`
If using SSL certificates use wss: for unencrypted connections only use ws: 
- `pipe://host.name` and `pipe://host.name:port` uses either name pipes or raw TCP sockets to connect to openflow. For most installations this will not be avaliable without some heave modifications to the [helm chart](https://github.com/open-rpa/helm-charts/) or [docker compose file](https://github.com/open-rpa/docker)
- `http[s]://host.name/ws/v2` 
Is an experimental and **unsuppported** feature where all services that does not require streaming,  are exposed as a REST endpoints.


## api-documentation
Comming soon