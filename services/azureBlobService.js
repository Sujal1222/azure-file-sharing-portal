require("dotenv").config();

const { BlobServiceClient } = require("@azure/storage-blob");

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

const containerName = process.env.AZURE_CONTAINER_NAME;

const blobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);

const containerClient =
    blobServiceClient.getContainerClient(containerName);

async function uploadToAzure(file) {

    const blockBlobClient =
        containerClient.getBlockBlobClient(file.filename);

    await blockBlobClient.uploadFile(file.path);

    return blockBlobClient.url;

}

module.exports = {

    uploadToAzure

};