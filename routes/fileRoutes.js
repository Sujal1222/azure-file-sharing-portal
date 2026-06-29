const express = require("express");

const router = express.Router();

const {

    getFiles,

    deleteFile,

    downloadFile

} = require("../controllers/fileController");

router.get("/", getFiles);

router.get("/download/:fileName", downloadFile);

router.delete("/:fileName", deleteFile);

module.exports = router;