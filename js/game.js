var score = document.querySelector('#score strong');
var over = document.getElementById('over');
var overScore = document.getElementById('end-score');
var coinAudio = new Audio('sounds/coin.wav');
var crashAudio = new Audio('sounds/crash.wav');
var gameOver = 0;

var Furry = require("./furry.js");
var Coin = require("./coin.js");

function Game() {
    this.board = document.querySelectorAll("section#board div");
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.index = function(x,y) {
        return x + (y * 10);
    }
    this.showFurry = function() {
        this.board[ this.index(this.furry.x,this.furry.y) ].classList.add('furry');
    }
    this.hideFurry = function() {
        this.board[ this.index(this.furry.x,this.furry.y) ].classList.remove('furry');
    }
    this.showCoin =  function(){
        this.board[ this.index(this.coin.x,this.coin.y) ].classList.add('coin');
    }
    this.idSetInterval = 0;
    this.moveFurry = function() {

        this.hideFurry();

        if (this.furry.direction === 'right') {
            this.furry.x = this.furry.x+1;
        } else if (this.furry.direction === 'left') {
            this.furry.x = this.furry.x-1;
        } else if (this.furry.direction === 'down') {
            this.furry.y = this.furry.y+1;
        } else if (this.furry.direction === 'up') {
            this.furry.y = this.furry.y-1;
        }

        this.gameOver();

        this.showFurry();

        this.checkCoinCollision();


    }

    this.startGame = function() {

        var self = this;

        this.idSetInterval = setInterval(function () {
            self.moveFurry();
        }, 250);

    }

    this.turnFurry = function(event) {

        if (event === 37) {
            this.furry.direction = 'left';
        } else if (event === 39) {
            this.furry.direction = 'right';
        } else if (event===38) {
            this.furry.direction = 'up';
        } else if (event === 40) {
            this.furry.direction = 'down';
        }

    }

    this.checkCoinCollision = function() {
        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
            this.board[ this.index(this.coin.x,this.coin.y) ].classList.remove('coin');
            coinAudio.play();
            this.score = this.score+1;
            score.innerText = this.score;
            this.coin;
            this.coin.x = Math.floor(Math.random() * 10);
            this.coin.y = Math.floor(Math.random() * 10);
            this.showCoin();
        }
    }

    this.gameOver = function() {
        if (this.furry.x < 0 || this.furry.y < 0 || this.furry.x > 9 || this.furry.y > 9) {

            clearInterval(this.idSetInterval);

            crashAudio.play();

            if (this.furry.direction === 'right') {
                this.furry.x = this.furry.x-1;
            } else if (this.furry.direction === 'left') {
                this.furry.x = this.furry.x+1;
            } else if (this.furry.direction === 'down') {
                this.furry.y = this.furry.y-1;
            } else if (this.furry.direction === 'up') {
                this.furry.y = this.furry.y+1;
            }

            this.board[ this.index(this.furry.x,this.furry.y) ].classList.add('boom');

            over.classList.remove('invisible');

            overScore.innerText = "TWÓJ WYNIK: " + this.score;

        }
    }

}

module.exports = Game;