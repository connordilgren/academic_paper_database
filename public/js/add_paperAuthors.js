// Citation:
// Date: 3/1/24
// Based on nodejs-starter-app
// This code's logic and structure is unoriginal. It has been adapted to work 
// for our group's schema. 
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main

// Get the objects we need to modify
let addPaperAuthorsForm = document.getElementById('add-paperAuthors-form-ajax');

// Modify the objects we need
addPaperAuthorsForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputPaper = document.getElementById("input-paper");
    let inputAuthor = document.getElementById("input-author");

    // Get the values from the form fields
    let paperValue = inputPaper.value;
    let authorValue = inputAuthor.value;

    // Put our data we want to send in a javascript object
    let data = {
        paper: paperValue,
        author: authorValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-paperAuthors-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputPaper.value = '';
            inputAuthor.value = '';
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
    let paperIdCell = document.createElement("TD");
    let authorIdCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    paperIdCell.innerText = newRow.paperID;
    authorIdCell.innerText = newRow.authorID;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deletePaper(newRow.paperID);
        deleteAuthor(newRow.auhtorID);
    };

    // Add the cells to the row 
    row.appendChild(paperIdCell);
    row.appendChild(authorIdCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.paperID);
    row.setAttribute('data-value', newRow.authorID);
    
    // Add the row to the table
    currentTable.appendChild(row);
}
