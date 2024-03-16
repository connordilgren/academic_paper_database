// Citation:
// Date: 3/15/24
// Based on nodejs-starter-app
// This code's logic and structure is unoriginal. It has been adapted to work 
// for our group's schema. 
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main

// Get the objects we need to modify
let updatePaperAuthorForm = document.getElementById('update-paperAuthor-form-ajax');

// Modify the objects we need
updatePaperAuthorForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputPaperAuthorID = document.getElementById("paper-author-id-update");
    let inputPaperID = document.getElementById("input-pname-update");
    let inputAuthorID = document.getElementById("input-aname-update");

    // Get the values from the form fields
    let paperAuthorIDValue = inputPaperAuthorID.value;
    let paperIDValue = inputPaperID.value;
    let authorIDValue = inputAuthorID.value;
    
    // this database allows for null values for paperID and authorID

    // Put our data we want to send in a javascript object
    let data = {
        paperAuthor: paperAuthorIDValue,
        paperID: paperIDValue,
        authorID: authorIDValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-paperAuthor-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updatePaperAuthor(xhttp.response, paperAuthorID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

function editPaperAuthor(paperAuthorID) {
    let paperAuthorIDField = document.getElementById("paper-author-id-update");
    paperAuthorIDField.innerText = paperAuthorID;
}

function updatePaperAuthor(data, paperAuthorID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("PaperAuthors-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == paperAuthorID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let td_paperTitle = updateRowIndex.getElementsByTagName("td")[1];
            let td_authorLastName = updateRowIndex.getElementsByTagName("td")[2];

            // Reassign homeworld to our value we updated to
            td_paperTitle.innerHTML = parsedData[0].paperTitle; 
            td_authorLastName.innerHTML = parsedData[0].authorLastName;
       }
    }
}
