const browseBtn = document.getElementById("browseBtn");
const uploadBtn = document.getElementById("uploadBtn");
const fileInput = document.getElementById("fileInput");
const selectedFile = document.getElementById("selectedFile");

browseBtn.addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
        selectedFile.innerHTML = `
            <strong>Selected File:</strong><br><br>
            ${fileInput.files[0].name}
        `;
    }
});

uploadBtn.addEventListener("click", async () => {

    if(fileInput.files.length === 0){
        alert("Please select a file.");
        return;
    }

    const formData = new FormData();

    formData.append("file", fileInput.files[0]);

    const response = await fetch("/upload",{
        method:"POST",
        body:formData
    });

    const data = await response.json();

    alert(data.message);

    loadFiles();

});

async function loadFiles(){

    const response = await fetch("/files");

    const files = await response.json();

    const fileSection = document.querySelector(".files-section");

    fileSection.innerHTML = `
        <div class="section-header">
            <h2>Recent Files</h2>
        </div>
    `;

    files.forEach(file=>{
fileSection.innerHTML += `
<div class="file-card">

    <div class="file-info">

        <h3>${file.name}</h3>

        <p>${(file.size/1024).toFixed(2)} KB</p>

    </div>

    <div class="file-actions">

        <a href="${file.url}" target="_blank">

            <button class="download-btn">

                Download

            </button>

        </a>

    </div>

</div>
`;
    });

}

loadFiles();