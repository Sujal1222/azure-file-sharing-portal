const express = require("express");

const router = express.Router();

const {

getFiles

} = require("../controllers/fileController");

router.get("/", getFiles);

module.exports = router;