const { S3Client,GetObjectCommand,PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3client = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: "key",
        secretAccessKey: "secrat",
    },
});


async function getObjectURL(key) {
    const command = new GetObjectCommand({
        Bucket: 'your-bucket',
        Key: key,
    })
    const url = await getSignedUrl(s3client, command, { expiresIn: 20 });
    return url;
}


exports.handler = async (event) => {
    const url = await getObjectURL("Result.drawio.png");
    return url
}
