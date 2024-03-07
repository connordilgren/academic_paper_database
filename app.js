// Citation:
// Date: 3/1/24
// Based on nodejs-starter-app
// This code's logic and structure is unoriginal. It has been adapted to work 
// for our group's schema. 
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main

// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT        = 52738;                 // Set a port number at the top so it's easy to change in the future

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


// Database
var db = require('./database/db-connector')

/*
    ROUTES
*/
app.get('/', function(req, res)
    {
        res.render('index');
    });

app.get('/authors', function(req, res)
    {  
        let query1 = "SELECT * FROM Authors;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('authors', {data: rows});                  // Render the authors.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

// app.js - ROUTES section

app.post('/add-author-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let firstName = parseInt(data.firstName);
    if (isNaN(firstName))
    {
        firstName = 'NULL'
    }

    let middleName = parseInt(data.middleName);
    if (isNaN(middleName))
    {
        middleName = 'NULL'
    }

    let email = parseInt(data.email);
    if (isNaN(email))
    {
        email = 'NULL'
    }

    let websiteURL = parseInt(data.websiteURL);
    if (isNaN(websiteURL))
    {
        websiteURL = 'NULL'
    }

    let isRetired = parseInt(data.isRetired);
    if (isNaN(isRetired))
    {
        isRetired = 'NULL'
    }

    let hIndex = parseInt(data.hIndex);
    if (isNaN(hIndex))
    {
        hIndex = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Authors (firstName, middleName, lastName, email, websiteURL, isRetired, hIndex) VALUES ('${firstName}', '${middleName}', '${data.lastName}', '${email}', '${websiteURL}', '${isRetired}', '${hIndex}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on bsg_people
            query2 = `SELECT * FROM Authors;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-author-ajax/', function(req,res,next){
    let data = req.body;
    let authorID = parseInt(data.authorID);
    let deleteAuthor = `DELETE FROM Authors WHERE authorID = ?`;  

          // Run the query
          db.pool.query(deleteAuthor, [authorID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {
                res.sendStatus(204);
              }
  })});

app.get('/authorOrganizations', function(req, res)
{  
    let query1 = "SELECT authorOrganizationID, Organizations.name AS organizationName, Authors.lastName AS authorLastName, authorstartDate, authorEndDate FROM AuthorOrganizations INNER JOIN Organizations ON AuthorOrganizations.organizationID = Organizations.organizationID INNER JOIN Authors ON AuthorOrganizations.authorID = Authors.authorID;";               // Define our query

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('authorOrganizations', {data: rows});                  // Render the authorOrganizations.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query


/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://flip2.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.')
});
