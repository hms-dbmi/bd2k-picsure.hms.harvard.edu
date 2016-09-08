$(document).ready(function () {
});

function runGetRequest(url, responseArea) {
    console.log("GET URL: " + url);
    $(responseArea).find("span").show();
    $.ajax( url )
        .done(function(response) {
            $(responseArea).empty();
            $(responseArea).jsonViewer(response, {collapsed: true, withQuotes: true});
        })
        .fail(function() {
            $(responseArea).empty();
            $(responseArea).text('There was an error in communicating with the server. Please try again later.');
    });
}

function runPostRequest(url, payload, responseArea) {
    console.log("POST URL: " + url);
    $(responseArea).find("span").show();
    $.post(url, payload)
        .done(function(response) {
            $(responseArea).empty();
            $(responseArea).jsonViewer(response, {collapsed: true, withQuotes: true});
        })
        .fail(function() {
            $(responseArea).empty();
            $(responseArea).text('There was an error in communicating with the server. Please try again later.');
    });
}