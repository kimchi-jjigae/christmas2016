'use strict';
    
var GameOverState = function() {};

GameOverState.prototype = {
    create: function() {
        self = this;
        self.score;
        var style = {
            font: 'bold 32px Arial',
            fill: '#ff9486',
            boundsAlignH: 'center',
            boundsAlignV: 'middle'
        };
        // submit score to the server and then retrieve the top 10 high score list
        // server side: insert score in order and then grab the top 10; if score not in top 10
        // then send back as well, separately
        self.highscores = {
            "scores": [
                {
                    "name": "kalle",
                    "rank": "1",
                    "score": "999999",
                },
                {
                    "name": "balle",
                    "rank": "2",
                    "score": "99999",
                },
                {
                    "name": "ralle",
                    "rank": "3",
                    "score": "88888",
                },
                {
                    "name": "nalle",
                    "rank": "4",
                    "score": "77777",
                },
                {
                    "name": "lalle",
                    "rank": "5",
                    "score": "66666",
                },
                {
                    "name": "hjejhej",
                    "rank": "6",
                    "score": "55555",
                },
                {
                    "name": "poop",
                    "rank": "7",
                    "score": "44444",
                },
                {
                    "name": "I suck",
                    "rank": "8",
                    "score": "33333",
                },
                {
                    "name": "kim",
                    "rank": "9",
                    "score": "22222",
                },
                {
                    "name": "kimkim",
                    "rank": "10",
                    "score": "11111",
                }
            ]
        };
        var highScoreString = "High Scores\n\n";
        for(let score of self.highscores.scores) {
            highScoreString += score.rank + "    " + score.name + "    " + score.score + "\n";
        }
        self.highScoreText = game.make.text(game.width / 2, 100, highScoreString, style);
        self.gameOverText = game.add.text(game.width / 2, 100, "Game Over!\nName:______", style);
        self.nick = "";
        self.alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '-', '_', '^', '`', '[', ']', '{', '}', '\\', ' ']
        game.input.keyboard.onDownCallback = function(event) {
            if(alphabet.includes(event.key)) {
            }
        };
        self.cursorNumber = 0;
    },
    update: function() {
        console.log("game over");
    }
};

