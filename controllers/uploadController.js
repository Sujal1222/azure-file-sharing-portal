const fs = require("fs");

const { uploadFile } = require("../services/azureBlobService");

exports.uploadFile = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({

                success: false,

                message: "No file uploaded."

            });

        }

        const fileBuffer = fs.readFileSync(req.file.path);

        const fileUrl = await uploadFile(

            req.file.originalname,

            fileBuffer

        );

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