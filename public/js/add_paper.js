// Citation:
// Date: 3/6/24
// Based on nodejs-starter-app
// This code's logic and structure is unoriginal. It has been adapted to work 
// for our group's schema. 
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main

// Get the objects we need to modify
let addPaperForm = document.getElementById('add-paper-form-ajax');

// Modify the objects we need
addPaperForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputTitle = document.getElementById("input-title");
    let inputYearPublished = document.getElementById("input-yearPublished");
    let inputNumCitations = document.getElementById("input-numCitations");
    let inputConference = document.getElementById("input-conference");

    // Get the values from the form fields
    let titleValue = inputTitle.value;
    let yearPublishedValue = inputYearPublished.value;
    let numCitationsValue = inputNumCitations.value;
    let conferenceValue = inputConference.value;

    // Put our data we want to send in a javascript object
    let data = {
        title: titleValue,
        yearPublished: yearPublishedValue,
        numCitations: numCitationsValue,
        conference: conferenceValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-paper-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputTitle.value = '';
            inputYearPublished.value = '';
            inputNumCitations.value = '';
            inputConference.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("Papers-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let titleCell = document.createElement("TD");
    let yearPublishedCell = document.createElement("TD");
    let numCitationsCell = document.createElement("TD");
    let conferenceCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.paperID;
    titleCell.innerText = newRow.title;
    yearPublishedCell.innerText = newRow.yearPublished;
    numCitationsCell.innerText = newRow.numCitations;
    conferenceCell.innerText = newRow.conference;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(titleCell);
    row.appendChild(yearPublishedCell);
    row.appendChild(numCitationsCell);
    row.appendChild(conferenceCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.paperID);
    
    // Add the row to the table
    currentTable.appendChild(row);
}