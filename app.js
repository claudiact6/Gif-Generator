// api key UZlf5TsRjBj7F7C65i2ZlY6vFsthST56
//url format example http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5

var searchURL = "https://api.giphy.com/v1/gifs/search?q="
var q = "";
var limit = "&limit=10";
var addKey = "&api_key=UZlf5TsRjBj7F7C65i2ZlY6vFsthST56";

var keywords = ["Leslie Knope","Ron Swanson","April Ludgate","Ann Perkins","Tom Haverford","Donna Meagle"]

$(document).ready(function() {
    for(i=0; i<keywords.length; i++) {
        var b = $("<button>");
        b.attr("class","gifQuery")
        b.text(keywords[i]);
        $("#buttonDiv").append(b);
    }
});

$(document).on("click", ".gifQuery", function(event) {
    event.preventDefault();
    $("#gifDiv").empty();
    q = $(this).text();
    console.log(searchURL + q + limit + addKey);
    $.ajax({
        url: searchURL + q + limit + addKey,
        method: "GET"
    }).then(function(response){
        var r = response.data;
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

$(document).on("click", ".still", function() {
    $(this).attr("src",$(this).data("animate"));
    $(this).attr("class","animate");
});

$(document).on("click", ".animate", function() {
    $(this).attr("src",$(this).data("still"));
    $(this).attr("class","still");
});


