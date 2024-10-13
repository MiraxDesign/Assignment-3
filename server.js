/**********************************************************************************
 *  WEB700 – Assignment 03
 *  I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 *  No part of this assignment has been copied manually or electronically from any other source
 *  (including 3rd party web sites) or distributed to other students.
 *  Name: Uchime Miracle Chioma Student ID: 133177238 Date: October 10th, 2024
 **********************************************************************************/

 const express = require('express');
 const path = require('path');
 const collegeData = require('./collegeData');
 const app = express();
 const HTTP_PORT = process.env.PORT || 8080;
 
 app.get("/", (req, res) => {
     res.sendFile(path.join(__dirname, "/views/home.html"));
 });
 
 app.get("/about", (req, res) => {
     res.sendFile(path.join(__dirname, "/views/about.html"));
 });
 
 app.get("/htmlDemo", (req, res) => {
     res.sendFile(path.join(__dirname, "/views/htmlDemo.html"));
 });
 
 app.get("/students", (req, res) => {
     if (req.query.course) {
         collegeData.getStudentsByCourse(req.query.course)
             .then(data => res.json(data))
             .catch(err => res.json({ message: err }));
     } else {
         collegeData.getAllStudents()
             .then(data => res.json(data))
             .catch(err => res.json({ message: err }));
     }
 });
 
 app.get("/student/:num", (req, res) => {
     collegeData.getStudentByNum(req.params.num)
         .then(data => res.json(data))
         .catch(err => res.json({ message: err }));
 });
 
 app.get("/courses", (req, res) => {
     collegeData.getCourses()
         .then(data => res.json(data))
         .catch(err => res.json({ message: err }));
 });
 
 app.get("/tas", (req, res) => {
     collegeData.getTAs()
         .then(data => res.json(data))
         .catch(err => res.json({ message: err }));
 });
 
 app.use((req, res) => {
     res.status(404).send("Page Not Found");
 });
 
 collegeData.initialize()
     .then(() => {
         app.listen(HTTP_PORT, () => {
             console.log(`Server listening on port ${HTTP_PORT}`);
         });
     })
     .catch(err => {
         console.error(`Failed to start server: ${err}`);
     });
