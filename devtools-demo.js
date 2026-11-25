// HW10: Chrome DevTools demo code added to the copy of Project 2.
// Uses pet_info and pet_comments from script.js.

// Part 2.1: Console message logging
function runConsoleDemo() {
  // Log info
  console.log('Giga Pet loaded. Pet name is ' + pet_info.name);
  console.info('Starting weight is ' + pet_info.weight + ' pounds');

  // Log warning
  if (pet_info.energy <= 50) {
    console.warn(pet_info.name + ' energy is low: ' + pet_info.energy + ' / 100');
  }

  // Log error
  console.error('Example error: ' + pet_info.name + ' ran out of treats');

  // Log table (how each button changes the pet's stats)
  console.table([
    { action: 'Treat', happiness: 3, weight: 2, energy: 0 },
    { action: 'Play', happiness: 2, weight: -1, energy: -10 },
    { action: 'Exercise', happiness: -2, weight: -2, energy: -15 },
    { action: 'Nap', happiness: 0, weight: 0, energy: 25 }
  ]);

  // Log group
  console.group('Pet comments');
  for (var action in pet_comments) {
    console.log(action + ': ' + pet_comments[action].length + ' comments');
  }
  console.groupEnd();

  // Log custom (CSS styled with %c)
  console.log('%cGiga Pet%c HW10 DevTools Demo',
    'color: white; background: #1e2835; padding: 4px 8px; font-size: 16px; font-weight: bold;',
    'color: #1e2835; font-size: 14px; font-weight: bold;');
}

// Part 2.2: Browser-logged messages

// 404: requests an image that does not exist
function trigger404() {
  fetch('images/missing-pet.jpg');
}

// TypeError: pet_info has no owner property, so owner is undefined
function triggerTypeError() {
  var owner = pet_info.owner;
  console.log(owner.name);
}

// Violation: a click handler that blocks the main thread for 500ms
function triggerViolation() {
  var start = Date.now();
  while (Date.now() - start < 500) {
    // busy wait
  }
}

$(function() {
  runConsoleDemo();
  $('.console-demo-button').click(runConsoleDemo);
  $('.error-404-button').click(trigger404);
  $('.type-error-button').click(triggerTypeError);
  $('.violation-button').click(triggerViolation);
});
