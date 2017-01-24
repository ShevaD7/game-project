
/**
 * Module of Sprite class
 * 
 * @module
 */
;


/** 
 * Sprite class
 */

class Sprite
{
    /** color id (0-3) */
    public colorId: number;

    /** x coordinate */
    public x: number;

    /** y coordinate */
    public y: number;

    /** variable defines when to start sprite animation */ 
    public isRender: boolean;
    
    /** index of the current frame */
    public frameIndex: number;

    /** number of frames */
    private numberOfFrames: number;

    /** width of sprite */
    private width: number;

    /** height of sprite */
    private height: number;
    
    /**/ 
    private context: any;

    /** image - sprite */ 
    private image: any;


    /**
     * constructor
     * 
     * @param x Coordinate x
     * @param y Coordinate y
     * @param numberOfFrames Number of frames
     * @param width Width of sprite
     * @param height Height of sprite
     * @param image Sprite image
     * 
     */
    constructor(x: number, y: number, numberOfFrames: number, width: number, height: number, context: any, image: any)
    {
        this.colorId = Math.floor(Math.random() * 4);
        this.x = x;
        this.y = y;
        this.isRender = false;
        this.frameIndex = this.colorId * 8;
        this.numberOfFrames = numberOfFrames;
        this.width = width;
        this.height = height;
        this.context = context;
        this.image = image;
    }



    /** update color id to the next id(0-3) */
    public updateColorId(): void
    {
        if (this.colorId < 3)
        {	
            this.colorId += 1;
            return;
        } 
             
        this.colorId = 0;
    }



    /** update frame */
    public updateFrame(): void
    {

        if(this.colorId === -1) return;

        if (this.frameIndex < this.numberOfFrames - 1)
        {	
            this.frameIndex += 1;
            return;
        } 

        this.frameIndex = 0;
    }

           

    /** render frame */
    public renderFrame(): void
    {
        this.context.clearRect(this.x, this.y, this.width, this.height);

        if (this.colorId === -1) return;

        this.context.drawImage(
            this.image,
            this.frameIndex * this.width / this.numberOfFrames,
            0,
            this.width / this.numberOfFrames,
            this.height,
            this.x,
            this.y,
            this.width / this.numberOfFrames/4,
            this.height/4
        );
    }



    /** make invisible */
    public destroyCube(): void
    {
        this.colorId = -1;
    }



    /** randomly set new color id */
    public setNewColorId(): void
    {
        this.colorId = Math.floor(Math.random() * 4);
        this.frameIndex = this.colorId * 8;
    }
}




/**
 * Module
 */
export {
	Sprite as default,
};

