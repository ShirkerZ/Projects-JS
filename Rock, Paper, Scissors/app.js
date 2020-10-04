const play = document.querySelector('.play');

play.addEventListener('click', () => {
    const intro = document.querySelector('.intro');
    const game = document.querySelector('.game-container');
    const battle = document.querySelector('.battle');
    const playerSide = document.querySelector('.player-side');
    const computerSide = document.querySelector('.computer-side');
    const options = document.querySelectorAll('.options');
    let pScore = 0;
    let cScore = 0;


    intro.classList.add('fade-out');
    game.classList.remove('fade-out');
    /*
    battle.classList.remove('fade-out');

    playerSide.forEach(playerTarget => {
        playerTarget.addEventListener('click', function(e) {
            console.log(e.target.dataset.option)
        })
    })*/

    options.forEach(option => {
        //Player choice
        option.addEventListener('click', function(e) {

            const playerChoice = e.target.dataset.option;

            //Computer choice
            const computerOptions = ['rock', 'paper', 'scissors'];
            const computerChoice = computerOptions[Math.floor(Math.random() * computerOptions.length)];

            //Procede to battle
            procedeBattle(playerChoice, computerChoice);

            //Game
            gameStart(playerChoice, computerChoice);
        })
    });
    //Procede to Battle
    const procedeBattle = (playerChoice, computerChoice) => {

        const playAgain = document.querySelector('.play-again');

        playAgain.addEventListener('click', () => {
            game.classList.remove('fade-out');
            battle.classList.add('fade-out');
            playerSide.removeChild(selectedPlayerOption);
            computerSide.removeChild(selectedComputerOption);
        })

        game.classList.add('fade-out');
        battle.classList.remove('fade-out');

        //Select player choice
        selectedPlayerOption = document.querySelector(`[data-option=${playerChoice}]`).parentNode.parentNode.cloneNode(true);
        playerSide.appendChild(selectedPlayerOption);

        console.log(document.body);
        console.log(`Test: ${selectedPlayerOption}`);


        //Select computer choice
        selectedComputerOption = document.querySelector(`[data-option=${computerChoice}]`).parentNode.parentNode.cloneNode(true);
        computerSide.appendChild(selectedComputerOption);

        console.log(`Creazione scelta Computer ${document.body}`);
    }

    //Score Update
    const scoreUpdate = () => {
        const playerScore = document.querySelector('.player-score');
        const computerScore = document.querySelector('.computer-score');
        computerScore.textContent = cScore;
        playerScore.textContent = pScore;
        return
    }

    //Winner check
    const gameStart = (playerChoice, computerChoice) => {
        const winner = document.querySelector('.winner')

        if (playerChoice === computerChoice) {
            winner.textContent = 'Draw';
            return;
        };

        if (playerChoice === 'paper') {
            if (computerChoice === 'scissors') {
                winner.textContent = 'Computer Win!';
                cScore++;
                scoreUpdate();
                return;
            } else {
                winner.textContent = 'Palyer Win!';
                pScore++;
                scoreUpdate();
                return;
            }
        };

        if (playerChoice === 'rock') {
            if (computerChoice === 'paper') {
                winner.textContent = 'Computer Win!';
                cScore++;
                scoreUpdate();
                return;
            } else {
                winner.textContent = 'Palyer Win!';
                pScore++;
                scoreUpdate();
                return;
            }
        };

        if (playerChoice === 'scissors') {
            if (computerChoice === 'rock') {
                winner.textContent = 'Computer Win!';
                cScore++;
                scoreUpdate();
                return;
            } else {
                winner.textContent = 'Palyer Win!';
                pScore++;
                scoreUpdate();
                return;
            }
        };
    }

})