// api key UZlf5TsRjBj7F7C65i2ZlY6vFsthST56
//url format example http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5

var searchURL = "https://api.giphy.com/v1/gifs/search?q="
var q = "";
var limit = "&limit=10";
var addKey = "&api_key=UZlf5TsRjBj7F7C65i2ZlY6vFsthST56";

var keywords = ["Leslie Knope","Ron Swanson","April Ludgate","Ann Perkins","Tom Haverford","Donna Meagle"]

function makeButtons() {
    for(i=0; i<keywords.length; i++) {
        var b = $("<button>");
        b.attr("class","gifQuery")
        b.text(keywords[i]);
        $("#buttonDiv").append(b);
    }
}

//Create buttons for all items in the array
$(document).ready(function() {
    makeButtons();
});

$(document).on("click", ".gifQuery", function(event) {
    event.preventDefault();
    //Empty out the gifDiv to replace with new images
    $("#gifDiv").empty();
    q = $(this).text();
    //Query the GIPHY API for the text of the button that was clicked
    $.ajax({
        url: searchURL + q + limit + addKey,
        method: "GET"
    }).then(function(response){
        var r = response.data;
        //For each image, create a Bootstrap card. Also: store both still and animated URLs in data attributes.
        for(i=0; i<r.length; i++) {
            var card = $("<div>");
            var img = $("<img>");
            var text = $("<p>");
            card.attr("class","card text-center");
            img.attr("class","still card-image-top")
            img.attr("data-animate",r[i].images.fixed_width.url)
            img.attr("data-still", r[i].images.fixed_width_still.url);
            img.attr("src",r[i].images.fixed_width_still.url);
            text.attr("class","card-text");
            text.text(r[i].title);
            card.append(img);
            card.append(text);
            $("#gifDiv").append(card);
        } 
    });
});

//If we click a still image, change the source to the animated URL and change the switch (using class as switch here) to "animate"
$(document).on("click", ".still", function() {
    $(this).attr("src",$(this).data("animate"));
    $(this).attr("class","animate");
});

//If we click an animated image, change the source to the still URL and change the switch (using class as switch here) to "still"
$(document).on("click", ".animate", function() {
    $(this).attr("src",$(this).data("still"));
    $(this).attr("class","still");
});

//If we click "Add", add text input to keywords array and re-create buttons.
$(document).on("click", "#add", function(event) {
    event.preventDefault();
    var newKeyword = $("#toAdd").val();
    console.log(newKeyword);
    keywords.push(newKeyword);
    $("#buttonDiv").empty();
    makeButtons();
});

