/**
 *
 * Main Game Module
 *
*/
define(["require", "exports", "./Sprite", "./Player", "./Rules", "./BestPlayerStorage"], function (require, exports, Sprite_1, Player_1, Rules_1, BestPlayerStorage_1) {
    "use strict";
    /** variable defines whether the game is playing */
    var playing;
    /** playing field */
    var canvas;
    /** array of sprites */
    var cubes = [];
    /** timer HTML element*/
    var timeId = document.getElementById('topPanel');
    /** score HTML element */
    var scoreCanvasId = document.getElementById('score');
    /** game time */
    var gameTime;
    /** game score */
    var gameScore;
    /** variable defines color id, which increase score result */
    var mainScoreColorId;
    /** game loop */
    function gameLoop() {
        // is playing?
        if (!playing)
            return;
        window.requestAnimationFrame(gameLoop);
        // if time is over
        if (gameTime <= 0) {
            playing = false;
            return;
        }
        // game score
        if (playing)
            scoreCanvasId.innerHTML = "SCORE: " + gameScore;
        // update frames
        for (var i = 0; i < cubes.length; i++) {
            if (cubes[i].isRender)
                cubes[i].updateFrame();
        }
        // render frames
        for (var i = 0; i < cubes.length; i++)
            cubes[i].renderFrame();
        // change render condition
        for (var i = 0; i < cubes.length; i++) {
            if (cubes[i].colorId >= 0)
                if ((cubes[i].frameIndex % 8 === 0) && (cubes[i].frameIndex === cubes[i].colorId * 8))
                    cubes[i].isRender = false;
        }
    }
    /** decrease time */
    function decreaseTime() {
        if (!playing)
            return;
        gameTime--;
        timeId.innerHTML = "TIME:      " + gameTime;
    }
    /** activate sprite animation, check rules */
    function onMouseDown(event) {
        // is playing?
        if (!playing)
            return;
        // coordinates of MouseEvent
        var x = 0;
        var y = 0;
        // height from top to canvas 
        var height = canvas.getBoundingClientRect().top;
        x = event.clientX - canvas.offsetLeft;
        y = event.clientY - canvas.offsetTop + 127 - height;
        // make renderable, update sprite color id
        for (var i = 0; i < cubes.length; i++) {
            if (cubes[i].colorId >= 0)
                if (((x > cubes[i].x) && (x < cubes[i].x + 50)) && ((y > cubes[i].y) && (y < cubes[i].y + 50))) {
                    cubes[i].isRender = true;
                    cubes[i].updateColorId();
                    gameScore = Rules_1.gameRules(cubes, i, mainScoreColorId, gameScore);
                    gameTime = Rules_1.destroyRule(cubes, i, gameTime);
                }
        }
    }
    /** main game loop */
    function mainGameLoop() {
        if (playing)
            gameLoop();
        document.addEventListener('click', onMouseDown);
    }
    window.onload = function () {
        // login HTML input element 
        var login = document.getElementById("login");
        // submit button HTML element 
        var submitId = document.getElementById('submit');
        // start button HTML element 
        var startId = document.getElementById('start');
        // reset button HTML element 
        var resetId = document.getElementById('reset');
        // close button HTML element 
        var closeId = document.getElementById('scoreWindow');
        // ++score HTML element
        var scoreId1 = document.getElementById('scoreAdd1');
        // --score HTML element 
        var scoreId2 = document.getElementById('scoreAdd2');
        // canvas
        canvas = document.getElementById("mainCanvas");
        if (!canvas)
            return;
        var ctx = canvas.getContext("2d");
        // timer id
        var timerId;
        // create sprite sheet
        var cubeImage = new Image();
        // load image
        cubeImage.src = "cube-sprite.png";
        playing = false;
        gameScore = 0;
        gameTime = 30;
        mainScoreColorId = Rules_1.setMainScoreColorId();
        Rules_1.displayRule(mainScoreColorId, scoreId1, scoreId2);
        // initialize game field with cubes
        for (var j = 0; j < 13; j++)
            for (var i = 0; i < 13; i++)
                cubes.push(new Sprite_1.default(i * 50, j * 50, 32, 6400, 200, ctx, cubeImage));
        // new player 
        var player;
        // GAME
        function myGame() {
            if (gameTime <= 0)
                return;
            if (playing)
                return;
            playing = true;
            mainGameLoop();
            timerId = setInterval(decreaseTime, 1000);
        }
        // RESET GAME 
        function resetGame() {
            player.score = (gameScore).toString();
            BestPlayerStorage_1.storeBestResult(gameScore, player);
            // show stats window
            show();
            // stop time 
            clearInterval(timerId);
            gameScore = 0;
            playing = false;
            ctx.clearRect(0, 0, 650, 650);
            // reinitialize game parameters
            gameTime = 30;
            for (var i = 0; i < cubes.length; i++)
                cubes[i].setNewColorId();
            timeId.innerHTML = "TIME:      " + gameTime;
            scoreCanvasId.innerHTML = "SCORE: " + gameScore;
            mainScoreColorId = Rules_1.setMainScoreColorId();
            Rules_1.displayRule(mainScoreColorId, scoreId1, scoreId2);
        }
        // show stats window
        function submitLogin() {
            var e = document.getElementById('loginAndRulesWindow');
            e.style.display = 'none';
            player = new Player_1.default(login.value, (gameScore).toString());
        }
        // show stats window
        function show() {
            var e = document.getElementById('scoreWindow');
            var stats = document.getElementById('stats');
            var bestRes = document.getElementById('bestRes');
            var bestPlayer = BestPlayerStorage_1.getBestResult();
            e.style.display = 'block';
            stats.innerHTML = player.login + "    YOUR SCORE:   " + gameScore;
            bestRes.innerHTML = bestPlayer.login + "    " + bestPlayer.score;
        }
        // close stats window
        function close() {
            var e = document.getElementById('scoreWindow');
            e.style.display = 'none';
        }
        closeId.addEventListener('click', close);
        startId.addEventListener('click', myGame);
        resetId.addEventListener('click', resetGame);
        submitId.addEventListener('click', submitLogin);
    };
});
//# sourceMappingURL=main.js.map