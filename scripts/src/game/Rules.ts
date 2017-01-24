
/** 
 * Rules
 */


import Sprite from "./Sprite";



/* set main score color id(0-3) */
export function setMainScoreColorId(): number
{
    return  ( Math.floor(Math.random() * 4) );
}



/**
 * get score id, which defines rules 
 * 
 * @param mainScoreColorId Main score color id 
 * @param colorId Color id
 * 
 */
export function getScoreIdFromColorId(mainScoreColorId: number, colorId: number): number
{
    if(mainScoreColorId === 0) return colorId;
    
    const i = colorId - mainScoreColorId;

    if(i >= 0) 
        return i;
    else    
        return (3+i+1);
} 



/**
 * defines red rule, affects rendering of other sprites
 * 
 * @param cubes Array of sprites
 * @param i Current array index
 * @param mainScoreColorId Main score color id 
 * @param gameScore Game score
 * 
 */
export function redRule(cubes: Sprite [], i: number, mainScoreColorId: number, gameScore: number): void
{
    if( Math.floor((i-1)/13) === Math.floor(i/13) ) 
    {
        if(cubes[i-1].colorId >= 0)
        {
            cubes[i-1].isRender = true;
            cubes[i-1].colorId = 3;
            scoreAdjustment(mainScoreColorId,cubes[i-1].colorId,gameScore);
        }
    }

    if( Math.floor((i+1)/13) === Math.floor(i/13) ) 
    {
        if(cubes[i+1].colorId >= 0)
        {
            cubes[i+1].isRender = true;
            cubes[i+1].colorId = 3;
            scoreAdjustment(mainScoreColorId,cubes[i+1].colorId,gameScore);
        }
           
    }
}

    

/**
 * defines yellow rule, affects rendering of other sprites
 * 
 * @param cubes Array of sprites
 * @param i Current array index
 * @param mainScoreColorId Main score color id 
 * @param gameScore Game score
 * 
 */
export function yellowRule(cubes: Sprite [], i: number, mainScoreColorId: number, gameScore: number): void
{
    if (i-13 >= 0) 
    {
        if(cubes[i-13].colorId >= 0)
        {
            cubes[i-13].isRender = true;
            cubes[i-13].colorId = 0;
            scoreAdjustment(mainScoreColorId,cubes[i-13].colorId,gameScore);
        }
    }

    if(i+13 < cubes.length) 
    {
        if(cubes[i+13].colorId >= 0)
        {
            cubes[i+13].isRender = true;
            cubes[i+13].colorId = 0;
            scoreAdjustment(mainScoreColorId,cubes[i+13].colorId,gameScore);
        }
    }
}



/**
 * defines blue rule, affects rendering of other sprites
 * 
 * @param cubes Array of sprites
 * @param i Current array index
 * @param mainScoreColorId Main score color id 
 * @param gameScore Game score
 * 
 */
export function blueRule(cubes: Sprite [], i: number, mainScoreColorId: number, gameScore: number): void
{
    if (i-14 >= 0) 
    {
        if(cubes[i-14].colorId >= 0)
        {
            cubes[i-14].isRender = true;
            cubes[i-14].colorId = 1;
            scoreAdjustment(mainScoreColorId,cubes[i-14].colorId,gameScore);
        }
    }

    if(i+14 < cubes.length) 
    {
        if(cubes[i+14].colorId >= 0)
        {
            cubes[i+14].isRender = true;
            cubes[i+14].colorId = 1;
            scoreAdjustment(mainScoreColorId,cubes[i+14].colorId,gameScore);
        }
    }
}



/**
 * defines green rule, affects rendering of other sprites
 * 
 * @param cubes Array of sprites
 * @param i Current array index
 * @param mainScoreColorId Main score color id 
 * @param gameScore Game score
 * 
 */
export function greenRule(cubes: Sprite [], i: number, mainScoreColorId: number, gameScore: number): void
{
    if (i-12 >= 0) 
    {
        if(cubes[i-12].colorId >= 0)
        {
            cubes[i-12].isRender = true;
            cubes[i-12].colorId = 2;
            scoreAdjustment(mainScoreColorId,cubes[i-12].colorId,gameScore);
        }
    }

    if(i+12 < cubes.length) 
    {
        if(cubes[i+12].colorId >= 0)
        {
            cubes[i+12].isRender = true;
            cubes[i+12].colorId = 2;
            scoreAdjustment(mainScoreColorId,cubes[i+12].colorId,gameScore);
        }
    }
}



