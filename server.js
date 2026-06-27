const fileRoutes = require("./routes/fileRoutes");
const express = require("express");
const path = require("path");

const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

const PORT = 3000;

app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// Serve uploaded files (temporary)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Upload API
app.use("/upload", uploadRoutes);
app.use("/files", fileRoutes);

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});