//first select the buttons and then do something when you click on them
const resetButton = document.querySelector('#reset');
const winningScoreSelect = document.querySelector('#playTo');
let winningScore = 5;
let isGameOver = false;

const max_fireworks = 5;
const max_sparks = 50;
let canvas = document.getElementById('myCanvas');
let context = canvas.getContext('2d');
let fireworks = [];







const p1 = {
    score: 0,
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display')
}

const p2 = {
    score: 0,
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display')
}






//first attempt/////////////////////////////////////////////
function pop() {

    for (let i = 0; i < max_fireworks; i++) {
        let firework = {
            sparks: []
        };
        for (let n = 0; n < max_sparks; n++) {
            let spark = {
                vx: Math.random() * 5 + .5,
                vy: Math.random() * 5 + .5,
                weight: Math.random() * .3 + .03,
                red: Math.floor(Math.random() * 2),
                green: Math.floor(Math.random() * 2),
                blue: Math.floor(Math.random() * 2)
            };
            if (Math.random() > .5) spark.vx = -spark.vx;
            if (Math.random() > .5) spark.vy = -spark.vy;
            firework.sparks.push(spark);
        }
        fireworks.push(firework);
        resetFirework(firework);
    }
    window.requestAnimationFrame(explode);

    function resetFirework(firework) {
        firework.x = Math.floor(Math.random() * canvas.width);
        firework.y = canvas.height;
        firework.age = 0;
        firework.phase = 'fly';
    }

    function explode() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        fireworks.forEach((firework, index) => {
            if (firework.phase == 'explode') {
                firework.sparks.forEach((spark) => {
                    for (let i = 0; i < 10; i++) {
                        let trailAge = firework.age + i;
                        let x = firework.x + spark.vx * trailAge;
                        let y = firework.y + spark.vy * trailAge + spark.weight * trailAge * spark.weight * trailAge;
                        let fade = i * 20 - firework.age * 2;
                        let r = Math.floor(spark.red * fade);
                        let g = Math.floor(spark.green * fade);
                        let b = Math.floor(spark.blue * fade);
                        context.beginPath();
                        context.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',1)';
                        context.rect(x, y, 4, 4);
                        context.fill();
                    }
                });
                firework.age++;
                if (firework.age > 100 && Math.random() < .05) {
                    resetFirework(firework);
                }
            } else {
                firework.y = firework.y - 10;
                for (let spark = 0; spark < 15; spark++) {
                    context.beginPath();
                    context.fillStyle = 'rgba(' + index * 50 + ',' + spark * 17 + ',0,1)';
                    context.rect(firework.x + Math.random() * spark - spark / 2, firework.y + spark * 4, 4, 4);
                    context.fill();
                }
                if (Math.random() < .001 || firework.y < 200) firework.phase = 'explode';
            }
        });
        window.requestAnimationFrame(explode);
    }

}







//first attempt/////////////////////////////////////////////////////////















//generic function
function updateScores(player, opponent) {
    if (!isGameOver) {
        player.score += 1;
        if (player.score === winningScore) {
            isGameOver = true;
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');
            player.button.disabled = true;
            opponent.button.disabled = true;



        }

        player.display.textContent = player.score;
    }
}

p1.button.addEventListener('click', function () {
    updateScores(p1, p2)// p1 is player & p2 is opponent

})
p2.button.addEventListener('click', function () {
    updateScores(p2, p1)//here p2 is player & p1 is opponent

})

winningScoreSelect.addEventListener('change', function () {
    winningScore = parseInt(this.value);

    reset();
})

resetButton.addEventListener('click', reset)

function reset() {

    isGameOver = false;

    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;





    }



}




//try adding in a win by 2 feature
//multiplayer
//fire works when someone wins
//allow players to enter their name
//best 2 out of 3