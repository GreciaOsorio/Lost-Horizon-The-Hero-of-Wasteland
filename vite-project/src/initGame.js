import initKaplay from "./kaplayCtx"; 
import { isTextBoxVisibleAtom, store, textBoxContentAtom } from "./store";
//for firebase
import {db} from './firebase.js'; 
import {collection, doc, addDoc} from 'firebase/firestore'; 

//For Firebase 
export async function addPlayerToFirebase(username) {
  try {
    const docRef = await addDoc(collection(db, "Player"), {
      username: username,
      health: 100,
      seedsCurrency: 50,
      // add other player properties here as needed
    });
    console.log("Player created with ID: ", docRef.id);
  } catch (error) {
    console.error("Error creating player: ", error);
  }
}

export async function fetchPlayerFromFirebase(uid) {
  const playerDoc = await getDoc(doc(db, "Player", uid));
  if (playerDoc.exists()) {
    return playerDoc.data();
  } else {
    console.log("No such player!");
    return null;
  }
}

export default async function initGame(username) {
     const k = initKaplay();
    // bc if you move diagonaly 
    const DIAGONAL_FACTOR = 1/Math.sqrt(2)

    k.loadSprite("background", "./background.png"); //how to load background image
    k.loadSprite("door", "./door.png");
    k.loadSprite("characters", "./000.png", {
        sliceY: 4,
        sliceX: 3,
        anims: { //this defines the animations, the names you choose and the numbers represent the index of the image you wish to showcase
            "down-idle": 0,
            "up-idle": 9,
            "right-idle": 6,
            "left-idle": 3,
            right: { from: 6, to: 8, loop: true },
            left: { from: 3, to: 5, loop: true },
            down: { from: 0, to: 2, loop: true },
            up: { from: 9, to: 11, loop: true },
            "npc-down": 0,
            "npc-up": 9,
            "npc-right": 6,
            "npc-left": 3,
        }
    }).then(() => {
      console.log("Sprite loaded successfully");
  }).catch((err) => {
      console.error("Error loading sprite", err);
  });

  k.loadSprite("bird", "./blueBird.png", {
      sliceY: 13,
      sliceX: 4,
      anims: { //this defines the animations, the names you choose and the numbers represent the index of the image you wish to showcase
          "down-idle": 0,
          "up-idle": 13,
          "right-idle": 10,
          "left-idle": 6,
          right: { from: 5, to: 8, loop: true },
          left: { from: 10, to: 13, loop: true },
          down: { from: 8, to: 9, loop: true },
          up: { from: 10, to: 11, loop: true },
          "npc-down": 21,
          "npc-up": 48,
          "npc-right": 36,
          "npc-left": 8,
      }
    });
    k.loadSprite("oilMonster", "./MonsterSprite_Sheets/oilMonster_spritesheet.png",{
      sliceY: 3,
      sliceX: 2,
      anims: { //this defines the animations, the names you choose and the numbers represent the index of the image you wish to showcase
          "down-idle": 0,
          "up-idle": 5,
          "right-idle": 4,
          "left-idle": 2,
          right: { from: 5, to: 6, loop: true },
          left: { from: 1, to: 2, loop: true },
          down: { from: 0, to: 1, loop: true },
          up: { from: 3, to: 4, loop: true },
          "npc-down": 0,
          "npc-up": 5,
          "npc-right": 4,
          "npc-left": 2,
      }
    });
      k.loadSprite("smogMonster", "./MonsterSprite_Sheets/SmogMonster_spritesheet.png",{
      sliceY: 3,
      sliceX: 2,
      anims: { //this defines the animations, the names you choose and the numbers represent the index of the image you wish to showcase
          "down-idle": 0,
          "up-idle": 4,
          "right-idle": 4,
          "left-idle": 2,
          right: { from: 5, to: 6, loop: true },
          left: { from: 1, to: 2, loop: true },
          down: { from: 0, to: 1, loop: true },
          up: { from: 3, to: 4, loop: true },
          "npc-down": 0,
          "npc-up": 4,
          "npc-right": 4,
          "npc-left": 2,
      }
    });
    k.loadSprite("PlasticMonster", "./MonsterSprite_Sheets/PlasticMonster_sprtiesheet.png",{
      sliceY: 3,
      sliceX: 2,
      anims: { //this defines the animations, the names you choose and the numbers represent the index of the image you wish to showcase
          "down-idle": 0,
          "up-idle": 4,
          "right-idle": 3,
          "left-idle": 2,
          right: { from: 3, to: 3, loop: true },
          left: { from: 2, to: 2, loop: true },
          down: { from: 0, to: 1, loop: true },
          up: { from: 4, to: 4, loop: true },
          // 4 is the right one
          "npc-down": 0,
          "npc-up": 4,
          "npc-right": 3,
          "npc-left": 2,
      }
    });
    k.loadSprite("TrashcanMonster", "./MonsterSprite_Sheets/trashcanMonster_spritesheet.png",{
      sliceY: 3,
      sliceX: 2,
      anims: { //this defines the animations, the names you choose and the numbers represent the index of the image you wish to showcase
          "down-idle": 0,
          "up-idle": 4,
          "right-idle": 3,
          "left-idle": 2,
          right: { from: 3, to: 3, loop: true },
          left: { from: 2, to: 2, loop: true },
          down: { from: 0, to: 1, loop: true },
          up: { from: 4, to: 4, loop: true },
          // 4 is the right one
          "npc-down": 0,
          "npc-up": 4,
          "npc-right": 3,
          "npc-left": 2,
      }
    });
    k.loadSprite("Bossman", "./022.png", {
      sliceY: 4,
      sliceX: 3,
      anims: { //this defines the animations, the names you choose and the numbers represent the index of the image you wish to showcase
          "down-idle": 0,
          "up-idle": 9,
          "right-idle": 6,
          "left-idle": 3,
          right: { from: 6, to: 8, loop: true },
          left: { from: 3, to: 5, loop: true },
          down: { from: 0, to: 2, loop: true },
          up: { from: 9, to: 11, loop: true },
          "npc-down": 0,
          "npc-up": 9,
          "npc-right": 6,
          "npc-left": 3,
      }
    });
    k.loadSprite("sickman", "./035.png", {
      sliceY: 4,
      sliceX: 3,
      anims: { //this defines the animations, the names you choose and the numbers represent the index of the image you wish to showcase
          "down-idle": 0,
          "up-idle": 9,
          "right-idle": 6,
          "left-idle": 3,
          right: { from: 6, to: 8, loop: true },
          left: { from: 3, to: 5, loop: true },
          down: { from: 0, to: 2, loop: true },
          up: { from: 9, to: 11, loop: true },
          "npc-down": 0,
          "npc-up": 9,
          "npc-right": 6,
          "npc-left": 3,
      }
    });

    

    // we didn't create a reference like we did for player because it is not needed
    k.add([k.sprite("background"), k.pos(0, -70), k.scale(8)]);
    k.add([k.sprite("door"), k.pos(800, 905), k.scale(1.3)]);

     // Load the wall asset
     k.loadSprite("floor1", "./longfloor.png", {
      
     });
     k.loadSprite("floor", "./longfloor.png", {
      sliceX: 2
     });
     k.loadSprite("wall","./vertical_wall.png", {

     });
     k.loadSprite("roof","./horizontal_wall.png", {

     });
     k.loadSprite("beam", "./beam.png", {
      sliceY: 2
      
     });
     const floors = [
      k.add([k.sprite("floor1"), k.pos(0, 100), k.scale(0.5), k.area(), k.body({ isStatic: true }), "floor1"]),
      k.add([k.sprite("floor"), k.pos(980, 250), k.scale(0.5), k.area(), k.body({ isStatic: true }), "floor"]),
      k.add([k.sprite("floor"), k.pos(450, 435), k.scale(0.5), k.area(), k.body({ isStatic: true }), "floor"]),
      k.add([k.sprite("floor"), k.pos(0, 800), k.scale(0.5), k.area(), k.body({ isStatic: true }), "floor"]),
    ];
    const walls = [
      k.add([k.sprite("wall"), k.pos(-25, 0), k.scale(1), k.area(), k.body({ isStatic: true }), "wall"]),
      k.add([k.sprite("wall"), k.pos(1880, 0), k.scale(1), k.area(), k.body({ isStatic: true }), "wall"]),

    ];
    const roofs = [
      k.add([k.sprite("roof"), k.pos(0, -28), k.scale(1), k.area(), k.body({ isStatic: true }), "roof"]),
      k.add([k.sprite("roof"), k.pos(0, 1040), k.scale(1), k.area(), k.body({ isStatic: true }), "bottom"]),

    ];
    const beams =  [
      k.add([k.sprite("beam"), k.pos(400, 160), k.scale(0.5), k.area(), k.body({ isStatic: true }), "beam"]),
    ]
 
  
    const player = k.add([
        k.sprite("characters", {anim: "down-idle"}),
        k.area(),
        // k body is for the physics/collision
        k.body(),
        k.anchor("center"),
        k.pos(50,100),
        k.scale(2.5),
        // adding a tag to identify in collision handlers
        "player",
        // creating custom properties
        {
            // can access in other areas by putting player.speed
            speed: 300,
            //  specify the corr
            direction: k.vec2(0,0),
        },
    ]);
   

    // on frame
    player.onUpdate(() =>{
        // is 0 in the beginning of each loop
        player.direction.x = 0;
        player.direction.y = 0;

        // is key down left, right, up, and down
        if (k.isKeyDown("left")) player.direction.x = -1;
        if (k.isKeyDown("right")) player.direction.x = 1;
        // the higher the value of y the lower you get to the screen
        if (k.isKeyDown("up")) player.direction.y = -1;
        if (k.isKeyDown("down")) player.direction.y = 1;

        // if we still pressing left we will not update animation/interrupt we just leave it
        // left animation
        if (player.direction.eq(k.vec2(-1, 0)) && player.getCurAnim().name !== "left"){
            player.play("left");
        }
        //   for right logic
        if (player.direction.eq(k.vec2(1, 0)) && player.getCurAnim().name !== "right") {
            player.play("right");
          }

        //   for up logic
          if (player.direction.eq(k.vec2(0, -1)) && player.getCurAnim().name !== "up") {
            player.play("up");
          }

         //   for down logic
      
          if (player.direction.eq(k.vec2(0, 1)) && player.getCurAnim().name !== "down") {
            player.play("down");
          }

    //   for idle logi
          if (player.direction.eq(k.vec2(0, 0)) && !player.getCurAnim().name.includes("idle")) {
            player.play(`${player.getCurAnim().name}-idle`);
          }
      
        //   for diagnole movement
          if (player.direction.x && player.direction.y) {
            player.move(player.direction.scale(DIAGONAL_FACTOR * player.speed));
            return;
          }

        //   move method takes in the vector for direction and speed
        // direction is chosen from the above if statements
        player.move(player.direction.scale(player.speed));
    });

    // the villagers
    const npc = k.add([
      // the animation
        k.sprite("bird", {anim: "npc-left"}),
        k.area({ width: 1, height: 1}), // Adjust width and height as needed
        // static will be a wall to not push
        k.body({ isStatic: true, isSensor: true }),
        // centered
        k.anchor("center"),
        // size of bird
        k.pos(900, 60), // Position the wall at coordinates x=100, y=200
        k.scale(4),
        "bird"
    ]);

    const oilMonster = k.add([
      k.sprite("oilMonster", {anim: "npc-down"}),
      k.area(),
      // k body is for the physics/collision
      k.body({ isStatic: true, isSensor: true }),
      k.anchor("center"),
      k.pos(1400,200),
      k.scale(0.5),
      "oilMonsters"
      // adding a tag to identify in collision handlers
     
  ]);


    
  const smogMonster = k.add([
    k.sprite("smogMonster", {anim: "npc-down"}),
    k.area(),
    // k body is for the physics/collision
    k.body({ isStatic: true, isSensor: true }),
    k.anchor("center"),
    k.pos(530,380),
    k.scale(0.5),
    "smogMonsters"
    // adding a tag to identify in collision handlers
   
]);
  
   const PlasticMonster = k.add([
    k.sprite("PlasticMonster", {anim: "npc-down"}),
    k.area(),
    // k body is for the physics/collision
    k.body({ isStatic: true, isSensor: true }),
    k.anchor("center"),
    k.pos(600,600),
    //k.scale(0.5),
    "PlasticMonsters",
    // adding a tag to identify in collision handlers
    console.log("loaded monster")
   
  ]);
  const trashcanMonster = k.add([
    k.sprite("TrashcanMonster", {anim: "npc-down"}),
    k.area(),
    // k body is for the physics/collision
    k.body({ isStatic: true, isSensor: true }),
    k.anchor("center"),
    k.pos(700,600),
    //k.scale(0.5),
    "TrashcanMonsters",
    // adding a tag to identify in collision handlers
    console.log("loaded monster")
   
  ]);
  const Bossman = k.add([
    k.sprite("Bossman", {anim: "npc-down"}),
    k.area(),
    // k body is for the physics/collision
    k.body({ isStatic: true, isSensor: true }),
    k.anchor("center"),
    k.pos(200,300),
    k.scale(2.5),
    "oilMonsters"
    // adding a tag to identify in collision handlers
     
  ]);
  const sickwoman = k.add([
    k.sprite("sickman", {anim: "npc-down"}),
    k.area(),
    // k body is for the physics/collision
    k.body({ isStatic: true, isSensor: true }),
    k.anchor("center"),
    k.pos(1500,600),
    k.scale(2.5),
    "oilMonsters"
    // adding a tag to identify in collision handlers
     
  ]);


    // Flag to track if interaction is complete
// Flag to track if interaction is complete
let interactionComplete = false;

npc.onCollide("player", (player) => {
  if (!interactionComplete) {
    console.log("Collided with the player");

    // Dialogue logic based on player's direction
    if (player.direction.eq(k.vec2(0, -1))) {
      store.set(textBoxContentAtom, "Beautiful day, isn't it?");
      npc.play("npc-down");
    }

    if (player.direction.eq(k.vec2(0, 1))) {
      npc.play("npc-up");
      store.set(textBoxContentAtom, "Those rocks are heavy!");
    }

    if (player.direction.eq(k.vec2(1, 0))) {
      npc.play("npc-left");
      store.set(textBoxContentAtom, "My wings are so heavy, someone spill something oily everywhere :(!");
    }

    if (player.direction.eq(k.vec2(-1, 0))) {
      store.set(textBoxContentAtom, "Is the water too cold?");
      npc.play("npc-right");
    }

    // Show the text box
    store.set(isTextBoxVisibleAtom, true);

    // Set interactionComplete to true after text is shown
    interactionComplete = true;

    k.wait(3, () => {
      // Remove the bird after interaction is complete
      k.destroy(npc);
      console.log("Bird has been removed after interaction.");
    });
  }
});

// Separate interaction flag for oilMonster
let oilMonsterInteractionComplete = false;

oilMonster.onCollide("player", (player) => {
  if (!oilMonsterInteractionComplete) {
    console.log("Collided with the oilMonster");

    // Reset text before each interaction
    store.set(textBoxContentAtom, "");

    // Animation logic based on player's direction
    if (player.direction.eq(k.vec2(0, -1))) {
      oilMonster.play("npc-down");
      store.set(textBoxContentAtom, "All these companies are polluting the air and creating more of me");
    }

    if (player.direction.eq(k.vec2(0, 1))) {
      oilMonster.play("npc-up");
      store.set(textBoxContentAtom, "It's getting hard to breath because of me...");

    }

    if (player.direction.eq(k.vec2(1, 0))) {
      oilMonster.play("npc-right");
      store.set(textBoxContentAtom, "Air pollution am I right...");

    }

    if (player.direction.eq(k.vec2(-1, 0))) {
      oilMonster.play("npc-left");
      store.set(textBoxContentAtom, "The big boss man brought me here");

    }

    // Show the text box
    store.set(isTextBoxVisibleAtom, true);

    // Set interaction as complete so that the collision doesn't repeat
    oilMonsterInteractionComplete = true;


    k.wait(3, () => {
      // After interaction, you can reset the interactionComplete if needed
    
      console.log("OilMonster interaction reset after 3 seconds.");
      // CHANGE LATER
      k.destroy(oilMonster);
    });
  }
});

// Separate interaction flag for oilMonster
let smogMonsterInteractionComplete = false;

smogMonster.onCollide("player", (player) => {
  if (!smogMonsterInteractionComplete) {
    console.log("Collided with the smogMonster");

    // Reset text before each interaction
    store.set(textBoxContentAtom, "");

    // Animation logic based on player's direction
    if (player.direction.eq(k.vec2(0, -1))) {
      smogMonster.play("npc-down");
      store.set(textBoxContentAtom, "Big companies brought me here...");
    }

    if (player.direction.eq(k.vec2(0, 1))) {
      smogMonster.play("npc-up");
      store.set(textBoxContentAtom, "Hard to breath ain't it...");

    }

    if (player.direction.eq(k.vec2(1, 0))) {
      smogMonster.play("npc-right");
      store.set(textBoxContentAtom, "Big companies brought me here...");

    }

    if (player.direction.eq(k.vec2(-1, 0))) {
      smogMonster.play("npc-left");
      store.set(textBoxContentAtom, "Hard to breath ain't it...");

    }

    // Show the text box
    store.set(isTextBoxVisibleAtom, true);

    // Set interaction as complete so that the collision doesn't repeat
    smogMonsterInteractionComplete = true;


    k.wait(3, () => {
      // After interaction, you can reset the interactionComplete if needed
    
      console.log("OilMonster interaction reset after 3 seconds.");
      // CHANGE LATER
      k.destroy(smogMonster);
    });
  }
});

// Separate interaction flag for PlasticMonster
let PlasticMonsterInteractionComplete = false;

PlasticMonsterr.onCollide("player", (player) => {
  if (!PlasticMonsterInteractionComplete) {
    console.log("Collided with the smogMonster");

    // Reset text before each interaction
    store.set(textBoxContentAtom, "");

    // Animation logic based on player's direction
    if (player.direction.eq(k.vec2(0, -1))) {
      PlasticMonster.play("npc-down");
      store.set(textBoxContentAtom, "I am harmful for the ocean...");
    }

    if (player.direction.eq(k.vec2(0, 1))) {
      PlasticMonster.play("npc-up");
      store.set(textBoxContentAtom, "Those poor turtle confuse me for food...");

    }

    if (player.direction.eq(k.vec2(1, 0))) {
      PlasticMonster.play("npc-right");
      store.set(textBoxContentAtom, "I fell off a boat by the coast, no one came to pick me up so I have just made a mess everywhere...");

    }

    if (player.direction.eq(k.vec2(-1, 0))) {
      PlasticMonster.play("npc-left");
      store.set(textBoxContentAtom, "I fell off a boat by the coast, no one came to pick me up so I have just made a mess everywhere...");

    }

    // Show the text box
    store.set(isTextBoxVisibleAtom, true);

    // Set interaction as complete so that the collision doesn't repeat
    PlasticMonsterInteractionComplete = true;


    k.wait(3, () => {
      // After interaction, you can reset the interactionComplete if needed
    
      console.log("PlasticMonster interaction reset after 3 seconds.");
      // CHANGE LATER
      k.destroy(PlasticMonster);
    });
  }
});

let TrashcanMonsterInteractionComplete = false;

smogMonster.onCollide("player", (player) => {
  if (!TrashcanMonsterInteractionComplete) {
    console.log("Collided with the smogMonster");

    // Reset text before each interaction
    store.set(textBoxContentAtom, "");

    // Animation logic based on player's direction
    if (player.direction.eq(k.vec2(0, -1))) {
      TrashcanMonster.play("npc-down");
      store.set(textBoxContentAtom, "I am harmful for the ocean...");
    }

    if (player.direction.eq(k.vec2(0, 1))) {
      TrashcanMonster.play("npc-up");
      store.set(textBoxContentAtom, "Those poor turtle confuse me for food...");

    }

    if (player.direction.eq(k.vec2(1, 0))) {
      TrashcanMonster.play("npc-right");
      store.set(textBoxContentAtom, "I fell off a boat by the coast, no one came to pick me up so I have just made a mess everywhere...");

    }

    if (player.direction.eq(k.vec2(-1, 0))) {
      TrashcanMonster.play("npc-left");
      store.set(textBoxContentAtom, "I fell off a boat by the coast, no one came to pick me up so I have just made a mess everywhere...");

    }

    // Show the text box
    store.set(isTextBoxVisibleAtom, true);

    // Set interaction as complete so that the collision doesn't repeat
    TrashcanMonsterInteractionComplete = true;


    k.wait(3, () => {
      // After interaction, you can reset the interactionComplete if needed
    
      console.log("Trashcan Monster interaction reset after 3 seconds.");
      // CHANGE LATER
      k.destroy(TrashcanMonster);
    });
  }
});

let sickwomanInteractionComplete = false;

sickwoman.onCollide("player", (player) => {
  if (!sickwomanInteractionComplete) {
    console.log("Collided with the smogMonster");

    // Reset text before each interaction
    store.set(textBoxContentAtom, "");

    // Animation logic based on player's direction
    if (player.direction.eq(k.vec2(0, -1))) {
      sickwoman.play("npc-down");
      store.set(textBoxContentAtom, "Cough Cough...");
    }

    if (player.direction.eq(k.vec2(0, 1))) {
      sickwoman.play("npc-up");
      store.set(textBoxContentAtom, "The pollution got me sick...");

    }

    if (player.direction.eq(k.vec2(1, 0))) {
      sickwoman.play("npc-right");
      store.set(textBoxContentAtom, "Cough Cough...");

    }

    if (player.direction.eq(k.vec2(-1, 0))) {
      sickwoman.play("npc-left");
      store.set(textBoxContentAtom, "I'm so ill because of pollution...");

    }

    // Show the text box
    store.set(isTextBoxVisibleAtom, true);

    // Set interaction as complete so that the collision doesn't repeat
    sickwomanInteractionComplete = true;


    k.wait(3, () => {
      // After interaction, you can reset the interactionComplete if needed
    
      console.log("sickwoman interaction reset after 3 seconds.");
      // CHANGE LATER
      k.destroy(sickwoman);
    });
  }
});
}
