const { BlobServiceClient } = require("@azure/storage-blob");
require("dotenv").config();

const blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env.AZURE_STORAGE_CONNECTION_STRING
);

const containerClient = blobServiceClient.getContainerClient(
    process.env.AZURE_CONTAINER_NAME
);

exports.getFiles = async (req, res) => {

    try {

        const files = [];

        for await (const blob of containerClient.listBlobsFlat()) {

            files.push({

                name: blob.name,
                size: blob.properties.contentLength,
                lastModified: blob.properties.lastModified,
                url: containerClient.getBlockBlobClient(blob.name).url

            });

        }

        res.json(files);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Unable to fetch files."
        });

    }

};