
/**
 * Module of Player class
 * 
 * @module
 */
;



/** 
 * Player class
 */
class Player
{   
    /** login */
    public login: string;

    /** score */
    public score: string;

    
    /**
     * constructor
     * 
     * @param login Login
     * @param score Score
     * 
     */
    constructor(login: string, score: string)
    {   
        this.login = login;
        this.score = score;
    }
}



/**
 * Module
 */
export {
	Player as default,
};