/**
 * destroy rule
 * 
 * @param cubes Array of sprites
 * @param i Current array index
 * @param gameTime Game time
 * 
 */
export function destroyRule(cubes: Sprite [], i: number, gameTime: number): number
{
    if ( ( Math.floor((i-1)/13) === Math.floor(i/13) ) && ( Math.floor((i+1)/13) === Math.floor(i/13) ) )
    {
        if( (cubes[i].colorId === cubes[i-1].colorId) && (cubes[i].colorId === cubes[i+1].colorId) )
        {
            cubes[i-1].destroyCube();
            cubes[i].destroyCube();
            cubes[i+1].destroyCube();
            return gameTime += 4; 
        }
    }

    if ( (i-13 >= 0) && (i+13 < cubes.length) )
    {
        if( (cubes[i].colorId === cubes[i-13].colorId) && (cubes[i].colorId === cubes[i+13].colorId) )
        {
            cubes[i-13].destroyCube();
            cubes[i].destroyCube();
            cubes[i+13].destroyCube();
            return gameTime += 4; 
        }
    }
    return gameTime;
}



/**
 * increase or decrease score result
 * 
 * @param mainScoreColorId Main score color id 
 * @param colorId Color id
 * @param gameScore Game score
 * 
 */
export function scoreAdjustment(mainScoreColorId: number, colorId: number, gameScore: number): number
{
    let i = getScoreIdFromColorId(mainScoreColorId, colorId);
    switch(i)
    {
        case 0:
        {
            gameScore += 25; 
            return gameScore;
            // break;
        }
           
        case 1:
        {
            // gameScore += 0; 
            return gameScore;
            // gameTime += 100; 
            // break;
        }
           
        case 2:
        {
             gameScore -= 10; 
             return gameScore;
            // break;
        }
            
        case 3:
        {

            // gameScore += 0; 
            return gameScore;
            // gameTime -= 50; 
            // break;   
        }      
        default:
        {
            return gameScore;
        }  
    }
}



/**
 * GAME RULES
 * 
 * @param cubes Array of sprites
 * @param i Current array index
 * @param mainScoreColorId Main score color id 
 * @param gameScore Game score
 * 
 */
export function gameRules(cubes: Sprite[], i: number, mainScoreColorId: number, gameScore: number): number
{
    switch(cubes[i].colorId)
    {
        case 0:
        {
            gameScore=scoreAdjustment(mainScoreColorId,0,gameScore);
            redRule(cubes,i,mainScoreColorId,gameScore);
            return gameScore;
        }
            
        case 1:
        {
            gameScore=scoreAdjustment(mainScoreColorId,1,gameScore);
            yellowRule(cubes,i,mainScoreColorId,gameScore);
            return gameScore;
        }
            
        case 2:
        {
            gameScore=scoreAdjustment(mainScoreColorId,2,gameScore);
            blueRule(cubes,i,mainScoreColorId,gameScore);
            return gameScore;
        }
            
        case 3:
        {
            gameScore=scoreAdjustment(mainScoreColorId,3,gameScore);
            greenRule(cubes,i,mainScoreColorId,gameScore);
            return gameScore;
        }

            default: return gameScore;;
    }
}



/**
 * display score color
 * 
 * @param score Score
 * @param elem HTML element
 * 
 */
export function displayColor(score: number, elem: HTMLElement)
{
    switch(score)
    {
        case 0:
        {
            elem.className = 'red';
            break;
        }
           
        case 1:
        {      
            elem.className = 'yellow';
            break;
        }
           
        case 2:
        {
            elem.className = 'blue';
            break;
        }
            
        case 3:
        {
            elem.className = 'green';
            break;   
        }        
    }

}



/**
 * display score rules
 * 
 * @param mainScoreColorId Main score color id 
 * @param id1 HTML element
 * @param id2 HTML element
 * 
 */
export function displayRule(mainScoreColorId: number, id1: HTMLElement, id2: HTMLElement)
{
    if(!id1 && !id2) return;
    let negativeScore: number;
    if(mainScoreColorId + 2 <= 3) 
        negativeScore = mainScoreColorId + 2;
    else
        negativeScore = mainScoreColorId - 2;

    displayColor(mainScoreColorId,id1);
    displayColor(negativeScore,id2);
}