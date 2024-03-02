// Citation:
// Date: 3/1/24
// Based on nodejs-starter-app
// This code's logic and structure is unoriginal. It has been adapted to work 
// for our group's schema. 
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main

function deleteAuthor(authorID) {
    let link = '/delete-author-ajax/';
    let data = {
      authorID: authorID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(authorID);
      }
    });
  }
  
  function deleteRow(authorID){
      let table = document.getElementById("Authors-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == authorID) {
              table.deleteRow(i);
              break;
         }
      }
  }