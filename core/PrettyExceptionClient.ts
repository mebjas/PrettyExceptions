import { PrettyExceptionBuilder } from "./PrettyExceptionBuilder"

document.getElementById("input_add").onclick = function(evt) {
    var id = document.getElementById("input_id").nodeValue;
    var rawex = document.getElementById("input_re").nodeValue;
    alert(id);

    let peb = new PrettyExceptionBuilder(JSON.parse(rawex));
    peb.Print(document.getElementById("workspace"));
    evt.preventDefault();
};