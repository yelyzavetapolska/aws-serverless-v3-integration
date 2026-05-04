const { DynamoDBClient, PutItemCommand, ScanCommand } = require("@aws-sdk/client-dynamodb");
const { S3Client, PutObjectCommand, ListObjectsV2Command } = require("@aws-sdk/client-s3");

const dbClient = new DynamoDBClient({});
const s3Client = new S3Client({});

const TABLE_NAME = "SLS-History-Table";
const BUCKET_NAME = "my-sls-unique-storage-yp"; 

module.exports.main = async (event) => {
    const id = Date.now().toString();

    try {
        await dbClient.send(new PutItemCommand({
            TableName: TABLE_NAME,
            Item: { 
                id: { S: id }, 
                message: { S: `Visit via SLS v3 at ${new Date().toISOString()}` } 
            }
        }));

        await s3Client.send(new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: `sls-note-${id}.txt`,
            Body: "This file was created using Serverless Framework v3!"
        }));

        const dbData = await dbClient.send(new ScanCommand({ TableName: TABLE_NAME }));
        const history = dbData.Items.map(i => `<li>${i.message.S}</li>`).join("");

        return {
            statusCode: 200,
            headers: { "Content-Type": "text/html; charset=utf-8" },
            body: `
                <h1>Successful deployment via SLS v3!</h1>
                <p>Файл sls-note-${id}.txt создан в S3.</p>
                <h3>History from DynamoDB:</h3>
                <ul>${history}</ul>
            `
        };
    } catch (error) {
        console.error(error);
        return { statusCode: 500, body: JSON.stringify(error) };
    }
};