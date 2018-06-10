/**
 * Simple server managing between client and database
 * @author: Jirka Dell'Oro-Friedl
 * modified: Laura Vogt
 */
"use strict";
const Http = require("http");
const Url = require("url");
const Database = require("./Database");
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
    console.log("Request received");
    let query = Url.parse(_request.url, true).query;
    var command = query["command"];
    switch (command) {
        case "insert":
            let student = {
                name: query["name"],
                firstname: query["firstname"],
                studies: query["studies"],
                matrikel: parseInt(query["matrikel"]),
                age: parseInt(query["age"])
            };
            Database.insert(student);
            respond(_response, "storing data");
            break;
        case "refresh":
            Database.refresh(function (json) {
                respond(_response, json);
            });
            break;
        case "search":
            let matrikel = { matrikel: parseInt(query["matrikel"]) };
            Database.search(matrikel, function (json) {
                respond(_response, json);
            });
            break;
        default:
            respond(_response, "unknown command: " + command);
            break;
    }
}
function respond(_response, _text) {
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.write(_text);
    _response.end();
}
//# sourceMappingURL=Server.js.map