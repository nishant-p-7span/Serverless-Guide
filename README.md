# NodeJS Express example deploy using serverless framework with envirnment variables set up for lambda.

## Installation for serverless.
- Install Serverless
```
npm install -g serverless
```
- for nodejs install
```
npm i serverless-http
```

- app.js should look like
```
const express = require('express')
const app = express()
const serverless = require('serverless-http')
// data
module.exports.handler = serverless(app);
```
> here ` module.exports.handler` act as route export ( if you are not using express). so in the `serverless.yml` file we will user model.exports.`name` to identify the app.

example:
```
service: demo-node
frameworkVersion: '3'

provider:
  name: aws
  runtime: nodejs20.x
  region: ap-south-1

functions:
  api:
    handler: app.handler
    events:
      - httpApi:
          path: /{proxy+}
          method: any
```
- In handler, `app` is name of the main file in our case (`app.js`), and `handler` is taken from `module.exports.handler`

## Basic Commands:

- Deploy application:
  ``` serverless deploy```
- Remove Application:
  ```serverless remove```
> But Make sure before running the commands youre aws credentials are set up.

## Environment Variables:
- These Environment Variables are same as we use in other service/ program.
- For node js:
  ```
  require('dotenv').config()
  const url = process.env.MONGO;
  ```
- How to Set up using serverless framework:
  ![image](https://github.com/nishant-p-7span/Serverless-Guide/assets/160576245/47a88fbe-e3cd-44ff-b12d-e17a3c6d8c52)
- Function for this node application:
  ```
  functions:
  api:
    handler: app.handler
    environment:
      MONGO: 'your secrate url'
    events:
      - httpApi:
          path: /{proxy+}
          method: any
  ```
## Function 
Rererance: https://www.serverless.com/framework/docs-providers-aws-guide-functions

# Note:
> Don't forget to Run `npm i` and include node_modules folder in the lamda functions, otherwise function will not work.

> NodeJS express deployment using serverless with environemt variables is uploaded to the Branch: `Express Example`.
