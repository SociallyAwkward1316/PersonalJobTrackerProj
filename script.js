const jobNameInput = document.getElementById("jobNameInput")
const jobUrlInput = document.getElementById("jobUrlInput")
const companyInput = document.getElementById("companyInput")
const positionInput = document.getElementById("positionInput")
const statusInput = document.getElementById("statusInput")
const jobNotes = document.getElementById("jobNotes")
const submitBtn = document.getElementById("submitBtn")

const filterBtn = document.getElementById("filterBtn")
const filterInputs = document.getElementById("filterInputs")

const companyFilterInput = document.getElementById("companyFilterInput")
const statusFilterInput = document.getElementById("statusFilterInput")
const filterSubmitBtn = document.getElementById("filterSearchBtn")
const clearFiltersBtn = document.getElementById("clearFiltersBtn")

// Detail card Dom variables //
const modalDiv = document.getElementById("modalShow")

const jobNameDetail = document.getElementById("jobNameDetail")
const jobUrlDetail = document.getElementById("jobUrlDetail")
const companyDetail = document.getElementById("companyDetail")
const positionDetail = document.getElementById("positionDetail")
const statusDetail = document.getElementById("statusDetail")
const noteDetail = document.getElementById("noteDetail")

const exitModalBtn = document.getElementById("exitModalBtn")
const editInfoBtn = document.getElementById("editInfoBtn")
const deleteBtn = document.getElementById("deleteBtn")

let currentEditedRow = 0



window.onload = function () {
    const applications = localStorage.getItem("applications")

    if (applications === null) {
        return
    }

    apps = JSON.parse(applications)

    apps.forEach(element => {
        addRowToTable(element)
    });

}


function addRowToTable(application) {
    const tableBody = document.getElementById("tableBody")
    const tableRow = document.createElement("tr")

    tableRow.dataset.id = application.id;
    tableRow.dataset.name = application.name;
    tableRow.dataset.url = application.url;
    tableRow.dataset.company = application.company;
    tableRow.dataset.position = application.position;
    tableRow.dataset.status = application.status;
    tableRow.dataset.notes = application.notes;
    tableRow.innerHTML =`
    <td>${application.name}</td>
    <td><a href="${application.url}">Link</a></td>
    <td>${application.company}</td>
    <td>${application.position}</td>
    <td>${application.status}</td>`
    tableBody.appendChild(tableRow)
}

function handleSubmit() {
    const name = jobNameInput.value
    const url = jobUrlInput.value
    const company = companyInput.value
    const position = positionInput.value
    const status = statusInput.value
    const notes = jobNotes.value

    const id = Date.now()

    if (!name || !url || !company || !position || !status) {
        alert("Fill out all fields");
        return;
    }

    let submissions = localStorage.getItem("applications")

    if (submissions === null) {
        const applications = []
        applications.push({id:`${id}`, name: `${name}`, url: `${url}`, company: `${company}`, position: `${position}`, status: `${status}`, notes: `${notes}`})
        localStorage.setItem("applications", JSON.stringify(applications))
        
        addRowToTable(applications[0])

        jobNameInput.value = ""
        jobUrlInput.value = ""
        companyInput.value = ""
        positionInput.value = ""
        statusInput.value = ""
        jobNotes.value = ""

        return
    }


    const applications = JSON.parse(submissions)
    const newApp = {id:`${id}`, name: `${name}`, url: `${url}`, company: `${company}`, position: `${position}`, status: `${status}`, notes: `${notes}`}
    applications.push(newApp)
    localStorage.setItem("applications", JSON.stringify(applications))
    addRowToTable(newApp)

    jobNameInput.value = ""
    jobUrlInput.value = ""
    companyInput.value = ""
    positionInput.value = ""
    statusInput.value = ""
    jobNotes.value = ""
    
}



function companyInputFilter () {
    const val1 = companyFilterInput.value
    const val2 = statusFilterInput.value

    if (val1 !== "" && val2 !== "") {
        const applications = JSON.parse(localStorage.getItem("applications"))

        const filtered = applications.filter((app) => app.company.toLowerCase() === val1.toLowerCase() && app.status.toLowerCase() === val2.toLowerCase())
        console.log(filtered)

        const tableBody = document.getElementById("tableBody")
        tableBody.innerHTML = ""

        filtered.forEach((element) => addRowToTable(element))
    }   else if (val1 !== "") {
        
        const applications = JSON.parse(localStorage.getItem("applications"))

        const filtered = applications.filter((app) => app.company.toLowerCase() === val1.toLowerCase())
        console.log(filtered)

        const tableBody = document.getElementById("tableBody")
        tableBody.innerHTML = ""

        filtered.forEach((element) => addRowToTable(element))
    }   else if (val2 !== "") {
        
        const applications = JSON.parse(localStorage.getItem("applications"))

        const filtered = applications.filter((app) => app.status.toLowerCase() === val2.toLowerCase())
        console.log(filtered)

        const tableBody = document.getElementById("tableBody")
        tableBody.innerHTML = ""

        filtered.forEach((element) => addRowToTable(element))
    }   
}

