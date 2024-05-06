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
