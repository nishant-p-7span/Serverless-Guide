# Lambda for PutObjecect in S3 and other lambda triggers from the object creation in S3 and logs name of the object.

- For set up, Refer main branch documents.

## Upload:
- for upload there is index.js file in `Upload` folder.
- You have to send get request to api gateway from postman, to get the Pre-Signed URL.
- on that pre-signed URL, send `put` request with the binary file.
- Object type can be changed in the code.

## Trigger:
- As any object it uploaded to the the Bucket. One lambda should trigger, which will print log with object name.
- Code in handler.js file.

## Serverless.yml:
- include IAM role statement, to get,put object as it is require by function.
- Two functions are there,
- `s3Upload`: Contain S3 upload lambda.
  - handler is created like this: folder/file.handlername
- `logger`: Contain lambda which print log.

## `existing: true`:
- This is required as we are usiing existing s3 bucket.
- it will create another lambda with permissions and all, which is nessary to work lambda correctly.

## Extras::
- Program to print the body of the object.
  ```
  const AWS = require('aws-sdk')
  const s3 = new AWS.S3()
  
  module.exports.readS3File = async (event) => {
    const Key = event.Records[0].s3.object.key;
  
      // Read the object from S3
      const data = await s3.getObject({
          Bucket: event.Records[0].s3.bucket.name,
          Key
      }).promise();
  
      const s3Object = JSON.parse(data.Body)
      console.log("s3Object", s3Object);
      
      return;
  };
  ```
