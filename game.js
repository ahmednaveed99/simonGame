var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

function nextSequence() {
  // Choosing a random color
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  // passing the chosen color onto our pattern list
  gamePattern.push(randomChosenColor);

  // creating the beeping visual effect
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  // Making the sound corresponding to the chosen button
  playSound(randomChosenColor);
  animatePress(randomChosenColor);
  level++;
  $("h1").text("level " + level);
}

//event listener for button clicks
function handler() {
  userChosenId = $(this).attr("id");
  userClickedPattern.push(userChosenId);
  playSound(userChosenId);
  animatePress(userChosenId);
  checkAnswer(userClickedPattern.length - 1);
}
$(".btn").on("click", handler);


// function for playing sounds
function playSound(name) {
  var sounder = new Audio("/Users/Ahmed/Desktop/web development/Simon Game Challenge/sounds/" + name + ".mp3");
  sounder.play();

}

//adding animation to clicks
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//Detecting key press to start the game
var level = 0;
$("h1").text("Press A key to start");
$(document).keydown(function() {
  if (level === 0) {
    nextSequence()
  };
});

//function to check the answer
function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
      userClickedPattern = [];
    }
  } else {
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);
    $("h1").text("Game Over. Press any key to restart");
    startOver();
  }

}

// Function to start the game again after a wrong answer.
function startOver() {
  gamePattern = [];
  level = 0;
  userClickedPattern = [];
}
