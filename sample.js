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
    },
    methods: {
        drawCard: function () {
            this.cards = [];
            this.current_card = [];
            this.img_src1 = "";
            this.img_src2 = "";
            this.img_src3 = "";
            this.img_src4 = "";
            this.img_src5 = "";
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
            var card1 = document.getElementById('card1');
            var card2 = document.getElementById('card2');
            var card3 = document.getElementById('card3');
            var card4 = document.getElementById('card4');
            var card5 = document.getElementById('card5');
            this.gameStep = 3;
        },
        showResult: function () {
            this.gameStep = 1;
            this.cards = [];
            this.current_card = [];
            this.img_src1 = "";
            this.img_src2 = "";
            this.img_src3 = "";
            this.img_src4 = "";
            this.img_src5 = "";
        },
    },
})