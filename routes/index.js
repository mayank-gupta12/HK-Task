var express = require('express');
var router = express.Router();
const User = require("../model/taskModel")
const emailvalidator = require("email-validator");
// var express = require("express");
// var router = express.Router();
// var fs = require("fs");
// const Excel = require("exceljs");
// var path = require("path");


//----------Create---------//

router.get('/', function (req, res, next) {
  User.find()
    .then((tasks) => res.render('create', { tasks }))
    .catch(() => res.send(err))
});

//---------Show-----------//

router.get('/show', function (req, res, next) {
  User.find()
    .then((tasks) => res.render('show', { tasks }))
    .catch(() => res.send(err))
});

//----------Add----------//

router.post('/add', function (req, res, next) {
  const { name, mobile, taask, email } = req.body;
  if(!name,!mobile,!taask,!email){
    return res.send("<h1>Enter the full data <a href='/'>Back</a></h1>")
  }
  if(emailvalidator.validate(req.body.email)){
    User.create({ name, mobile, taask, email })
    .then(() => {
      res.redirect("/show")
    })
    .catch((err) => res.send(err))
}else{
 res.status(400).send('Invalid Email Id');
} 
});

//----------Delete----------//

router.get('/delete/:id', function (req, res, next) {
User.findByIdAndDelete(req.params.id)
    .then((Task) => {
      res.redirect("/show")
    })
    .catch((err) => res.send(err));
});

//-----------Excel----------//

// router.get("/", async function(req, res, next) {
//   try {
//     var workbook = new Excel.Workbook();
//     var worksheet = workbook.addWorksheet();

//     worksheet.columns = [
//       { header: "Name", key: "id", width: 10 },
//       { header: "Email", key: "name", width: 32 },
//       { header: "Mobile.", key: "DOB", width: 10 }
//     ];
//     worksheet.addRow({ Name: 1, Email: "John Doe", Mobile: new "123" });
//     worksheet.addRow({ Name: 2, Email: "Jane Doe", Mobile: new "123" });

//     workbook.xlsx
//       .writeFile("newSave.xl")
//       .then(response => {
//         console.log("file is written");
//         res.sendFile(path.join(__dirname, "../newSave.xl"));
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   } catch (err) {
//     console.log("OOOOOOO this is the error: " + err);
//   }
// });

module.exports = router;