const {
    listFiles,
    deleteFile,
    generateDownloadLink
} = require("../services/azureBlobService");

exports.getFiles = async (req, res) => {

    try {

        const files = await listFiles();

        res.json(files);

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Unable to fetch files."

        });

    }

};

exports.deleteFile = async (req, res) => {

    try {

        await deleteFile(req.params.fileName);

        res.json({

            success: true,

            message: "File deleted successfully."

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: "Unable to delete file."

        });

    }

};

exports.downloadFile = async (req, res) => {

    try {

        const downloadUrl = generateDownloadLink(req.params.fileName);

        res.json({

            url: downloadUrl

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({

            message: "Unable to generate download link."

        });

    }

};