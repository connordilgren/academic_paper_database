// Citation:
// Date: 3/1/24
// Based on nodejs-starter-app
// This code's logic and structure is unoriginal. It has been adapted to work 
// for our group's schema. 
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main

// Get the objects we need to modify
let addAuthorForm = document.getElementById('add-author-form-ajax');

// Modify the objects we need
addAuthorForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFirstName = document.getElementById("input-fname");
    let inputMiddleName = document.getElementById("input-mname");
    let inputLastName = document.getElementById("input-lname");
    let inputEmail = document.getElementById("input-email");
    let inputWebsite = document.getElementById("input-website");
    let inputIsRetired = document.getElementById("input-isRetired");
    let inputHIndex = document.getElementById("input-hIndex");

    // Get the values from the form fields
    let firstNameValue = inputFirstName.value;
    let middleNameValue = inputMiddleName.value;
    let lastNameValue = inputLastName.value;
    let emailValue = inputEmail.value;
    let websiteValue = inputWebsite.value;
    let isRetiredValue = inputIsRetired.value;
    let hIndexValue = inputHIndex.value;

    // Put our data we want to send in a javascript object
    let data = {
        firstName: firstNameValue,
        middleName: middleNameValue,
        lastName: lastNameValue,
        email: emailValue,
        website: websiteValue,
        isRetired: isRetiredValue,
        hIndex: hIndexValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-author-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputFirstName.value = '';
            inputMiddleName.value = '';
            inputLastName.value = '';
            inputEmail.value = '';
            inputWebsite.value = '';
            inputIsRetired.value = '';
            inputHIndex.value = '';
            
            location.reload();
            
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
    let currentTable = document.getElementById("Authors-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let firstNameCell = document.createElement("TD");
    let middleNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");
    let emailCell = document.createElement("TD");
    let websiteCell = document.createElement("TD");
    let isRetiredCell = document.createElement("TD");
    let hIndexCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.authorID;
    firstNameCell.innerText = newRow.firstName;
    middleNameCell.innerText = newRow.middleName;
    lastNameCell.innerText = newRow.lastName;
    emailCell.innerText = newRow.email;
    websiteCell.innerText = newRow.website;
    isRetiredCell.innerText = newRow.isRetired;
    hIndexCell.innerText = newRow.hIndex;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteAuthor(newRow.authorID);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(firstNameCell);
    row.appendChild(middleNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(emailCell);
    row.appendChild(websiteCell);
    row.appendChild(isRetiredCell);
    row.appendChild(hIndexCell);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.authorID);
    
    // Add the row to the table
    currentTable.appendChild(row);
}