const {
    BlobServiceClient,
    StorageSharedKeyCredential,
    generateBlobSASQueryParameters,
    BlobSASPermissions
} = require("@azure/storage-blob");

require("dotenv").config();

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

const blobServiceClient =
    BlobServiceClient.fromConnectionString(connectionString);

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
const containerName = process.env.AZURE_CONTAINER_NAME;

const containerClient =
    blobServiceClient.getContainerClient(containerName);

const sharedKeyCredential =
    new StorageSharedKeyCredential(accountName, accountKey);

async function uploadFile(fileName, fileBuffer) {

    const blockBlobClient =
        containerClient.getBlockBlobClient(fileName);

    await blockBlobClient.uploadData(fileBuffer);

    return blockBlobClient.url;

}

async function listFiles() {

    const files = [];

    for await (const blob of containerClient.listBlobsFlat()) {

        files.push({

            name: blob.name,

            size: blob.properties.contentLength,

            lastModified: blob.properties.lastModified

        });

    }

    return files;

}

async function deleteFile(fileName) {

    const blobClient =
        containerClient.getBlockBlobClient(fileName);

    await blobClient.delete();

}

function generateDownloadLink(fileName) {

    const expiresOn = new Date();

    expiresOn.setMinutes(expiresOn.getMinutes() + 10);

    const sasToken = generateBlobSASQueryParameters({

        containerName,

        blobName: fileName,

        permissions: BlobSASPermissions.parse("r"),

        startsOn: new Date(),

        expiresOn

    },

    sharedKeyCredential

    ).toString();

    return `https://${accountName}.blob.core.windows.net/${containerName}/${fileName}?${sasToken}`;

}

module.exports = {

    uploadFile,

    listFiles,

    deleteFile,

    generateDownloadLink

};