function handleClearBtn () {
    tableBody.innerHTML = ""
    companyFilterInput.value = ""
    statusFilterInput.value = ""
    console.log("Cleared Inputs")

    const submissions = localStorage.getItem("applications")
    const applications = JSON.parse(submissions)
    applications.forEach((element) => addRowToTable(element))
}

function handleAppDetail (row) {
    modalDiv.classList.toggle("detailActive")
    jobNameDetail.textContent = row.dataset.name;
    jobUrlDetail.textContent = row.dataset.url;
    companyDetail.textContent = row.dataset.company;
    positionDetail.textContent = row.dataset.position;
    statusDetail.textContent = row.dataset.status;
    currentEditedRow = row.dataset.id

    if (row.dataset.notes !== "") {
        noteDetail.textContent = `${row.dataset.notes}`
    } else {
        noteDetail.textContent = "No notes yet."
    }

    
}

function handleExitJobDetail () {
    modalDiv.classList.toggle("detailActive")
}

function saveEdit () {
    const name = document.querySelector("#jobNameDetail input").value;
    const url = document.querySelector("#jobUrlDetail input").value;
    const company = document.querySelector("#companyDetail input").value;
    const position = document.querySelector("#positionDetail input").value;
    const status = document.querySelector("#statusDetail select").value;
    const note = document.querySelector("#noteDetail input").value;

    jobNameDetail.textContent = name;
    jobUrlDetail.textContent = url;
    companyDetail.textContent = company;
    positionDetail.textContent = position;
    statusDetail.textContent = status;
    noteDetail.textContent = note || "No notes yet.";

    let applications = JSON.parse(localStorage.getItem("applications"))
    const row = applications.find(app => app.id == currentEditedRow)
    row.name = name
    row.url = url
    row.company = company
    row.position = position
    row.status = status
    row.notes = note

    const indexOfRow = applications.findIndex(app => app.id == currentEditedRow)

    applications[indexOfRow] = row

    localStorage.setItem("applications", JSON.stringify(applications))

    const tableBody = document.getElementById("tableBody")
    tableBody.innerHTML = ""

    applications.forEach((app) => {
        addRowToTable(app)
    })

    editInfoBtn.textContent = "Edit Info"
    editInfoBtn.removeEventListener("click", saveEdit)
    editInfoBtn.addEventListener("click", editInfoBtnClick)

    


    
}

function editInfoBtnClick () {
    const nameSpan = document.getElementById("jobNameDetail")
    const urlSpan = document.getElementById("jobUrlDetail")
    const companySpan = document.getElementById("companyDetail")
    const positionSpan = document.getElementById("positionDetail")
    const statusSpan = document.getElementById("statusDetail")
    const noteSpan = document.getElementById("noteDetail")

    let name = nameSpan.textContent
    let url = urlSpan.textContent
    let company = companySpan.textContent
    let position = positionSpan.textContent
    let status = statusSpan.textContent
    let note = noteSpan.textContent

    nameSpan.innerHTML = `<input value="${name}">`;
    urlSpan.innerHTML = `<input value="${url}">`;
    companySpan.innerHTML = `<input value="${company}">`;
    positionSpan.innerHTML = `<input value="${position}">`;
    statusSpan.innerHTML = `
    <select>
        <option value="applied" ${status === "applied" ? "selected" : ""}>Applied</option>
        <option value="interview" ${status === "interview" ? "selected" : ""}>Interview</option>
        <option value="rejected" ${status === "rejected" ? "selected" : ""}>Rejected</option>
        <option value="accepted" ${status === "accepted" ? "selected" : ""}>Accepted</option>
    </select>`;
    noteSpan.innerHTML = `<input value="${note}">`;

    editInfoBtn.textContent = "Update Info"

    editInfoBtn.removeEventListener("click", editInfoBtnClick)
    editInfoBtn.addEventListener("click", saveEdit)

}


function handleDelete () {
    let applications = JSON.parse(localStorage.getItem("applications"))
    const appToDelete = applications.findIndex(app => app.id == currentEditedRow)

    applications.splice(appToDelete, 1)
    localStorage.setItem("applications", JSON.stringify(applications))

    tableBody.innerHTML = ""
    applications.forEach( (app) => {
        addRowToTable(app)
    }
    )

    modalDiv.classList.toggle("detailActive")
}


submitBtn.addEventListener("click", handleSubmit)
filterBtn.addEventListener("click", () => {
    filterInputs.classList.toggle("filter-active")
})
filterSubmitBtn.addEventListener("click", companyInputFilter)
clearFiltersBtn.addEventListener("click", handleClearBtn)

tableBody.addEventListener("click", (event) => {
    const row = event.target.closest("tr")
    if (!row) return;
    handleAppDetail(row)
})

exitModalBtn.addEventListener("click", () => {
    modalDiv.classList.toggle("detailActive")
})

editInfoBtn.addEventListener("click", editInfoBtnClick)
deleteBtn.addEventListener("click", handleDelete)
