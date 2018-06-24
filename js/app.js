
var Game = require("./game.js");


var game = new Game();
game.furry;
game.coin;
document.addEventListener('keydown', function(event){
    game.turnFurry(event.keyCode);
});

game.showFurry();
game.showCoin();
game.startGame();

