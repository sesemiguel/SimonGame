startGameOnKeydown();

// Initialize number of patterns on one
let numOfPatterns = 1;

// Initialize the stack of patterns
let stackOfPatterns = [];

/*
  Enables the keypress on a or A to start the game
*/
function startGameOnKeydown() {
  $("body").keydown(function(event) {

    // Starts the game
    if (event.key == "a" || event.key == "A") {

      // Start a new level
      newLevel();

      // Remove the keypress event listener
      $("body").off();
    }
  });
}

/*
  Creates a random pattern then pushes it into the stack
  numOfPatterns - Number of elements in the pattern
*/
function createPattern(numOfPatterns) {

  // Initialize stack of pattern
  stackOfPatterns = [];

  // Push numerical representation of the buttons depending on the given number of patterns
  for (i = 0; i < numOfPatterns; i++) {
    stackOfPatterns.push(getRandomNumberInclusive(1, 4));
  }

  return stackOfPatterns;
}

/*
  Gets a random number from min to max
  min - Minimum value of the range
  max - Maximum value of the range
*/
function getRandomNumberInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
  Lights the stack of patterns
  stackOfPatterns - The stack that contains the patterns
*/
function lightPattern(stackOfPatterns) {

  // Initialize iterator
  var i;

  // Initialize timeout duration
  var timeOutDuration = 300;

  // Initialize audio variables
  var greenAudio;
  var redAudio;
  var yellowAudio;
  var bleuAudio;

  for (i = 0; i < stackOfPatterns.length; i++) {

    if (stackOfPatterns[i] == 1) {
      playAudioOnPattern(".green", "sounds/green.mp3", i, timeOutDuration);
    }
    else if (stackOfPatterns[i] == 2) {
      playAudioOnPattern(".red", "sounds/red.mp3", i, timeOutDuration);
    }
    else if (stackOfPatterns[i] == 3) {
      playAudioOnPattern(".yellow", "sounds/yellow.mp3", i, timeOutDuration);
    }
    else if (stackOfPatterns[i] == 4) {
      playAudioOnPattern(".blue", "sounds/blue.mp3", i, timeOutDuration);
    }
  }
}

/*
  Plays the audio on the patterns when lighting
  buttonColorClass - Class of the clicked button
  audioLink - File location of the audio to be played
  iterator - Index of the pattern
  timeOutDuration - time out duration of animation
*/
function playAudioOnPattern(buttonColorClass, audioLink, iterator, timeOutDuration){

  // Set press animation
  setTimeout(function() {
    $(buttonColorClass).addClass("pressed");

    // Instantiate and play audio
    var audio = new Audio(audioLink);
    audio.play();

  }, iterator * timeOutDuration);

  // Set unpress animation
  setTimeout(function() {
    $(buttonColorClass).removeClass("pressed");
  }, (iterator + 1) * timeOutDuration);
}

function handleClick(stackOfPatterns) {

  // Initialize stack of clicks
  let stackOfClicks = [];

  // Initialize iterator
  var i = 0;

  // Initialize timeout duration
  var timeOutDuration = 300;

  // Green button click event listener
  $(".green").click(function(event) {

    // Represent green as 1
    stackOfClicks.push(1);

    // Play audio and display animation
    playAudioOnClick(".green", "sounds/green.mp3", timeOutDuration);

    if (stackOfPatterns[i] != stackOfClicks.slice(0, stackOfPatterns.length)[i]) {
      displayGameOver();
    }
    else if (stackOfPatterns.length == stackOfClicks.length && stackOfPatterns[i] == stackOfClicks[i]){
      numOfPatterns++;
      setTimeout(newLevel, 1000);
    }
    else{
      i++;
    }
  });

  // Red button click event listener
  $(".red").click(function(event) {

    // Represent red as 2
    stackOfClicks.push(2);

    // Play audio and display animation
    playAudioOnClick(".red", "sounds/red.mp3", timeOutDuration);

    if (stackOfPatterns[i] != stackOfClicks.slice(0, stackOfPatterns.length)[i]) {
      displayGameOver();
    }
    else if (stackOfPatterns.length == stackOfClicks.length && stackOfPatterns[i] == stackOfClicks[i]){
      numOfPatterns++;
      setTimeout(newLevel, 1000);
    }
    else{
      i++;
    }
  });

  // Yellow button click event listener
  $(".yellow").click(function(event) {

    // Represent yellow as 3
    stackOfClicks.push(3);

    // Play audio and display animation
    playAudioOnClick(".yellow", "sounds/yellow.mp3", timeOutDuration);

    if (stackOfPatterns[i] != stackOfClicks.slice(0, stackOfPatterns.length)[i]) {
      displayGameOver();
    }
    else if (stackOfPatterns.length == stackOfClicks.length && stackOfPatterns[i] == stackOfClicks[i]){
      numOfPatterns++;
      setTimeout(newLevel, 1000);
    }
    else{
      i++;
    }
  });

  // Blue button click event listener
  $(".blue").click(function(event) {

    // Represent blue as 4
    stackOfClicks.push(4);

    // Play audio and display animation
    playAudioOnClick(".blue", "sounds/blue.mp3", timeOutDuration);

    if (stackOfPatterns[i] != stackOfClicks.slice(0, stackOfPatterns.length)[i]) {
      displayGameOver();
    }
    else if (stackOfPatterns.length == stackOfClicks.length && stackOfPatterns[i] == stackOfClicks[i]){
      numOfPatterns++;
      setTimeout(newLevel, 1000);
    }
    else{
      i++;
    }
  });
}

/*
  Plays the audio of the clicked button
  buttonColorClass - Class of the clicked button
  audioLink - File location of the audio to be played
  timeOutDuration - time out duration of animation
*/
function playAudioOnClick(buttonColorClass, audioLink, timeOutDuration){

  $(buttonColorClass).addClass("pressed");

  // Instantiate and play audio
  var audio = new Audio(audioLink);
  audio.play();

  // Set unpress animation
  setTimeout(function() {
    $(buttonColorClass).removeClass("pressed");
  }, timeOutDuration);
}

/*
  Displays game over if a wrong button is pressed. This also processes a new game
*/
function displayGameOver() {

  // Initialize game over audio
  var gameOverAudio;

  // Instantiate and play game over audio
  gameOverAudio= new Audio("sounds/wrong.mp3");
  gameOverAudio.play();

  // Animations
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  }, 500);
  $("h1").text("Game Over, Press Any Key to Restart");

  // Turn off the event listeners of the buttons
  $(".btn").off();

  // Turn off the event listeners of the keypress
  $("body").off();

  // Set the number of patterns back to one
  numOfPatterns = 1;

  $("body").keypress(function(event){

    // Initialize a new level then turn off the event listener for keypress
    newLevel();
    $("body").off();
  });

}

/*
  Initializes a new level
*/
function newLevel(){

  // Update the title of the level
  $("h1").text("Level " + numOfPatterns);

  // Get the stack of patterns
  var stackOfPatterns = createPattern(numOfPatterns);

  // Light up each pattern
  lightPattern(stackOfPatterns);

  // Handle the click events
  handleClick(stackOfPatterns);
}
