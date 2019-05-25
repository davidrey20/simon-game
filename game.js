var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var sequenceCounter = 0;
var numberOfClicks = 0;
var level = 0;

//Next button is clicked

$(".next-level").click(function() {
  level += 1;
  numberOfClicks = 0;
  nextSequence();
  $(".custom-alert").addClass("hidden-element");
  $(".btn").removeClass("hidden-element");
  setTimeout(function() {
    displayPatternSequence();
  }, 300);
});

//Listen for player button click and get colour
$(".btn").click(function() {
  //Increase clicks counter
  numberOfClicks += 1;
  //Get Colour of Button Clicked.
  var userChosenColour = $(this).attr("id");
  //Add Colour to user pattern array.
  userClickedPattern.push(userChosenColour);
  //Promise for user fade
  const userFadePromise = $(this)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100)
    .promise();
  //Promise for user audio
  var audio = new Audio("./sounds/" + userChosenColour + ".mp3");
  const userAudioPromise = audio.play();

  // Wait for Promise completion

  Promise.all([userFadePromise, userAudioPromise])
    .then(message => {
      var gameStatus = "valid";

      for (var i = 0; i < userClickedPattern.length; i++) {
        if (gamePattern[i] === userClickedPattern[i]) {
          gameStatus = "valid";
        } else {
          gameStatus = "fail";
        }
      }

      if (numberOfClicks == gamePattern.length && gameStatus == "valid") {
        console.log(gameStatus);
        //Hide Game Buttons
        $(".btn").addClass("hidden-element");
        //Display Alert Box
        $(".custom-alert").removeClass("hidden-element");
        //Change Title and Text of Alert Box
        $(".alert-title").text("Good Job");
        $(".alert-text").addClass("alert-winner");
        $(".alert-text").text("Level " + level + " Completed🏅");
        //Change Button Text
        $(".next-level").text("Next Level");
        userClickedPattern = [];
        numberOfClicks = 0;
      } else if (gameStatus === "fail") {
        console.log(gameStatus);
        //Hide Game Buttons
        $(".btn").addClass("hidden-element");
        //Display Alert Box
        $(".custom-alert").removeClass("hidden-element");
        //Change Title and Text of Alert Box
        $(".alert-title").text("Game Over");
        $(".alert-text").addClass("alert-winner");
        $(".alert-text").text("Maximum Level Completed: " + level);
        //Change Button Text
        $(".next-level").text("Restart Game");
        numberOfClicks = 0;
        gamePattern = [];
        userClickedPattern = [];
      }
    })
    .catch(error => {
      console.log(error);
    });
});
// Helper Functions

// Create a random sequece of colours and store in array

function nextSequence() {
  // returns a random integer from 0 to 6
  var randomNumber = Math.floor(Math.random() * 4);
  //   add random colour to gamePattern array
  var buttonColourIndex = randomNumber;
  gamePattern.push(buttonColours[buttonColourIndex]);
}

function displayPatternSequence() {
  if (sequenceCounter < gamePattern.length) {
    //Create Fading Promise
    const fadePromise = $("#" + gamePattern[sequenceCounter])
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100)
      .promise();

    //Create Audio Promise
    var audio = new Audio("./sounds/" + gamePattern[sequenceCounter] + ".mp3");
    const audioPromise = audio.play();

    //Run all Promises and restart counter
    Promise.all([fadePromise, audioPromise])
      .then(message => {
        sequenceCounter += 1;
        displayPatternSequence();
      })
      .catch(error => {
        console.log("Error in rendering Game Sequence: " + error);
      });
  } else {
    console.log("End of Sequence");
    sequenceCounter = 0;
  }
}
