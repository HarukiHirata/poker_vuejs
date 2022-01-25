new Vue({
    el: '#app',
    data: {
        cards: [],
        current_card: "",
        img_src: "",
    },
    methods: {
        gameStart: function () {
            this.cards = [];
            this.current_card = [];
            this.img_src = [];
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
        },
        drawCard: function () {
            this.cards = _.shuffle(this.cards);
            this.current_card = this.cards[0];
            this.img_src = 'image/card_' + this.current_card + '.png';
            this.cards.splice(0,1);
        }
    },
})