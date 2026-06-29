let allFiles = [];

const browseBtn = document.getElementById("browseBtn");
const uploadBtn = document.getElementById("uploadBtn");
const fileInput = document.getElementById("fileInput");
const selectedFile = document.getElementById("selectedFile");
const searchInput = document.getElementById("searchInput");

// Browse File
browseBtn.addEventListener("click", () => {
    fileInput.click();
});

// Show selected file
fileInput.addEventListener("change", () => {

    if (fileInput.files.length > 0) {

        selectedFile.innerHTML = `
            <strong>Selected File:</strong><br><br>
            ${fileInput.files[0].name}
        `;

    }

});

// Upload File
uploadBtn.addEventListener("click", async () => {

    if (fileInput.files.length === 0) {

        alert("Please select a file.");
        return;

    }

    const formData = new FormData();

    formData.append("file", fileInput.files[0]);

    try {

        const response = await fetch("/upload", {

            method: "POST",
            body: formData

        });

        const data = await response.json();

        alert(data.message);

        selectedFile.innerHTML = "No file selected";
        fileInput.value = "";

        loadFiles();

    }

    catch (err) {

        console.error(err);

        alert("Upload failed.");

    }

});

// Load Files
async function loadFiles() {

    try {

        const response = await fetch("/files");

        allFiles = await response.json();

        renderFiles(allFiles);

    }

    catch (err) {

        console.error(err);

    }

}

// Render Files
function renderFiles(files) {

    const fileSection = document.querySelector(".files-section");

    fileSection.innerHTML = `
        <div class="section-header">
            <h2>Recent Files</h2>
        </div>
    `;

    if (files.length === 0) {

        fileSection.innerHTML += `
            <div class="file-card">
                <div class="file-info">
                    <h3>No uploaded files yet</h3>
                    <p>Your Azure files will appear here.</p>
                </div>
            </div>
        `;

        return;

    }

    files.forEach(file => {

        fileSection.innerHTML += `
            <div class="file-card">

                <div class="file-info">

                    <h3>${file.name}</h3>

                    <p>${(file.size / 1024).toFixed(2)} KB</p>

                </div>

                <div class="file-actions">

                    <button
                        class="download-btn"
                        onclick="downloadFile('${file.name}')">

                        Download

                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteFile('${file.name}')">

                        Delete

                    </button>

                </div>

            </div>
        `;

    });

}

// Search
searchInput.addEventListener("input", () => {

    console.log("Typing...");

    const keyword = searchInput.value.toLowerCase();

    console.log(keyword);

    const filteredFiles = allFiles.filter(file =>
        file.name.toLowerCase().includes(keyword)
    );

    console.log(filteredFiles);

    renderFiles(filteredFiles);

});
// Delete
async function deleteFile(fileName) {

    if (!confirm(`Delete "${fileName}"?`)) return;

    try {

        const response = await fetch(`/files/${encodeURIComponent(fileName)}`, {

            method: "DELETE"

        });

        const data = await response.json();

        alert(data.message);

        loadFiles();

    }

    catch (err) {

        console.error(err);

        alert("Delete failed.");

    }

}

// Download
async function downloadFile(fileName) {

    try {

        const response = await fetch(
            `/files/download/${encodeURIComponent(fileName)}`
        );

        const data = await response.json();

        window.open(data.url, "_blank");

    }

    catch (err) {

        console.error(err);

        alert("Download failed.");

    }

}

// Initial Load
loadFiles();