
// Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called topics.

// VARIALBES-------------------------------------------
// Your app should take the topics in this array and create buttons in your HTML.
var topics = ["ron burgundy", "champion kind", "brian fontana", "veronica corningstone", "brick townsend", "wes mantooth", "dorothy mantooth"];
var gifName;



//FUNCTIONS-------------------------------------------

//function to call Gify API based on button "data-value" string
function startButtonList(topics) {	
	//for loop iterates through the topics array
	for (i=0; i<topics.length; i++) {
		//declare a parent div tag as a tile container for the button
		var newButtonDiv = $("<div class=\"col-sm-3\">");
		//declare a variable set a button tag
		var newButton = $("<button>");
		newButton.addClass("gif-button btn btn-default");
		//jquery set attribute value for button's "data-value" to the value of topics[i]
		newButton.attr("data-value", topics[i]).html(topics[i]);
		//append the button as a child of the Div tag 
		newButtonDiv.append(newButton);
		//append newButtonDiv to with a class of "button-list-container"
		$(".button-list-container").append(newButtonDiv);
	}
}

//clear out gifs before populating new list
function clearGifs() {
	$(".gif-container-list").html("");
}
//DO STUFF WITH THE VARIABLES AND FUNCTIONS----------------------------------------

startButtonList(topics);

//create a new gif button from the input field
$("#make-button").on("click", function(event) {
	//To Do: disable button click if the input field is empty

	event.preventDefault();
	var thisGif = $("#new-gif").val();
	console.log(thisGif + " is a " + typeof thisGif);

	if (thisGif != "") {
//create a button tag with the thisGif as the button's "data-value"
	var newButtonDiv = $("<div class=\"col-sm-3\">");
	var newButton = $("<button>");
	newButton.addClass("gif-button btn btn-default");
	//jquery set attribute value for button's "data-value" to the value of topics[i]
	newButton.attr("data-value", thisGif).html(thisGif).attr("id", "click-me");
	//append the button as a child of the button tag with a class of "button-list-container"
	newButtonDiv.append(newButton);
	$(".button-list-container").append(newButtonDiv);
	//after the new button is created, clear the input's "data-value"
	$("#new-gif").val("");
	}
});

//test created button
$("#click-me").on("click", function() {
	console.lot("The button works")
});
	
// When the user clicks on a button show a list of gifs for that button
$(document.body).on("click", '.gif-button', function() {
	clearGifs();
	console.log($(this).attr("data-value"));
	gifName = $(this).attr("data-value");
	console.log(gifName + " is a " + typeof gifName);
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifName + "&limit=10&rating=g&rating=pg&api_key=dc6zaTOxFJmzC";
	
	//AJAX get request these parameters: limit=10, 
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(res) {
		console.log(res.data);
		console.log(res.data[0]);
		//create a for loop to run 10 times
		for (i=0; i<res.data.length; i++) {	
		//Assign these values from the response object to variables
			//still url
			var stillURL = res.data[i].images.fixed_height_small.url;
			//animated url
			var animatedURL = res.data[i].images.fixed_height_small_still.url;
			//rating 
			var rating = res.data[i].rating;
		//create div tag that is assigned to a variable 
			var newGifDiv = $("<div class=\"col-sm-3\">");

			//set the class of these child div tags to "gif-container"
			newGifDiv.addClass("gif-container ");

			//append a p tag with the rating to the gif-container div 
			newGifDiv.append("<p>Rating: " + rating + "</p>");


			//create img tag that is assigned to a variable 
			var newGifImg = $("<img>");
			//set attributes for img tag
			newGifImg.attr("src", stillURL).attr("data-still", stillURL).attr("data-animate", animatedURL).attr("data-state", "still").addClass("gif");

			//append the img tag as a child of the gif-container div 
			newGifDiv.append(newGifImg);

			//append "gif-holder" div tag as a child of the div tag with the "gif-container-list" ID
			$(".gif-container-list").append(newGifDiv);
		}
		
	});
	
});
// When the user clicks one of the GIPHY images

$(document.body).on("click", '.gif', function() {
	var gifState = $(this).attr("data-state");
	var gifAnimate = $(this).attr("data-animate");
	var gifStill = $(this).attr("data-still");

	//the gif should animate if it was still
	if (gifState === "still") {
		$(this).attr("src", gifAnimate);
		$(this).attr("data-state", "animate");
	} else {
		//the gif should freeze if it was animated
		$(this).attr("src", gifStill);
		$(this).attr("data-state", "still");
	}
});

//----------------------------------------

