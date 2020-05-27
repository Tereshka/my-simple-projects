new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        steps: []
    },
    methods: {
        startGame(){
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.steps = [];
        },
        attack(){
            var damage = this.calculateDamage(3, 10)
            this.monsterHealth -= damage;
            this.steps.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage
            });
            if(this.checkWin()){ return; }
            this.monsterAttack();
        },
        specialAttack(){
            var damage = this.calculateDamage(10, 20)
            this.monsterHealth -= damage;
            this.steps.unshift({
                isPlayer: true,
                text: 'Player hits Monster hard for ' + damage
            });
            if(this.checkWin()){ return; }
            this.monsterAttack();
        },
        heal(){
            if (this.playerHealth >= 100) {
                this.playerHealth = 100;
            } else {
                var heal = this.calculateDamage(3, 10);
                this.playerHealth += heal;
                this.steps.unshift({
                    isPlayer: true,
                    text: 'Player heals for ' + heal
                });
            }
            
            this.monsterAttack();
        },
        giveUp(){
            this.gameIsRunning = false;
        },
        calculateDamage(min, max){
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        checkWin(){
            if (this.monsterHealth <=0) {
                if (confirm('You won! Start a new game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <=0) {
                if (confirm('You lost(( Start a new game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        },
        monsterAttack(){
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.steps.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + damage
            });
            this.checkWin();
        }
    }
});