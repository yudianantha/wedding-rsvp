// Google Map config


// Audio config
var rindik = document.getElementById("rindik");

function togglePlay(){
    return rindik.paused ? rindik.onplay() : rindik.onpause();
};