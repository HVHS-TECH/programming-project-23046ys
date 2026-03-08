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
var enemyStage= 1;

let doorClosed= false;

let enemySpeedArray= [1,7];


function setup() {
	console.log("setup: ");
	cnv = new Canvas(((windowWidth/6)*4), windowHeight);
	timer= new Sprite(0,0,10,10)
    timer.color= 'ccc';
    timer.vel.y= TIMER_SPEED;
    enemyMovement= new Sprite(0,0,10,10)
    enemyMovement.vel.x= 0.5;
}

function setEnemySpeed(){
    if(enemyStage==3){
        enemyMovement.vel.x= 1;
    }else{
        enemyMovement.vel.x= random(enemySpeedArray[1],enemySpeedArray[2]) / 10;
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
    if(kb.pressing('spacebar')){
        doorClosed= true;
    }else{
        doorClosed= false;
    }
}



function endGame(){
    timer.vel.y=0;
    enemyMovement.vel.x=0;
    console.log("Game Ended");
}
	
/*******************************************************/
// draw()
/*******************************************************/
function draw() {
	background('#007bff'); 
	



    score= Math.round(timer.position.y);
    text(score, 50, 50)
    text(enemyStage, 100, 100)
    text(doorClosed, 200, 200)

    doorControl()

    enemyMove()



}

/*******************************************************/
//  END OF APP
/*******************************************************/