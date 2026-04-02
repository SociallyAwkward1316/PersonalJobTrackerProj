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



window.onload = function () {
    const applications = JSON.parse(localStorage.getItem("applications"))

    if (applications === null) {
        return
    }

    applications.forEach(element => {
        addRowToTable(element)
    });

}


function addRowToTable(application) {
    const tableBody = document.getElementById("tableBody")
    const tableRow = document.createElement("tr")
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

    if (!name || !url || !company || !position || !status) {
        alert("Fill out all fields");
        return;
    }

    let submissions = localStorage.getItem("applications")

    if (submissions === null) {
        const applications = []
        applications.push({name: `${name}`, url: `${url}`, company: `${company}`, position: `${position}`, status: `${status}`, notes: `${notes}`})
        localStorage.setItem("applications", JSON.stringify(applications))
        
        addRowToTable(applications[0])

        return
    }


    const applications = JSON.parse(submissions)
    const newApp = {name: `${name}`, url: `${url}`, company: `${company}`, position: `${position}`, status: `${status}`, notes: `${notes}`}
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
    }   ``
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
    if (row.dataset.notes !== "") {
        noteDetail.textContent = `${row.dataset.notes}`
    } else {
        noteDetail.textContent = "No notes yet."
    }

    
}

function handleExitJobDetail () {
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

