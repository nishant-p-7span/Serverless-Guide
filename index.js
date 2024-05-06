const { S3Client,GetObjectCommand,PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3client = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: "key",
        secretAccessKey: "secrat",
    },
});


async function putObject(filename, contenttype) {
    const command = new PutObjectCommand({
        Bucket: 'Your-Bucket',
        Key: `uploads/${filename}`,
        ContentType: contenttype,
    })
    const url = await getSignedUrl(s3client, command, { expiresIn: 60 });
    return url;
}

exports.handler = async (event) => {
    const url = await putObject(`image-${Date.now()}.png`, "image/png");
    return url;
}
