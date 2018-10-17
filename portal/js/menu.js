function log(mesg) {
    document.getElementById("console").innerHTML += mesg +"<br>";
}

document.getElementById("input_reset").onclick = function() {
    document.getElementById("console").innerHTML = "";
}