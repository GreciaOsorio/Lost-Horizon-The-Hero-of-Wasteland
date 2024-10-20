
import initKaplay from "./kaplayCtx"; 
import { isTextBoxVisibleAtom, store, textBoxContentAtom } from "./store";
//for firebase
import {db} from './firebase.js'; 
import {collection, addDoc} from 'firebase/firestore'; 

//For Firebase 
export async function addPlayerToFirebase(username){
  try {
    const docRef = await addDoc(collection(db, "Player"), {
      username: username,
      health: 100,
      seedsCurrency: 50,
      // add other properties as needed 
      // weapon, healthPotions, powerPotions
    });
    console.log("Player created with ID: ", docRef.id);
  } catch (error) {
    console.error("Error creating player: ", error);
  }
  console.log("created playerin db");
}

export default async function initGame(username) {
     const k = initKaplay();
    // bc if you move diagonaly 
    const DIAGONAL_FACTOR = 1/Math.sqrt(2)

    k.loadSprite("background", "./background.png"); //how to load background image
    k.loadSprite("characters", "./characters.png", {
        sliceY: 2,
        sliceX: 8,
        anims: { //this defines the animations, the names you choose and the numbers represent the index of the image you wish to showcase
            "down-idle": 0,
            "up-idle": 1,
            "right-idle": 2,
            "left-idle": 3,
            right: { from: 4, to: 5, loop: true },
            left: { from: 6, to: 7, loop: true },
            down: { from: 8, to: 9, loop: true },
            up: { from: 10, to: 11, loop: true },
            "npc-down": 12,
            "npc-up": 13,
            "npc-right": 14,
            "npc-left": 15,
        }
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

    // we didn't create a reference like we did for player because it is not needed
    k.add([k.sprite("background"), k.pos(0, -70), k.scale(8)]);

    // k.add([k.sprite("background"), k.pos(0, -70), k.scale(8)]);
  
    const player = k.add([
        k.sprite("characters", {anim: "down-idle"}),
        k.area(),
        // k body is for the physics/collision
        k.body(),
        k.anchor("center"),
        k.pos(k.center()),
        k.scale(8),
        // adding a tag to identify in collision handlers
        "player",
        // creating custom properties
        {
            // can access in other areas by putting player.speed
            speed: 800,
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
        k.body({ isStatic: true}),
        // centered
        k.anchor("center"),
        // size of bird
        k.scale(7),
        // postition of bird
        k.pos(1480,500),
    ]);

    // use the player tag
    npc.onCollide("player", (player) => {
      console.log("collided with the player");
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
        store.set(textBoxContentAtom, "This text box is made with React.js!");
      }
  
      if (player.direction.eq(k.vec2(-1, 0))) {
        store.set(textBoxContentAtom, "Is the water too cold?");
        npc.play("npc-right");
      }
  
      store.set(isTextBoxVisibleAtom, true);
    });

}