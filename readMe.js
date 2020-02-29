const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

// * Title
//   * Description
//   * Table of Contents
//   * Installation
//   * Usage
//   * License
//   * Contributing
//   * Tests
//   * Questions

function promptUser() {
    return inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "What would you like to title this document?"
      },
      {
        type: "input",
        name: "description",
        message: "Describe this document/assignment here. "
      },
      {
        type: "input",
        name: "tableContents",
        message: "Bullet point the different sections of this document. "
      },
      {
        type: "input",
        name: "usageAndLicense",
        message: "State your usage and licene agreement. "
      },
      {
        type: "input",
        name: "contributors",
        message: "List the contributors. "
      },
      {
        type: "input",
        name: "questions",
        message: "Questions? "
      }
    ]);
  }
  
  function generateHTML(answers) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
      <link rel="stylesheet" href="style.css">
      <title>Document</title>
    </head>
    <body>
      <div class="container">
          <h1 class="display-4">${answers.title}</h1>
          <p class="description">${answers.description}.</p>
          <p class="bulletContents">${answers.tableContents}</p>
          <p class="usage/license">${answers.usageAndLicense}</p>
          <p class="contributors">${answers.contributors}</p>
          <p class="questions">${answers.questions}</p>
      </div>
    </div>
    </body>
    </html>`
  }

  promptUser()
  .then(function(answers) {
    const html = generateHTML(answers);

    return writeFileAsync("index.html", html);
  })
  .then(function() {
    console.log("Successfully wrote to index.html");
  })
  .catch(function(err) {
    console.log(err);
  });