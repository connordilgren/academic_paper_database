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
PORT        = 52739;                 // Set a port number at the top so it's easy to change in the future

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


// Database
var db = require('./database/db-connector')

// index

app.get('/', function(req, res)
    {
        res.render('index');
    });


// authors

app.get('/authors', function(req, res)
{  
    let query1 = "SELECT * FROM Authors;";                  // Define our query

    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        res.render('authors', {data: rows});                // Render the authors.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query

app.post('/add-author-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let firstName = data.firstName;
    let middleName = data.middleName;
    let email = data.email;
    let website = data.website;
    let isRetired = data.isRetired;
    let hIndex = data.hIndex;

    if (firstName.length === 0) {
        firstName = null;
    }
    if (middleName.length === 0) {
        middleName = null;
    }
    if (email.length === 0) {
        email = null;
    }
    if (website.length === 0) {
        website = null;
    }
    if (isRetired.length === 0) {
        isRetired = null;
    }
    if (hIndex.length === 0) {
        hIndex = null;
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Authors (firstName, middleName, lastName, email, websiteURL, isRetired, hIndex) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.pool.query(query1, [firstName, middleName, data.lastName, email, website, isRetired, hIndex], function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT
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


// author organizations

app.get('/authorOrganizations', function(req, res)
{  
    let query1 = "SELECT authorOrganizationID, Organizations.name AS organizationName, Authors.lastName AS authorLastName, authorstartDate, authorEndDate FROM AuthorOrganizations INNER JOIN Organizations ON AuthorOrganizations.organizationID = Organizations.organizationID INNER JOIN Authors ON AuthorOrganizations.authorID = Authors.authorID ORDER BY authorOrganizationID ASC;";               // Define our query
    let query2 = "SELECT organizationID, name FROM Organizations";
    let query3 = "SELECT authorID, lastName FROM Authors";
    
    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        let authorOrganizations = rows;

        db.pool.query(query2, (error, rows, fields) => {

            let organizations = rows;

            db.pool.query(query3, (error, rows, fields) => {

                let authors = rows;

                res.render('authorOrganizations', {data: authorOrganizations, organizations: organizations, authors: authors});
            })
        })
    })
});

app.post('/add-authorOrganization-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values

    // Create the query and run it on the database
    query1 = `INSERT INTO AuthorOrganizations (organizationID, authorID, authorstartDate, authorEndDate) VALUES ('${data.orgName}', '${data.lastName}', '${data.startDate}', '${data.endDate}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT
            query2 = "SELECT authorOrganizationID, Organizations.name AS organizationName, Authors.lastName AS authorLastName, authorstartDate, authorEndDate FROM AuthorOrganizations INNER JOIN Organizations ON AuthorOrganizations.organizationID = Organizations.organizationID INNER JOIN Authors ON AuthorOrganizations.authorID = Authors.authorID ORDER BY authorOrganizationID ASC;";
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


// papers

app.get('/papers', function(req, res)
{  
    let query1 = "SELECT paperID, title, yearPublished, numCitations, Conferences.name AS conference FROM Papers LEFT JOIN Conferences ON Papers.conferenceID = Conferences.conferenceID ORDER BY paperID ASC;";
    let query2 = "SELECT conferenceID, name FROM Conferences;";
    
    db.pool.query(query1, function(error, rows, fields){    // Execute the query

        let papers = rows;

        db.pool.query(query2, (error, rows, fields) => {

            let conferences = rows;

            res.render('papers', {data: papers, conferences: conferences});

        })
    })
});

app.post('/add-paper-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let numCitations = data.numCitations;
    let conference = data.conference;

    if (numCitations.length === 0) {
        numCitations = null;
    }
    if (conference.length === 0) {
        conference = null
    }

    query1 = `INSERT INTO Papers (title, yearPublished, numCitations, conferenceID) VALUES (?, ?, ?, ?)`;

    // Create the query and run it on the database
    db.pool.query(query1, [data.title, data.yearPublished, numCitations, conference], function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT
            query2 = "SELECT paperID, title, yearPublished, numCitations, Conferences.name AS conference FROM Papers LEFT JOIN Conferences ON Papers.conferenceID = Conferences.conferenceID ORDER BY paperID ASC;";
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

app.delete('/delete-paper-ajax/', function(req,res,next){
    let data = req.body;

    let paperID = parseInt(data.paperID);
    let deletePaper = `DELETE FROM Papers WHERE paperID = ?`;

          // Run the 1st query
          db.pool.query(deletePaper, [paperID], function(error, rows, fields){
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


// conferences

app.get('/conferences', function(req, res)
    {  
        let query1 = "SELECT * FROM Conferences;";

        db.pool.query(query1, function(error, rows, fields){

            res.render('conferences', {data: rows});
        })
    });

app.post('/add-conference-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values for city, country, and isOnline
    let city = data.city;
    let country = data.country;
    let isOnline = data.isOnline;

    if (city.length === 0) {
        city = null;
    }
    if (country.length === 0) {
        country = null;
    }
    if (isOnline.length === 0) {
        isOnline = null;
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Conferences (name, year, city, country, isOnline) VALUES (?, ?, ?, ?, ?)`;

    db.pool.query(query1, [data.conName, data.year, city, country, isOnline], function (error, rows, fields) {

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT
            query2 = "SELECT * FROM Conferences;";
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


/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://flip2.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.')
});
