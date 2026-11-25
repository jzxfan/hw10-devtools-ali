$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.

  // Called function to update the name, happiness, and weight of our pet in our HTML
  checkAndUpdatePetInfoInHtml();

  // When each button is clicked, it will "call" function for that button (functions are below)
  $('.treat-button').click(clickedTreatButton);
  $('.play-button').click(clickedPlayButton);
  $('.exercise-button').click(clickedExerciseButton);
  $('.nap-button').click(clickedNapButton);
  $('.feed-button').click(clickedFeedButton);

});

// Object holding the pet's name (string), weight (number), happiness (number) and energy (number)
var pet_info = {name: "Houndour", weight: 24, happiness: 10, energy: 50};

// Arrays of comments the pet can say for each action. One is picked at random after each button press.
var pet_comments = {
  treat: ["Yum! More please!", "*crunch crunch* Best treat ever!", "You're my favorite human!"],
  play: ["Fetch again! Again!", "Woof! This is so fun!", "Catch me if you can!"],
  exercise: ["*pant pant* Are we done yet?", "My paws are tired...", "Fine, one more lap."],
  nap: ["Zzz... five more minutes...", "*yawn* I feel recharged!", "Dreaming about treats..."]
};

function clickedTreatButton() {
  pet_info.happiness += 3; // Increase pet happiness
  pet_info.weight += 2;    // Increase pet weight
  checkAndUpdatePetInfoInHtml();
  showPetComment('treat');
}

function clickedPlayButton() {
  pet_info.happiness += 2; // Increase pet happiness
  pet_info.weight -= 1;    // Decrease pet weight
  pet_info.energy -= 10;   // Playing uses energy
  checkAndUpdatePetInfoInHtml();
  showPetComment('play');
}

function clickedExerciseButton() {
  pet_info.happiness -= 2; // Decrease pet happiness
  pet_info.weight -= 2;    // Decrease pet weight
  pet_info.energy -= 15;   // Exercising uses more energy than playing
  checkAndUpdatePetInfoInHtml();
  showPetComment('exercise');
}

function clickedNapButton() {
  pet_info.energy += 25;   // Napping restores energy
  checkAndUpdatePetInfoInHtml();
  showPetComment('nap');
}

// HW10: Feed button adds the number of pounds typed in the box to the pet's weight
function clickedFeedButton() {
  // Fix: .val() returns a string, so convert it to a number before adding.
  // The bug was: var amount = $('.feed-amount').val();
  // which made 24 + "5" turn into "245" instead of 29.
  var amount = Number($('.feed-amount').val());
  pet_info.weight = pet_info.weight + amount;
  checkAndUpdatePetInfoInHtml();
  showPetComment('treat');
}

function checkAndUpdatePetInfoInHtml() {
  checkWeightAndHappinessBeforeUpdating();
  updatePetInfoInHtml();
}

function checkWeightAndHappinessBeforeUpdating() {
  // Conditionals so weight, happiness and energy can never go below zero
  if (pet_info.weight < 0) {
    pet_info.weight = 0;
  }
  if (pet_info.happiness < 0) {
    pet_info.happiness = 0;
  }
  if (pet_info.energy < 0) {
    pet_info.energy = 0;
  }
  // Energy is shown out of 100, so it also can't go above 100
  if (pet_info.energy > 100) {
    pet_info.energy = 100;
  }
}

// Updates your HTML with the current values in your pet_info object
function updatePetInfoInHtml() {
  $('.name').text(pet_info['name']);
  $('.weight').text(pet_info['weight']);
  $('.happiness').text(pet_info['happiness']);
  $('.energy').text(pet_info['energy']);
}

// Tracks whether the comment bubble is showing, and the timer that hides it
var commentVisible = false;
var commentTimer;

// Shows a random comment from the pet for the given action, then hides it after 2 seconds
function showPetComment(action) {
  var comments = pet_comments[action];
  var randomComment = comments[Math.floor(Math.random() * comments.length)];
  var bubble = $('.pet-comment');

  // Cancel the previous hide timer so a new comment gets its full 2 seconds on screen
  clearTimeout(commentTimer);

  // jQuery method #1: .stop(clearQueue, jumpToEnd)
  // https://api.jquery.com/stop/
  // .stop() halts any animation currently running on the selected element.
  // Passing true for clearQueue removes any animations still waiting in the queue,
  // and passing true for jumpToEnd instantly finishes the current animation.
  // If the bubble is in the middle of fading, this snaps it to its finished state
  // (fully shown or fully hidden), so quick button clicks don't stack up animations.
  bubble.stop(true, true).text(randomComment);

  // jQuery method #2: .fadeToggle(duration)
  // https://api.jquery.com/fadeToggle/
  // .fadeToggle() fades an element in if it is hidden, or fades it out if it is visible,
  // over the given number of milliseconds. Here it fades the bubble in (200ms) when
  // it isn't already showing, and the timer below calls it again to fade it out (400ms).
  if (!commentVisible) {
    bubble.fadeToggle(200);
    commentVisible = true;
  }

  commentTimer = setTimeout(function() {
    bubble.fadeToggle(400);
    commentVisible = false;
  }, 2000);
}
