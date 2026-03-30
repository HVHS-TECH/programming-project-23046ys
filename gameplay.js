/*******************************************************/
// P5.play: gameplay
// Main Gameplay
/// Written by 
/*******************************************************/

//Constants

const TIMER_SPEED = 1 / 50;

//Booleans

let doorClosed = false;
let stunCharged = false;
let gainingBattery = false;
let gameEnded = false;

//Arrays

let enemySpeedArray = [0.5, 5];

//Variables

var score = 0;
var battery = 100;
var enemyStage = 1;
var enemyAttackSpeed = 1;
var enemyLeaveSpeed = 1;

/*******************************************************/
// setup()
/*******************************************************/




function setup() {
    console.log("setup: ");
    cnv = new Canvas(1920, 911);

    timer = new Sprite(-20, 0, 10, 10);
    timer.vel.y = TIMER_SPEED;

    batteryDrain = new Sprite(-20, 0, 10, 10);
    batteryDrain.vel.y = 0.01;

    enemyMovement = new Sprite(0, -20, 10, 10);
    enemyMovement.moveTo(-100,-20,0.5)

    stunCharging = new Sprite(0, -20, 10, 10)
    stunCharging.vel.x = 0.01;

    doorSprite = new Sprite(1920/2,350,400,300)
}

//Enemy

function setEnemySpeed() {

        //Increases enemy speed based on score
    if (score >= 100) {
        if (score <= 250) {
            enemySpeedArray[0] = 250 / 100;
            enemySpeedArray[1] = 250 / 50;
        } else {
            enemySpeedArray[0] = score / 100;
            enemySpeedArray[1] = score / 50;
        }
    }
        //Sets speed of enemy, speed is not randomised at stage 3
    if (enemyStage == 3) {

        if (doorClosed == true) {
            enemyMovement.moveTo(-100,-20, enemyLeaveSpeed)
        } else {
            enemyMovement.moveTo(-100,-20,enemyAttackSpeed)
        }

    } else {
        enemyMovement.moveTo(-100,-20, random(enemySpeedArray[0], enemySpeedArray[1]) / 10)
    }
}



function enemyMove() {
        //Changes enemies stage to the next one when the corresponding sprite is past a specific distance
    if (enemyMovement.position.x <= -100) {

        enemyMovement.position.x = 0;

        if (enemyStage == 3) {
            console.log("Enemy Attacking");
            if (doorClosed == true) {
                enemyStage = 1;
                setEnemySpeed()
            } else {
                endGame()
            }

        } else {
            enemyStage = enemyStage + 1;
            setEnemySpeed()
        }

    }
}

//Battery

function drainBattery() {

    if (doorClosed == true) {
        batteryDrain.vel.y = 0.05;
    } else if (gainingBattery == true) {
        batteryDrain.vel.y = -0.01;
    } else {
        batteryDrain.vel.y = 0.01;
    }
        //Changes the battery's value based on corresponding sprites position
    if (battery >= 1) {
        battery = Math.round(100 - batteryDrain.position.y);
    } else {
        battery = 0;
    }

    

}


function gainBattery() {
    if (score >= 50) {
        if (battery <= 60) {
            if (doorClosed == true) {

                gainingBattery = false;

            } else {
                if (kb.pressed('up')) {

                    if (battery <= 40) {
                        gainingBattery = true;
                    }

                } else if (kb.pressed('down')) {

                    gainingBattery = false;

                }
            }
        }
    }
    if (battery >= 100) {
        gainingBattery = false;
    }

}


//Controls

function doorControl() {

    if (battery >= 1) {
        if (gainingBattery == true) {
            doorClosed == false
        } else {
            if (kb.pressing('spacebar')) {
                doorClosed = true;
                console.log("Door closed")
            } else {
                if (kb.released('spacebar')) {
                    console.log("Door opened")
                }
                doorClosed = false;
            }
        }
    } else {
        doorClosed = false;
    }

    if(doorClosed == true){
            if(doorSprite.position.y < 350 ){ 
                doorSprite.moveTo(1920/2,350, 15)
            }
    }
    
    if(doorClosed == false){
            if(doorSprite.position.y > 350-280 ){ 
                doorSprite.moveTo(1920/2,350-280, 6.5)
            }
    }

}


function stunControl() {
    if (stunCharging.position.x >= 50) {
        stunCharging.vel.x = 0;
        stunCharged = true;
    }

    if (kb.pressed('backspace')) {
        if (stunCharged == true) {
            stunCharged = false;
            stunCharging.vel.x = 0.01;
            stunCharging.position.x = 0;
            if (enemyStage >= 2) {
                enemyMovement.position.x = 0;
            }
        }
    }


}

//End Game

function endGame() {
    timer.vel.y = 0;
    enemyMovement.vel.x = 0;
    batteryDrain.vel.y = 0;
    stunCharging.vel.x = 0;
    gameEnded = true;
}

/*******************************************************/
// draw()
/*******************************************************/
function draw() {
    background('#007bff');


    if (gameEnded == false) {

        score = Math.round(timer.position.y);
        text("Score=" + score, 50, 50);
        text("Battery Power=" + battery, 50, 75);
        text("Enemy Stage="+enemyStage, 100, 100);
        text(enemyMovement.position.x,100,110)
        text("Door State:"+doorClosed, 200, 200);

        text("stun charge=" + stunCharging.position.x, 60, 120);
        text("Stun Ready:"+stunCharged,70,140)
        
        drainBattery()

        gainBattery()

        doorControl()

        stunControl()

        enemyMove()

        for (i = 1; i < enemyStage; i++){
        rect(10 * i, 100, 10, 20);
    }

       
    } else {
        text("Game Over", windowWidth / 2, windowHeight / 2);
        text("Score=" + score, windowWidth / 2, windowHeight / 2 + 50);
        
        
    }


}

/*******************************************************/
//  END OF APP
/*******************************************************/