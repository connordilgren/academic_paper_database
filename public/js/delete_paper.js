// Citation:
// Date: 3/7/24
// Based on nodejs-starter-app
// This code's logic and structure is unoriginal. It has been adapted to work 
// for our group's schema. 
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main

function deletePaper(paperID) {
    let link = '/delete-paper-ajax/';
    let data = {
      paperID: paperID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(paperID);
      }
    });
  }
  
  function deleteRow(paperID){
      let table = document.getElementById("Papers-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == paperID) {
              table.deleteRow(i);
              break;
         }
      }
  }