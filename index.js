var express = require('express');
var bodyParser = require("body-parser"); // Convert code js to json
var MongoClient = require("mongodb").MongoClient; // Access module to mongodb instantiated and client created

var mongodbURL = "mongodb://rafa:rafa@ds149855.mlab.com:49855/si1718-rgg-sandbox";

var app = express();

app.use(bodyParser.json()); // Use json middleware form the body-parser module

var baseURL = "/api/v1";

var contacts = [];

var db;

// Connect to mongodbURL and return the database
MongoClient.connect(mongodbURL, {native_parser:true}, (err, database) => {
    db = database.collection("contacts");
});


// Responds to the get method when the resource baseURL + '/contacts' is invoked
app.get(baseURL + '/contacts', function (req, res) {
    db.find({}).toArray((err, contacts) => { // Return an array which contains all contacts
        res.send(contacts);
    });
})


// Insert a new contact
app.post(baseURL + '/contacts', function (req, res) {
    var newContact = req.body; // Data inserted by the user
    
    contacts.push(newContact); // Insert
    
    res.send();
})


// Delete a contact
app.delete(baseURL + '/contacts', function (req, res) {
    contacts = [];
    
    res.send();
})


// Get a new contact
app.get(baseURL + '/contacts/:name', function (req, res) {
    var name = req.params.name;
    
    var filteredContacts = contacts.filter((c) => {
        return (c.name == name);
    });
    
    if (filteredContacts.length >= 1)
        res.send(filteredContacts[0]);
    else
        res.sendStatus(404);
})



app.listen(process.env.PORT);