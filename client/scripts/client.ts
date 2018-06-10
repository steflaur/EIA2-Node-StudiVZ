
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

namespace A08 {
    window.addEventListener("load", init);
    let address: string = "https://studi-vz.herokuapp.com/";

    let inputs: NodeListOf<HTMLInputElement> = document.getElementsByTagName("input");
    
    //init
    function init(_event: Event): void {
        console.log("#call init");
        let insertButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("insertButt");
        let refreshButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("refreshButt");
        let searchButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("searchButt");
        insertButton.addEventListener("click", insert);
        refreshButton.addEventListener("click", refresh);
        searchButton.addEventListener("click", search);
    }

    // client commands   
    // insert command
    function insert(_event: Event): void {
        console.log("#call insert");

        let genderButton: HTMLInputElement = <HTMLInputElement>document.getElementById("male");
        let selectOpt: HTMLSelectElement = <HTMLSelectElement>document.getElementById("select");
        let matrikel: string = inputs[2].value;

        let student: StudentData;
        student = {
            name: inputs[0].value,
            firstname: inputs[1].value,
            matrikel: parseInt(matrikel),
            studies: selectOpt.value,
            age: parseInt(inputs[3].value)
            //gender: genderButton.checked,
        };

        let convert: string = JSON.stringify(student);
        console.log(convert);
        let query: string = "?command=insert" + "&data=" + convert;

        sendRequest(query, handleInsertResponse);
    }

    // refresh command
    function refresh(_event: Event): void {
        console.log("#call refresh");
        let query: string = "?command=refresh";
        sendRequest(query, handleRefreshResponse)

    }

    // search command
    function search(_event: Event): void {
        console.log("#call search");
        let mtrkl: string = inputs[6].value;
        let query: string = "?command=search&searchFor=" + mtrkl;

        sendRequest(query, handleSearchResponse);
    }

    // send data to server
    // send Request
    function sendRequest(_query: string, _callback: EventListener): void {
        console.log("#call sendRequest");
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("GET", address + _query, true);
        xhr.addEventListener("readystatechange", _callback);
        xhr.send();
    }

    // handle server response
    // insert response
    function handleInsertResponse(_event: ProgressEvent): void {
        console.log("#call insert response");
        let xhr: XMLHttpRequest = (<XMLHttpRequest>_event.target);
        if (xhr.readyState == XMLHttpRequest.DONE) {
            alert(xhr.response);
        }
    }

    // refresh response
    function handleRefreshResponse(_event: ProgressEvent): void {
        console.log("#call refresh response");
        let output: HTMLTextAreaElement = document.getElementsByTagName("textarea")[0];
        output.value = "";
        let xhr: XMLHttpRequest = (<XMLHttpRequest>_event.target);
        if (xhr.readyState == XMLHttpRequest.DONE) {
            output.value += xhr.response;
        }
    }

    // search response
    function handleSearchResponse(_event: ProgressEvent): void {
        console.log("#call search response");
        let output: HTMLTextAreaElement = document.getElementsByTagName("textarea")[1];
        output.value = "";
        let xhr: XMLHttpRequest = (<XMLHttpRequest>_event.target);
        if (xhr.readyState == XMLHttpRequest.DONE) {
            output.value += xhr.response;
        }
    }

}//namespace close            
