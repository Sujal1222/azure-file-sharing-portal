const fs = require("fs");

const { uploadToAzure } = require("../services/azureBlobService");

exports.uploadFile = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message: "No file uploaded."

            });

        }

        const fileUrl = await uploadToAzure(req.file);

        // Delete local temporary file
        fs.unlinkSync(req.file.path);

        res.status(200).json({

            success: true,

            message: "File uploaded to Azure successfully!",

            fileUrl

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Upload failed."

        });

    }

};