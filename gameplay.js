/*******************************************************/
// P5.play: gameplay
// Main Gameplay
/// Written by 
/*******************************************************/
	
//Constants

const TIMER_SPEED= 1/50;

//Booleans

let doorClosed= false;
let gainingBattery= false;
let gameEnded= false;

//Arrays

let enemySpeedArray= [0.5,5];

//Variables

var score= 0;
var battery= 100;
var enemyStage= 1;
var enemyAttackSpeed= 1;
var enemyLeaveSpeed= 1;

/*******************************************************/
// setup()
/*******************************************************/




function setup() {
	console.log("setup: ");
	cnv = new Canvas(windowWidth, windowHeight);

	timer= new Sprite(-20,0,10,10);
    timer.vel.y= TIMER_SPEED;

    batteryDrain= new Sprite(-20,0,10,10);
    batteryDrain.vel.y= 0.01;

    enemyMovement= new Sprite(0,-20,10,10);
    enemyMovement.vel.x= 0.5;
}

//Enemy Speed randomiser

function setEnemySpeed(){
    
    if(score>=100){
        if(score<=250){
            enemySpeedArray[0]= 250/100;
            enemySpeedArray[1]= 250/50;
        }else{
            enemySpeedArray[0]= score/100;
            enemySpeedArray[1]= score/50;
        }
    }

    if(enemyStage==3){

        if(doorClosed==true){
            enemyMovement.vel.x= enemyLeaveSpeed;
        }else{
        enemyMovement.vel.x= enemyAttackSpeed;
        }
        
    }else{
        enemyMovement.vel.x= random(enemySpeedArray[0],enemySpeedArray[1]) / 10;
    }
}

//Battery Drain function

function drainBattery(){

    if(doorClosed==true){
        batteryDrain.vel.y= 0.05;
    }else{
        batteryDrain.vel.y= 0.01;
    }

    if(battery>=1){
    battery= Math.round(100-batteryDrain.position.y);
    }else{
        battery=0;
    }

}

//Gain Battery Function

function gainBattery(){
    if(doorClosed == true){
        gainingBattery= false;
    }else{
        if(kb.pressed('down')){
            gainingBattery= true;
        }else if(kb.pressed('up')){
            gainingBattery= false;
        }
    }
}

//Enemy Movement

function enemyMove(){

    if(enemyMovement.position.x>=100){

        enemyMovement.position.x= 0;

        if(enemyStage==3){
            console.log("Enemy Attacking");
             if(doorClosed== true){                
                enemyStage= 1;
                setEnemySpeed()
             }else{
                endGame()
             }

       }else{
            enemyStage= enemyStage+1;
            setEnemySpeed()
       }

    }
}

//Door Control

function doorControl(){

    if(battery>=1){
        if(gainingBattery == true){
            doorClosed == false
        }else{
            if(kb.pressing('spacebar')){
            doorClosed= true;
            }else{
            doorClosed= false;
         }
        }
    }else{
        doorClosed=false;
    }

}

//End Game

function endGame(){
    timer.vel.y=0;
    enemyMovement.vel.x=0;
    gameEnded= true;
    console.log("Game Ended");
}
	
/*******************************************************/
// draw()
/*******************************************************/
function draw() {
	background('#007bff'); 
	

    if(gameEnded== false){

        score= Math.round(timer.position.y);
        text("Score="+score, 50, 50);
        text("Power="+ battery, 50, 75);
        text(enemyStage, 100, 100);
        text(doorClosed, 200, 200);

        drainBattery()

        doorControl()

        enemyMove()
    
    }else{
        text("Game Over", windowWidth/2,windowHeight/2);
        text("Score="+score, windowWidth/2,windowHeight/2 + 50);
    }


}

/*******************************************************/
//  END OF APP
/*******************************************************/