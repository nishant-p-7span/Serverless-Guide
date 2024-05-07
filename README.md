# Node Serverless framework guide with CI/CD integration.

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

## How to Use Git Action CI/CD pipeline integration to Deploy Serverless.
- Generate the IAM Access Credential for the gitaction. ( Mostly use Administrator Access, if not sure what policies to attach)
- Create a git-action file in .github/workflows/main.yml
- Add the Access id and access key to the Git Secrates.
- YAML file is uploaded to the repo. use it.
> this YAML file is configured to apply changes on the push in main branch.

## Lambda Function URL:
- Simple solution to create HTTP endpoint for the lambda functin.
- With Functioon URL we can perform http requests to the Lambda.
- How to enable it using Serverless Framework:
  ![image](https://github.com/nishant-p-7span/Serverless-Guide/assets/160576245/749f301d-55a3-49d4-b15d-9450661e286c)

## Lambda Function Versoning.
- Versioning is the functionality of the  Lmabda Function. We can publish the multiple versions of the lambda and invoke the lambda function accordingly.
- It can be invoked with: `rn:aws:lambda:ap-south-1:XXXXXXXXX:function:XXXXXXXXX:versionnumber`.
- User Function on Serverless framework:
![image](https://github.com/nishant-p-7span/Serverless-Guide/assets/160576245/7174e7bc-51de-4662-a533-979699962f7d)
- How to Purne Older version using Serverless Plugin: https://www.serverless.com/plugins/serverless-prune-versions

## Lambda Aliases:
- Aliases are pointers to the specific lambda version.
- It is used when working with the live projects and to have dev, test and production version of lambda.
- We need to ceate alias with name and version specified:
  ![image](https://github.com/nishant-p-7span/Serverless-Guide/assets/160576245/652a5588-e4a7-4642-a655-17c9831f1d2c)
- Weighted Alias, used to shift traffic between two version. like 75% traffic to Production version and 25% to Dev version.
  ![image](https://github.com/nishant-p-7span/Serverless-Guide/assets/160576245/ec3b6f9b-e219-4e5f-80f1-d63d6ac70614)

## Environment Variables:
- These Environment Variables are same as we use in other service/ program.
- For node js:
  ```
  require('dotenv').config()
  const url = process.env.MONGO;
  ```
- How to Set up using serverless framework:
  ![image](https://github.com/nishant-p-7span/Serverless-Guide/assets/160576245/47a88fbe-e3cd-44ff-b12d-e17a3c6d8c52)

Rererance: https://www.serverless.com/framework/docs-providers-aws-guide-functions

# Note:
> Don't forget to Run `npm i` and include node_modules folder in the lamda functions, otherwise function will not work.

> NodeJS express deployment using serverless with environemt variables is uploaded to the Branch: `Express Example`.
