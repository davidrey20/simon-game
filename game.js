var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var sequenceCounter = 0;

//Listen for button click and get colour

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  $(this)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSoundForUser(userChosenColour);
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

function createPatternSequence() {
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

    //

    Promise.all([fadePromise, audioPromise])
      .then(message => {
        sequenceCounter += 1;
        createPatternSequence();
      })
      .catch(error => {
        console.log("Error in rendering Game Sequence: " + error);
      });
  } else {
    console.log("End of Sequence");
    sequenceCounter = 0;
  }
}

function playSoundForUser(colourName) {
  var audio = new Audio("./sounds/" + colourName + ".mp3");
  audio.play();
}
