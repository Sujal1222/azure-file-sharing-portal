const multer = require("multer");
const path = require("path");

// Configure where uploaded files are temporarily stored
const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "uploads/");

    },

    filename: (req, file, cb) => {

        const uniqueName = Date.now() + path.extname(file.originalname);

        cb(null, uniqueName);

    }

});

// Accept all file types for now
const upload = multer({

    storage

});

module.exports = upload;