
/** 
 * Best player storage 
 */


import Player from "./Player";



/** set new best result and save it at localStorage */
export function setNewBestResult(newPlayer: Player): void
{
    localStorage.setItem('bestResult', JSON.stringify(newPlayer));
}



/** get best result from localStorage */
export function getBestResult(): Player
{
    return JSON.parse(localStorage['bestResult']);
}



/** check, if current game score > than best result, stored in localStorage
 * 
 * @param result Result - current game score
 * 
 */
export function isNewResult(result: number): boolean
{   
    if (parseInt(getBestResult().score) < result) 
        return true;
    return false;
} 



/** check, if best result has already been saved */
export function hasBestResult(): boolean
{
    const res = getBestResult();
    if(!!res.login) return true;
    return false;
}



/** remove best result from localStorage */
export function removeBestResult()
{
    localStorage.removeItem('bestResult');
}



/** check and set new best result in localStorage
 * 
 * @param score Current game score
 * @param player Player
 * 
 */
export function storeBestResult(score: number, player: Player)
{
    if(hasBestResult())
        if(isNewResult(score))
        {
            removeBestResult();
            setNewBestResult(player);
            return;
        } 
        else return;  

    setNewBestResult(player);
}
