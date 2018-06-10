/*
Aufgabe 08: StudiVZ
Name: Laura Vogt
Matrikel: 256056
Datum: 10.Jun18

Hiermit versichere ich, dass ich diesen
Code selbst geschrieben habe. Er wurde
nicht kopiert und auch nicht diktiert.

*Code aus A06 übernommen und angepasst

*/
var A08;
(function (A08) {
    window.addEventListener("load", init);
    let address = "https://studi-vz.herokuapp.com/";
    let inputs = document.getElementsByTagName("input");
    //init
    function init(_event) {
        console.log("#call init");
        let insertButton = document.getElementById("insertButt");
        let refreshButton = document.getElementById("refreshButt");
        let searchButton = document.getElementById("searchButt");
        insertButton.addEventListener("click", insert);
        refreshButton.addEventListener("click", refresh);
        searchButton.addEventListener("click", search);
    }
    // client commands   
    // insert command
    function insert(_event) {
        console.log("#call insert");
        let genderButton = document.getElementById("male");
        let selectOpt = document.getElementById("select");
        let matrikel = inputs[2].value;
        let student;
        student = {
            name: inputs[0].value,
            firstname: inputs[1].value,
            matrikel: parseInt(matrikel),
            studies: selectOpt.value,
            age: parseInt(inputs[3].value)
        };
        let convert = JSON.stringify(student);
        console.log(convert);
        let query = "?command=insert" + "&data=" + convert;
        sendRequest(query, handleInsertResponse);
    }
    // refresh command
    function refresh(_event) {
        console.log("#call refresh");
        let query = "?command=refresh";
        sendRequest(query, handleRefreshResponse);
    }
    // search command
    function search(_event) {
        console.log("#call search");
        let mtrkl = inputs[6].value;
        let query = "?command=search&searchFor=" + mtrkl;
        sendRequest(query, handleSearchResponse);
    }
    // send data to server
    // send Request
    function sendRequest(_query, _callback) {
        console.log("#call sendRequest");
        let xhr = new XMLHttpRequest();
        xhr.open("GET", address + _query, true);
        xhr.addEventListener("readystatechange", _callback);
        xhr.send();
    }
    // handle server response
    // insert response
    function handleInsertResponse(_event) {
        console.log("#call insert response");
        let xhr = _event.target;
        if (xhr.readyState == XMLHttpRequest.DONE) {
            alert(xhr.response);
        }
    }
    // refresh response
    function handleRefreshResponse(_event) {
        console.log("#call refresh response");
        let output = document.getElementsByTagName("textarea")[0];
        output.value = "";
        let xhr = _event.target;
        if (xhr.readyState == XMLHttpRequest.DONE) {
            output.value += xhr.response;
        }
    }
    // search response
    function handleSearchResponse(_event) {
        console.log("#call search response");
        let output = document.getElementsByTagName("textarea")[1];
        output.value = "";
        let xhr = _event.target;
        if (xhr.readyState == XMLHttpRequest.DONE) {
            output.value += xhr.response;
        }
    }
})(A08 || (A08 = {})); //namespace close            
//# sourceMappingURL=client.js.map