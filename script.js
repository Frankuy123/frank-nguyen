
// --------------------------------------------------
// SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add fields for each scene, as relevant, to match your mockup
// 2) customize the scenes to fit your story
// 3) add any new fields to the function below
// --------------------------------------------------

// First, we create a variable for the current scene being displayed
let currentScene = "livingroom";
let turns = 7;
let inventory = [];
// Then, we create an object that stores the data for each scene,
const scenes = {
  // See "backyard" for the first example
  livingroom: {
    title: "Location: Living Room",
    character: "Interviewee: You, Mom, and your best friend",
    text: "Mango, your dog, is missing! His bowl is untouched, and the back door is open. Mom looks up from her coffee. 'He was near the side gate earlier,' she says. Your best friend holds up your phone. 'Want some help looking?'",
    // you can choose how many choices to include
    // each choice can have text, an action, and/or nextScene
    choices: [
      {
        text: "Talk to Mom and your friend for help",
        turns: 1,
        action: function () {
          pickUpItem("phone help");
          messageDisplay.textContent = "Your friend hands you your phone. 'Call us if you find anything. We'll help you bring Mango home.'";
        },
        nextScene: "backyard"
      },
      {
        text: "Go straight to the backyard",
        turns: 1,
        nextScene: "backyard"
      }
    ]
  },

  backyard: {
    title: "Location: Backyard",
    character: "Interviewee: You",
    text: "The grass is soft and damp beneath your shoes. Paw prints cross the mud near the fence, and a chicken-treat wrapper trembles on a bush in the morning breeze.",
    choices: [
      {
        text: "Take a picture of the paw prints",
        turns: 1,
        action: function () {
          pickUpItem("paw print photo");
          messageDisplay.textContent = "You save a photo of the muddy prints. They look just like Mango's!";
        },
        nextScene: "backyard"
      },
      {
        text: "Follow the trail through the open gate",
        turns: 1,
        nextScene: "neighborYard"
      },
      {
        text: "Return to the living room",
        turns: 1,
        nextScene: "livingroom"
      }
    ]
  },

  neighborYard: {
    title: "Location: Neighbor's Yard",
    character: "Interviewee: Mr. Sakamoto",
    text: "Roasted chicken smells drift from Mr. Sakamoto's kitchen. He opens his gate when he sees you. 'Looking for a little dog?' he asks. 'I saw one sniffing around my treats.'",
    choices: [
      {
        text: "Ask the neighbor about Mango",
        turns: 1,
        action: function () {
          pickUpItem("chicken clue");
          messageDisplay.textContent = "'He ran toward the park,' Mr. Sakamoto says. He gives you a chicken treat. 'Try this. The smell might bring him out.'";
        },
        nextScene: "park"
      },
      {
        text: "Return to the backyard",
        turns: 1,
        nextScene: "backyard"
      },
      {
        text: "Head to the park without asking",
        turns: 1,
        nextScene: "park"
      }
    ]
  },

  park: {
    title: "Location: Park",
    character: "Interviewee: Local dog walker",
    text: "Kids race past the swings while dogs sniff the grass. 'Have you seen Mango?' you ask a dog walker. 'A little dog ran behind that bush,' they say, pointing to a quiet corner. 'Go slowly. He looked nervous.'",
    choices: [
      {
        text: "Walk toward the bush",
        turns: 1,
        nextScene: "bush"
      },
      {
        text: "Return to the neighbor's yard",
        turns: 1,
        nextScene: "neighborYard"
      },
      {
        text: "Go back home and rethink the clues",
        turns: 1,
        nextScene: "livingroom"
      }
    ]
  },

  bush: {
    title: "Location: The Bush",
    character: "Interviewee: You",
    text: "The noise of the playground fades behind you. A branch shakes beneath the bush, followed by a tiny whine. 'Mango? Is that you?' you whisper.",
    choices: [
      {
        text: "Crouch down and look under the leaves",
        turns: 1,
        nextScene: "finalConfrontation"
      },
      {
        text: "Step back and return to the park",
        turns: 1,
        nextScene: "park"
      }
    ]
  },

  finalConfrontation: {
    title: "Location: Final Confrontation",
    character: "Interviewee: You",
    text: "You crouch beside the opening of the bush. Two bright eyes peek out from the darkness. Mango is close, but one wrong move could send him running.",
    choices: [
      {
        text: "Hold out the treat and call Mango softly",
        turns: 1,
        action: checkEnding
      },
      {
        text: "Reach under the bush quickly",
        turns: 1,
        action: function () {
          updateScene("scaredOff");
        }
      },
      {
        text: "Back away and return to the bush later",
        turns: 1,
        nextScene: "bush"
      }
    ]
  },

  success: {
    title: "Ending 1: Mango Found",
    character: "Ending",
    text: "Mango recognizes your voice and the smell of the chicken treat. He carefully trots out of the bush and presses against your legs. You scoop him into a hug and text your family that the mystery is solved.",
    choices: [
      {
        text: "Play again",
        action: restartGame
      }
    ]
  },

  timeExpired: {
    title: "Ending 2: Time Expired",
    character: "Ending",
    text: "The sun begins to set before you find Mango. The trail goes cold, so you return home and make lost-pet flyers with your family.",
    choices: [
      {
        text: "Try the search again",
        action: restartGame
      }
    ]
  },

  scaredOff: {
    title: "Ending 3: Mango Was Scared Off",
    character: "Ending",
    text: "You get too close before Mango feels safe. He darts out the other side of the bush and disappears into the brush. You'll need to regroup with your friend and try again.",
    choices: [
      {
        text: "Start the search again",
        action: restartGame
      }
    ]
  }
};


