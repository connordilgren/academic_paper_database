// Citation:
// Date: 3/1/24
// Based on nodejs-starter-app
// This code's logic and structure is unoriginal. It has been adapted to work 
// for our group's schema. 
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main

// Get the objects we need to modify
let addConferencesForm = document.getElementById('add-conferences-form-ajax');

// Modify the objects we need
addConferencesForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputConferenceName = document.getElementById("input-cname");
    let inputYear = document.getElementById("input-year");
    let inputCity = document.getElementById("input-city");
    let inputCountry = document.getElementById("input-country");
    let inputIsOnline = document.getElementById("input-isOnline");

    // Get the values from the form fields
    let conferenceNameValue = inputConferenceName.value;
    let yearValue = inputYear.value;
    let cityValue = inputCity.value;
    let countryValue = inputCountry.value;
    let isOnlineValue = inputIsOnline.value;

    // Put our data we want to send in a javascript object
    let data = {
        conName: conferenceNameValue,
        year: yearValue,
        city: cityValue,
        country: countryValue,
        isOnline: isOnlineValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-conference-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputConferenceName.value = '';
            inputYear.value = '';
            inputCity.value = '';
            inputCountry.value = '';
            inputIsOnline.value = '';
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
    let currentTable = document.getElementById("Conferences-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let conferenceNameCell = document.createElement("TD");
    let yearCell = document.createElement("TD");
    let cityCell = document.createElement("TD");
    let countryCell = document.createElement("TD");
    let isOnlineCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.conferenceID;
    conferenceNameCell.innerText = newRow.name;
    yearCell.innerText = newRow.year;
    cityCell.innerText = newRow.city;
    countryCell.innerText = newRow.country;
    isOnlineCell.innerText = newRow.isOnline;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(conferenceNameCell);
    row.appendChild(yearCell);
    row.appendChild(cityCell);
    row.appendChild(countryCell);
    row.appendChild(isOnlineCell);
    
    // Add the row to the table
    currentTable.appendChild(row);
}
