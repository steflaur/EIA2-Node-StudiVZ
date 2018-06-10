/**
 * Simple server managing between client and database
 * @author: Jirka Dell'Oro-Friedl
 * modified: Laura Vogt
 */
"use strict";
const Http = require("http");
const Url = require("url");
console.log("Server starting");
let port = process.env.PORT;
if (port == undefined)
    port = 8100;
let server = Http.createServer();
server.addListener("listening", handleListen);
server.addListener("request", handleRequest);
server.listen(port);
let studentHomoAssoc = {};
function handleListen() {
    console.log("Listening on port: " + port);
}
function handleRequest(_request, _response) {
    console.log("Ich höre Stimmen!");
    let query = Url.parse(_request.url, true).query;
    console.log(query["command"]);
    if (query["command"]) {
        switch (query["command"]) {
            case "insert":
                insert(query, _response);
                break;
            case "refresh":
                refresh(_response);
                break;
            case "search":
                search(query, _response);
                break;
            default:
                error();
        }
    }
    _response.end();
}
function insert(query, _response) {
    let obj = JSON.parse(query["data"]);
    let _name = obj.name;
    let _firstname = obj.firstname;
    let matrikel = obj.matrikel.toString();
    let _age = obj.age;
    let _gender = obj.gender;
    let _studies = obj.studies;
    let student;
    student = {
        name: _name,
        firstname: _firstname,
        matrikel: parseInt(matrikel),
        age: _age,
        gender: _gender,
        studies: _studies
    };
    studentHomoAssoc[matrikel] = student;
    _response.write("Daten empfangen");
}
function refresh(_response) {
    console.log(studentHomoAssoc);
    for (let matrikel in studentHomoAssoc) {
        let student = studentHomoAssoc[matrikel];
        let line = matrikel + ": ";
        line += student.studies + ", " + student.name + ", " + student.firstname + ", " + student.age + " Jahre ";
        line += student.gender ? "(M)" : "(F)";
        _response.write(line + "\n");
    }
}
function search(query, _response) {
    let student = studentHomoAssoc[query["searchFor"]];
    if (student) {
        let line = query["searchFor"] + ": ";
        line += student.studies + ", " + student.name + ", " + student.firstname + ", " + student.age + " Jahre ";
        line += student.gender ? "(M)" : "(F)";
        _response.write(line);
    }
    else {
        _response.write("No Match");
    }
}
function error() {
    alert("Error");
}
//# sourceMappingURL=Server.js.map