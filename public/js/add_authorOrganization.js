// Citation:
// Date: 3/6/24
// Based on nodejs-starter-app
// This code's logic and structure is unoriginal. It has been adapted to work 
// for our group's schema. 
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main

// Get the objects we need to modify
let addAuthorOrganizationForm = document.getElementById('add-authorOrganization-form-ajax');

// Modify the objects we need
addAuthorOrganizationForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputOrgName = document.getElementById("input-orgName");
    let inputLastName = document.getElementById("input-lname");
    let inputStartDate = document.getElementById("input-startDate");
    let inputEndDate = document.getElementById("input-endDate");

    // Get the values from the form fields
    let orgNameValue = inputOrgName.value;
    let lastNameValue = inputLastName.value;
    let startDateValue = inputStartDate.value;
    let endDateValue = inputEndDate.value;

    // Put our data we want to send in a javascript object
    let data = {
        orgName: orgNameValue,
        lastName: lastNameValue,
        startDate: startDateValue,
        endDate: endDateValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-authorOrganization-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputOrgName.value = '';
            inputLastName.value = '';
            inputStartDate.value = '';
            inputEndDate.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("AuthorOrganizations-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let orgNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");
    let startDateCell = document.createElement("TD");
    let endDateCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.authorOrganizationID;
    orgNameCell.innerText = newRow.organizationName;
    lastNameCell.innerText = newRow.authorLastName;
    startDateCell.innerText = newRow.authorstartDate;
    endDateCell.innerText = newRow.authorEndDate;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(orgNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(startDateCell);
    row.appendChild(endDateCell);
    
    // Add the row to the table
    currentTable.appendChild(row);
}