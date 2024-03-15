// Citation:
// Date: 3/6/24
// Based on nodejs-starter-app
// This code's logic and structure is unoriginal. It has been adapted to work 
// for our group's schema. 
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main

// Get the objects we need to modify
let addPaperAuthorForm = document.getElementById('add-paperAuthor-form-ajax');

// Modify the objects we need
addPaperAuthorForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputPaperID = document.getElementById("input-pname");
    let inputAuthorID = document.getElementById("input-aname");

    // Get the values from the form fields
    let paperIDValue = inputPaperID.value;
    let authorIDValue = inputAuthorID.value;

    // Put our data we want to send in a javascript object
    let data = {
        paperID: paperIDValue,
        authorID: authorIDValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-paperAuthor-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputPaperID.value = '';
            inputAuthorID.value = '';
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
    let currentTable = document.getElementById("PaperAuthors-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let paperNameCell = document.createElement("TD");
    let authorNameCell = document.createElement("TD");

    // Fill the cells with correct data
    paperNameCell.innerText = newRow.paperTitle;
    authorNameCell.innerText = newRow.authorLastName;

    // Add the cells to the row 
    row.appendChild(paperNameCell);
    row.appendChild(authorNameCell);
    
    // Add the row to the table
    currentTable.appendChild(row);
}