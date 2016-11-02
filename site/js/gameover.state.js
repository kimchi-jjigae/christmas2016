'use strict';

// probably split this up into a couple of states, game over and high score

var GameOverState = function() {};

GameOverState.prototype = {
    create: function() {
        // hack to avoid the browser from going back upon pressing backspace, I hope this works on the browsers I want it to work lol (stolen from somewhere on SO)
        window.addEventListener('keydown',function(e){if(e.keyIdentifier=='U+0008'||e.keyIdentifier=='Backspace'||e.keyCode==8){if(e.target==document.body){e.preventDefault();return false;}}},true);
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
                    "name": "xX_1337_Xx",
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
        self.enterNick = true;
        self.highScoreText = game.make.text(game.width / 2, 100, highScoreString, style);
        self.nick = "______";
        self.gameOverText = game.add.text(game.width / 2, 100, "Game Over!\nYour high score: " + self.score + "\nName: " + self.nick, style);
        self.alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Å', 'Ä', 'Ö', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'å', 'ä', 'ö', '-', '_', '^', '`', '[', ']', '{', '}', '\\', ' ']
        game.input.keyboard.onDownCallback = function(event) {
            if(self.enterNick) {
                if(self.alphabet.includes(event.key)) {
                    self.nick = self.replaceChar(self.nick, self.cursorNumber, event.key);
                    if(self.cursorNumber < self.nick.length - 1) {
                        self.cursorNumber++;
                    }
                }
                else if(event.key == 'Backspace') {
                    self.nick = self.replaceChar(self.nick, self.cursorNumber, '_');
                    if(self.cursorNumber > 0) {
                        self.cursorNumber--;
                    }
                }
                else if(event.key == 'Enter') {
                    self.gameOverText.visible = false;
                    game.add.existing(self.highScoreText);
                    self.enterNick = false;
                }
                self.gameOverText.text = "Game Over!\nYour high score: " + self.score + "\nName: " + self.nick;
            }
            else {
                if(event.key == 'r' || event.key == ' ' || event.key == 'Enter') {
                    game.state.start("MenuState");
                }
            }
        };
        game.input.keyboard.onUpCallback = function(event) {
            // this needs to be here to override the gameplay state's callback
        }
        self.flash = true;
        self.cursorNumber = 0;
        self.flashChar = '_';
        self.flashFrequency = 400; // ms
        self.lastTime = Date.now();
    },
    update: function() {
        if(self.enterNick) {
            if(Date.now() - self.lastTime > self.flashFrequency) {
                if(self.flash) {
                    self.flashChar = self.nick.charAt(self.cursorNumber);
                    self.nick = self.replaceChar(self.nick, self.cursorNumber, ' ');
                }
                else {
                    self.nick = self.replaceChar(self.nick, self.cursorNumber, self.flashChar);
                }
                self.gameOverText.text = "Game Over!\nYour high score: " + self.score + "\nName: " + self.nick;
                self.flash = !self.flash;
                self.lastTime = Date.now();
            }
        }
        else {
        }
    },
    replaceChar: function(string, index, letter) {
        string = string.split('');
        string[index] = letter;
        string = string.join('');
        return string;
    }
};

