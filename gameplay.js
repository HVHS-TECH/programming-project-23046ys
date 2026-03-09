/*******************************************************/
// P5.play: gameplay
// Main Gameplay
/// Written by 
/*******************************************************/
	
/*******************************************************/
// setup()
/*******************************************************/

const TIMER_SPEED= 1/50;

var score= 0;
var battery= 100;
var enemyStage= 1;

let doorClosed= false;
let gameEnded= false;

let enemySpeedArray= [1,7];


function setup() {
	console.log("setup: ");
	cnv = new Canvas(((windowWidth/6)*4), windowHeight);

	timer= new Sprite(-20,0,10,10);
    timer.vel.y= TIMER_SPEED;

    batteryDrain= new Sprite(-20,0,10,10);
    batteryDrain.vel.y= 0.01;

    enemyMovement= new Sprite(0,-20,10,10);
    enemyMovement.vel.x= 0.5;
}

function setEnemySpeed(){
    if(enemyStage==3){
        enemyMovement.vel.x= 1;
    }else{
        enemyMovement.vel.x= random(enemySpeedArray[1],enemySpeedArray[2]) / 10;
    }
}

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



function doorControl(){

    if(battery>=1){
        if(kb.pressing('spacebar')){
        doorClosed= true;
        }else{
        doorClosed= false;
        }
    }else{
        doorClosed=false;
    }

}



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
    
    }


}

/*******************************************************/
//  END OF APP
/*******************************************************/