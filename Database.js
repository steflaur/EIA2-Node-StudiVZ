/**
 * Simple database insertion and query for MongoDB
 * @author: Jirka Dell'Oro-Friedl
 * modified: Laura Vogt
 */
"use strict";
const Mongo = require("mongodb");
console.log("Database starting");
let databaseURL = "mongodb://stefdemo:test123@ds147420.mlab.com:47420/studi-vz";
let databaseName = "Test";
let db;
let students;
// wenn wir auf heroku sind...
if (process.env.NODE_ENV == "production") {
    //    databaseURL = "mongodb://username:password@hostname:port/database";
    databaseURL = "mongodb://stefdemo:test123@ds147420.mlab.com:47420/studi-vz";
    databaseName = "studi-vz";
}
// handleConnect wird aufgerufen wenn der Versuch, die Connection zur Datenbank herzustellen, erfolgte
Mongo.MongoClient.connect(databaseURL, handleConnect);
function handleConnect(_e, _db) {
    if (_e)
        console.log("Unable to connect to database, error: ", _e);
    else {
        console.log("Connected to database!");
        db = _db.db(databaseName);
        students = db.collection("students");
    }
}
function insert(_doc) {
    students.insertOne(_doc, handleInsert);
}
exports.insert = insert;
function handleInsert(_e) {
    console.log("Database insertion returned -> " + _e);
}
function refresh(_callback) {
    var cursor = students.find();
    cursor.toArray(prepareAnswer);
    function prepareAnswer(_e, studentArray) {
        if (_e)
            _callback("Error" + _e);
        else
            _callback(JSON.stringify(studentArray));
    }
}
exports.refresh = refresh;
function search(_s, _callback) {
    var cursor = students.find(_s);
    cursor.toArray(prepareAnswer);
    function prepareAnswer(_e, studentArray) {
        if (_e)
            _callback("Error" + _e);
        else
            _callback(JSON.stringify(studentArray));
    }
}
exports.search = search;
//# sourceMappingURL=Database.js.map