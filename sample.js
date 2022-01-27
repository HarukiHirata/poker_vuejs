new Vue({
    el: '#app',
    data: {
        cards: [],
        current_card: [],
        img_src1: "",
        img_src2: "",
        img_src3: "",
        img_src4: "",
        img_src5: "",
        isBorder1: false,
        isBorder2: false,
        isBorder3: false,
        isBorder4: false,
        isBorder5: false,
        gameStep: 1,
        result: "",
    },
    methods: {
        gameStart: function () {
            this.isBorder1 = false;
            this.isBorder2 = false;
            this.isBorder3 = false;
            this.isBorder4 = false;
            this.isBorder5 = false;
            this.cards = [];
            this.current_card = [];
            this.img_src1 = "";
            this.img_src2 = "";
            this.img_src3 = "";
            this.img_src4 = "";
            this.img_src5 = "";
            this.result = "";
            for (var i = 1; i < 14; i++) {
                var cardName = 'spade_' + String(i).padStart(2,"0");
                this.cards.push(cardName);
            }
            for (var j = 1; j < 14; j++) {
                var cardName = 'heart_' + String(j).padStart(2,"0");
                this.cards.push(cardName);
            }
            for (var k = 1; k < 14; k++) {
                var cardName = 'diamond_' + String(k).padStart(2,"0");
                this.cards.push(cardName);
            }
            for (var l = 1; l < 14; l++) {
                var cardName = 'club_' + String(l).padStart(2,"0");
                this.cards.push(cardName);
            }
            this.cards = _.shuffle(this.cards);
            this.current_card = this.cards.slice(0,5);
            this.img_src1 = "image/card_" + this.current_card[0] + ".png";
            this.img_src2 = "image/card_" + this.current_card[1] + ".png";
            this.img_src3 = "image/card_" + this.current_card[2] + ".png";
            this.img_src4 = "image/card_" + this.current_card[3] + ".png";
            this.img_src5 = "image/card_" + this.current_card[4] + ".png";
            this.cards.splice(0,5);
            this.gameStep = 2;
        },
        borderChange1: function () {
            this.isBorder1 = !this.isBorder1;
        },
        borderChange2: function () {
            this.isBorder2 = !this.isBorder2;
        },
        borderChange3: function () {
            this.isBorder3 = !this.isBorder3;
        },
        borderChange4: function () {
            this.isBorder4 = !this.isBorder4;
        },
        borderChange5: function () {
            this.isBorder5 = !this.isBorder5;
        },
        cardChange: function () {
            if (document.getElementById('card1').classList.contains('is-border')) {
                this.current_card[0] = this.cards[0];
                this.img_src1 = "image/card_" + this.current_card[0] + ".png";
                this.isBorder1 = !this.isBorder1;
            }
            if (document.getElementById('card2').classList.contains('is-border')) {
                this.current_card[1] = this.cards[1];
                this.img_src2 = "image/card_" + this.current_card[1] + ".png";
                this.isBorder2 = !this.isBorder2;
            }
            if (document.getElementById('card3').classList.contains('is-border')) {
                this.current_card[2] = this.cards[2];
                this.img_src3 = "image/card_" + this.current_card[2] + ".png";
                this.isBorder3 = !this.isBorder3;
            }
            if (document.getElementById('card4').classList.contains('is-border')) {
                this.current_card[3] = this.cards[3];
                this.img_src4 = "image/card_" + this.current_card[3] + ".png";
                this.isBorder4 = !this.isBorder4;
            }
            if (document.getElementById('card5').classList.contains('is-border')) {
                this.current_card[4] = this.cards[4];
                this.img_src5 = "image/card_" + this.current_card[4] + ".png";
                this.isBorder5 = !this.isBorder5;
            }
            this.gameStep = 3;
        },
        showResult: function () {
            this.isBorder1 = false;
            this.isBorder2 = false;
            this.isBorder3 = false;
            this.isBorder4 = false;
            this.isBorder5 = false;
            var markArray = [];
            var marks = ['spade', 'heart', 'diamond', 'club'];
            var numArray = [];
            var straight = [];
            var pair = 0;
            marks.forEach(function (element) {
                markArray[element] = [];
            });
            for (var i = 1; i < 14; i++) {
                var j = String(i).padStart(2,"0");
                numArray[j] = [];
            }
            this.current_card.forEach(function (element) {
                for (var k = 1; k < 14; k++) {
                    var number = String(k).padStart(2,"0");
                    var reg = new RegExp(('.+') + number + '$', "i");
                    if (element.match(reg)) {
                        numArray[number].push(element);
                    }
                }
                for (key in markArray) {
                    var rege = new RegExp('^' + key);
                    if (element.match(rege)) {
                        markArray[key].push(element);
                    }
                }
            });
            if (markArray['spade'].length == 5 || markArray['heart'].length == 5 || markArray['diamond'].length == 5 || markArray['club'].length == 5) {
                this.result = "Flush";
            }
            for (var l = 1; l < 14; l++) {
                var num = String(l).padStart(2,"0");
                if (numArray[num].length == 4) {
                    this.result = "four card";
                } else if (numArray[num].length == 3) {
                    this.result = "three card";
                } else if (numArray[num].length == 2) {
                    pair += 1;
                } else if (numArray[num].length == 1) {
                    straight.push(l);
                }
            }
            if (this.result == "Flush" && JSON.stringify(straight) == JSON.stringify([1, 10, 11, 12, 13])) {
                this.result = "Royal straight flush";
            } else if (this.result != "Flush" && JSON.stringify(straight) == JSON.stringify([1, 10, 11, 12, 13])) {
                this.result = "Straight";
            }
            if (this.result == "three card" && pair == 1) {
                this.result = "Full house";
            }
            var aryMax = Math.max(...straight);
            var aryMin = Math.min(...straight);
            var diff = aryMax - aryMin;
            if (this.result == "" && pair != 0) {
                this.result = String(pair) + " pair";
            } else if (this.result == "Flush" && pair == 0 && diff == 4) {
                this.result = 'Straight Flush';
            } else if (this.result == "" && pair == 0 && diff == 4) {
                this.result = "Straight";
            } else if (this.result == "" && pair == 0 && diff != 4) {
                this.result = "No pair";
            }
            this.gameStep = 4;
        },
    },
})