/*******************************************************/
// P5.play: gameplay
// Main Gameplay
/// Written by 
/*******************************************************/
	
/*******************************************************/
// setup()
/*******************************************************/
var score= 0;
var enemyStage= 1;
let doorClosed= false;



function setup() {
	console.log("setup: ");
	cnv = new Canvas(((windowWidth/6)*4), windowHeight);
	timer= new Sprite(0,0,10,10)
    timer.color= 'ccc';
    timer.vel.y=1;
    enemyMovement= new Sprite(0,0,10,10)
    enemyMovement.vel.x= 1;
}

function endGame(){
    timer.vel.y=0;
    enemyMovement.vel.x=0;

}
	
/*******************************************************/
// draw()
/*******************************************************/
function draw() {
	background('#007bff'); 
	



    score= Math.floor(timer.position.y/50);
    text(score, 50, 50)
    text(enemyStage, 100, 100)





    if(enemyMovement.position.x<=1000){
        if(enemyStage==3){
             if(doorclosed== true){
                enemyStage= 1;
         }else{
            endGame()
         }
            enemyMovement.position.x= 0;
       }else{
            enemyStage= 2;
            enemyMovement.position.x= 0;
       }

    }

    



}

/*******************************************************/
//  END OF APP
/*******************************************************/