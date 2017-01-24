
/**
 *  
 * Main Game Module
 * 
*/

/** Sprite class*/
import Sprite from "./Sprite";

/** Player class*/
import Player from "./Player";

/** Rules */
import { scoreAdjustment, redRule, yellowRule, blueRule, greenRule, destroyRule, setMainScoreColorId, gameRules, displayRule, displayColor} from "./Rules";

/** Best Player Storage */
import { getBestResult, hasBestResult, setNewBestResult, storeBestResult, removeBestResult, isNewResult } from "./BestPlayerStorage";



/** variable defines whether the game is playing */
let playing: boolean;

/** playing field */
let canvas: HTMLCanvasElement;

/** array of sprites */
let cubes: Sprite[] = [];

/** timer HTML element*/
const timeId = document.getElementById('topPanel') as HTMLElement;

/** score HTML element */
const scoreCanvasId = document.getElementById('score') as HTMLElement;

/** game time */
let gameTime: number;

/** game score */
let gameScore: number;

/** variable defines color id, which increase score result */
let mainScoreColorId: number;



/** game loop */
function gameLoop()
{
    // is playing?
    if (!playing) return;

    window.requestAnimationFrame(gameLoop);

    // if time is over
    if (gameTime <= 0) 
    {
        playing = false;
        return;
    }

    // game score
    if(playing)
        scoreCanvasId.innerHTML = "SCORE: " + gameScore;
    
    // update frames
    for(let i=0; i<cubes.length; i++)	
    {
        if (cubes[i].isRender)
            cubes[i].updateFrame();       
    }
     
    // render frames
    for(let i=0; i<cubes.length; i++)	
        cubes[i].renderFrame();
    
    // change render condition
    for(let i=0; i<cubes.length; i++)	
    {
        if(cubes[i].colorId >= 0)
             if( (cubes[i].frameIndex%8 === 0) && (cubes[i].frameIndex === cubes[i].colorId*8 ) ) cubes[i].isRender = false;
    }  
}



/** decrease time */
function decreaseTime()
{
    if(!playing) return;
    gameTime--;
    timeId.innerHTML = "TIME:      " + gameTime;
}



/** activate sprite animation, check rules */
function onMouseDown(event: MouseEvent): void 
{
    // is playing?
    if(!playing) return;

    // coordinates of MouseEvent
    let x = 0;
    let y = 0;

    // height from top to canvas 
    let height = canvas.getBoundingClientRect().top
    
    x = event.clientX - canvas.offsetLeft;
    y = event.clientY - canvas.offsetTop + 127 - height;

    // make renderable, update sprite color id
    for(let i=0; i<cubes.length; i++)	
    {
        if(cubes[i].colorId >= 0)
        if(  ( (x > cubes[i].x) && (x < cubes[i].x + 50) ) &&  ( (y > cubes[i].y) && (y < cubes[i].y + 50) )  )
        {
            cubes[i].isRender = true;
            cubes[i].updateColorId();
            gameScore = gameRules(cubes,i,mainScoreColorId,gameScore);
            gameTime = destroyRule(cubes,i,gameTime);
        }
    }
}



/** main game loop */
function mainGameLoop()
{
    if (playing)
        gameLoop();
    document.addEventListener( 'click', onMouseDown);    
}



window.onload = function()
{
    // login HTML input element 
    const login = document.getElementById("login") as HTMLInputElement;
    // submit button HTML element 
    const submitId = document.getElementById('submit') as HTMLElement;
    // start button HTML element 
    const startId = document.getElementById('start') as HTMLElement;
    // reset button HTML element 
    const resetId = document.getElementById('reset') as HTMLElement;
    // close button HTML element 
    const closeId = document.getElementById('scoreWindow') as HTMLElement;
    // ++score HTML element
    const scoreId1 = document.getElementById('scoreAdd1') as HTMLElement;
    // --score HTML element 
    const scoreId2 = document.getElementById('scoreAdd2') as HTMLElement;
    // canvas
    canvas = document.getElementById("mainCanvas") as HTMLCanvasElement;
    if(!canvas) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    // timer id
    let timerId: number;
    // create sprite sheet
    let cubeImage = new Image();    
    // load image
    cubeImage.src ="cube-sprite.png";
    playing = false;
    gameScore = 0;
    gameTime = 30;
    mainScoreColorId = setMainScoreColorId();
    displayRule(mainScoreColorId,scoreId1,scoreId2);
    // initialize game field with cubes
    for(let j=0; j<13; j++)
        for(let i=0; i<13; i++)	
            cubes.push(new Sprite(i*50,j*50,32,6400,200,ctx,cubeImage));

    // new player 
    let player: Player; 

    // GAME
    function myGame()
    {
        if(gameTime<=0) return;
        if(playing) return;
        playing = true;
        mainGameLoop();
        timerId = setInterval(decreaseTime,1000);
    }

    // RESET GAME 
    function resetGame()
    {
        player.score = (gameScore).toString();
        storeBestResult(gameScore, player);
        // show stats window
        show();
        // stop time 
        clearInterval(timerId);
        gameScore = 0;   
        playing = false;
        ctx.clearRect(0, 0, 650, 650);
        // reinitialize game parameters
        gameTime = 30;
        for(let i=0; i<cubes.length; i++)
            cubes[i].setNewColorId();
        timeId.innerHTML = "TIME:      " + gameTime;
        scoreCanvasId.innerHTML = "SCORE: " + gameScore;
        mainScoreColorId = setMainScoreColorId();
        displayRule(mainScoreColorId,scoreId1,scoreId2);       
    }

    // show stats window
    function submitLogin()
    {
        const e = document.getElementById('loginAndRulesWindow') as HTMLElement;
        e.style.display = 'none';
        player = new Player(login.value,(gameScore).toString());
    }

    // show stats window
    function show()
    {
        const e = document.getElementById('scoreWindow') as HTMLElement;
        const stats = document.getElementById('stats') as HTMLElement;
        const bestRes = document.getElementById('bestRes') as HTMLElement;
        const bestPlayer = getBestResult();
        e.style.display = 'block';
        stats.innerHTML = player.login + "    YOUR SCORE:   " + gameScore;
        bestRes.innerHTML = bestPlayer.login + "    " + bestPlayer.score;
    }

    // close stats window
    function close()
    {
        const e = document.getElementById('scoreWindow') as HTMLElement;
        e.style.display='none';
    }

    closeId.addEventListener('click', close); 
    startId.addEventListener('click', myGame); 
    resetId.addEventListener('click', resetGame); 
    submitId.addEventListener('click', submitLogin); 
}




 

