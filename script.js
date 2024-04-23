function end_game(score){
    document.getElementById("overlay").style.visibility = "visible"
    document.getElementById("popup").style.visibility = "visible"
    document.getElementById("score_result").innerText = "Your score: "+score;
}

function game(init_val){
    document.getElementById("overlay").style.visibility = "hidden"
    document.getElementById("popup").style.visibility = "hidden"

    var lives = 3;
    var livesValue = document.querySelector('.lives')
    document.getElementById("life1").src="full_heart.png"
    document.getElementById("life2").src="full_heart.png"
    document.getElementById("life3").src="full_heart.png"

    var score = init_val;
    var scoreValue = document.querySelector('.score');

    var board = document.querySelector('.board');

    var timer = setInterval(function () {
        var zombie = document.createElement('div');
        zombie.classList.add('zombie');
        

        //Scale
        var scale = 0.8 + Math.random() * 0.5;
        zombie.style.transform = "scale("+scale+")";


        var min = 5;
        var max = 18;
        var bottomPos = Math.floor(Math.random()*(max-min)+min);
    
        zombie.style.bottom = bottomPos + '%';

        zombie.style.zIndex = 19-bottomPos;

        //movement speed
        var min = 10;
        var max = 20;
        var walkSpeed = Math.floor(Math.random()*(max-min+1)+min);
        var anim = "0.5s,"+walkSpeed+"s"
        zombie.style.animationDuration = anim;

        board.appendChild(zombie);

        zombie.addEventListener('animationend', function(e) {
            if(e.animationName === "zombieWalk") {
                score -= 10;
                this.remove();
                document.getElementById("life"+(lives)).src="empty_heart.png"
                lives--;
                if(lives == 0){
                    clearInterval(timer)
                    var zombies = document.querySelectorAll('.zombie');

                    zombies.forEach(zombie => {
                        zombie.remove();
                    });
                }
            }
            scoreValue.innerText = score;
            if(lives == 0) end_game(score);
        });

    }, 500);


    board.addEventListener('click', function(e) {
        if(score>=0){
            if (e.target.classList.contains ('zombie')) {
                score += 10;
                e.target.remove();
                scoreValue.innerText = score;
            }
            else{
                score -= 3
                scoreValue.innerText = score
            }
        }
    });

}

document.addEventListener('DOMContentLoaded', game(0));