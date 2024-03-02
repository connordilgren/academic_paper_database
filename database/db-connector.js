// Citation:
// Date: 3/1/24
// Based on nodejs-starter-app
// This code is unoriginal outside of the values of the user, password, and 
// database values.
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main

// ./database/db-connector.js

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_dilgrenc',
    password        : '0486',
    database        : 'cs340_dilgrenc'
})

// Export it for use in our applicaiton
module.exports.pool = pool;