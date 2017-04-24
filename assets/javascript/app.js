
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
		//declate a variable set a button tag
		var newButton = $("<button>");
		newButton.addClass("gif-button");
		//jquery set attribute value for button's "data-value" to the value of topics[i]
		newButton.attr("data-value", topics[i]).html(topics[i]);
		//append the button as a child of the button tag with a class of "button-list-container"
		$(".button-list-container").append(newButton);
	}
}


//DO STUFF WITH THE VARIABLES AND FUNCTIONS----------------------------------------

startButtonList(topics);

//create a new gif button from the input field
$("#make-button").on("click", function(event) {
	//disable button click if the input field is empty


	event.preventDefault();
	var thisGif = $("#new-gif").val();
//create a button tag with the thisGif as the button's "data-value"
	 var newButton = $("<button>");
	 newButton.addClass("gif-button")
	//jquery set attribute value for button's "data-value" to the value of topics[i]
	newButton.attr("data-value", thisGif).html(thisGif);
	//append the button as a child of the button tag with a class of "button-list-container"
	$(".button-list-container").append(newButton);
	//after the new button is created, clear the input's "data-value"
	$("#new-gif").val("");
});
	
// When the user clicks on a button show a list of gifs for that button
$(".gif-button").on("click", function() {
	console.log("this: " + this);
	gifName = $(this).attr("data-value");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifName + "&limit=10&rating=g&rating=pg&rating=pg-13&api_key=dc6zaTOxFJmzC";
	
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
			var newGifDiv = $("<div>");
			//set the class of these child div tags to "gif-container"
			newGifDiv.addClass("gif-container");

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

//----------------------------------------

// When the user clicks one of the still GIPHY images

	//the gif should animate

	//If the user clicks the gif again, it should stop playing.

// Under every gif, display its rating (PG, G, so on).


// Only once you get images displaying with button presses should you move on to the next step.
// Add a form to your page takes the value from a user input box and adds it into your topics array. Then make a function call that takes each topic in the array remakes the buttons on the page.
// Rejoice! You just made something really cool.