// --------------------------------------------------
// UPDATE SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add a new const variable for each new field you added above
// Make sure to match the ids used in your mock up with the fields 
// 2) set the .textContent of each variable to the corresponding field in the scene object
// Use sceneTitle as a model
// --------------------------------------------------

// First, we create variables to hold the references to the HTML elements
// Technically you could just use document.getElementById('id-name') 
// in the function itself, but that would be very wordy 
// and make the code harder to read
const sceneTitle = document.getElementById("scene-title");
const sceneText = document.getElementById("scene-text");
const choicesContainer = document.getElementById("choices-container");
const characterName = document.getElementById("character-name");

// Then, we create a function to update the scene,
function updateScene(sceneName) {

//This update the variable currentScene with the new scene passed as a parameter
currentScene = sceneName;

//This accesses the scene object based on the scene name
const scene = scenes[sceneName];

// Here, for each html element, you change the textContent to match
// the appropriate text from the scene object
sceneTitle.textContent = scene.title;
sceneText.textContent = scene.text;
characterName.textContent = scene.character;

// Clear the old buttons before creating new ones
choicesContainer.innerHTML = "";

// Loop through each choice in the scene, connecting an action and nextScene if included
scene.choices.forEach(function (choice) {
const button = document.createElement("button");

button.textContent = choice.text;

button.addEventListener("click", function () {
  messageDisplay.textContent = "";

  if (choice.turns) {
    updateTurns(-choice.turns);
  }

  if (choice.action) {
    choice.action();
  }

  if (choice.nextScene) {
    updateScene(choice.nextScene);
  }

  if (turns === 0 && currentScene !== "success" && currentScene !== "scaredOff") {
    updateScene("timeExpired");
  }
});
 choicesContainer.appendChild(button);
  });
}

const turnsDisplay = document.getElementById("turns-display");

function updateTurns(amount) {
  turns = turns + amount;

  if (turns < 0) {
    turns = 0;
  }

  turnsDisplay.textContent = turns;
}

// --------------------------------------------------
// INVENTORY
// Read through the comments below to see what this section does
//
// For now, you are probably leaving this section as is. 
// --------------------------------------------------

// Create a variable for inventory

// Display current inventory
const inventoryDisplay = document.querySelector("#inventory-display");
const messageDisplay = document.getElementById("message-display");

// Create a function to update inventory 
function pickUpItem(itemName) {
// Add itemName to the inventory array
// Show the updated inventory on the page
inventory.push(itemName);
inventoryDisplay.textContent = inventory.join(", ");
}

// --------------------------------------------------
// CONDITIONAL 
// Depending on how you want to implement the conditional logic, you may 
// simply adjust the names below or you may need to expand upon this section
// --------------------------------------------------

// Create a function that checks if the inventory contains one item and if so shows the win condition scene.
function checkEnding() {
      if (
        inventory.includes("phone help") &&
        inventory.includes("paw print photo") &&
        inventory.includes("chicken clue")
      ) {
        updateScene("success");
      } else {
        updateScene("scaredOff");
      }
    }

    function restartGame() {
      currentScene = "livingroom";
      turns = 7;
      inventory = [];
      updateTurns(0);
      inventoryDisplay.textContent = "empty";
      messageDisplay.textContent = "";
      updateScene(currentScene);
    }

    // This refreshes the turns display
    updateTurns(0);
    inventoryDisplay.textContent = "empty";

    // This updates the screen with the current scene
    updateScene(currentScene);


