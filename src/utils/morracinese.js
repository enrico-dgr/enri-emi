const ATTEMPTS = 3;
const MOVES = ["scissors", "paper", "rock", "lizard", "spock"];
let player;
let cpu;
let pointPlayer = 0;
let pointCpu = 0;

function choicePlayer() {
    player = prompt("Inserisci carta, forbici o sasso");
    player = player.toLowerCase();
    if (player === "carta" || player === "forbici" || player === "sasso") {
        return console.log("PLAYER:", player);
    }
    alert("Devi inserire una scelta valida!");
    choicePlayer();
}

function game() {
    for (let i = 0; i < ATTEMPTS; i++) {
        choicePlayer();
        cpu = Math.floor(Math.random() * 4);
        console.log("CPU:", MOVES[cpu]);

        if (MOVES[cpu] === player) {
            console.log("Pari");
        } else if (
            (player === "rock" && MOVES[cpu] === "scissors") ||
            (player === "rock" && MOVES[cpu] === "lizard") ||
            (player === "scissors" && MOVES[cpu] === "paper") ||
            (player === "scissors" && MOVES[cpu] === "lizard") ||
            (player === "paper" && MOVES[cpu] === "spock") ||
            (player === "paper" && MOVES[cpu] === "rock") ||
            (player === "lizard" && MOVES[cpu] === "paper") ||
            (player === "lizard" && MOVES[cpu] === "spock") ||
            (player === "spock" && MOVES[cpu] === "rock") ||
            (player === "spock" && MOVES[cpu] === "scissors")
        ) {
            console.log("PLAYER VINCE");
            pointPlayer++;
        } else {
            console.log("CPU VINCE");
            pointCpu++;
        }
    }

    winner();
    pointCpu = 0;
    pointPlayer = 0;
}

function winner() {
    console.log("I tuoi punti:", pointPlayer);
    console.log("I punti della cpu:", pointCpu);
    if (pointPlayer > pointCpu) {
        console.log("PLAYER VINCE LA PARTITA!");
    } else if (pointPlayer < pointCpu) {
        console.log("CPU VINCE LA PARTITA!");
    } else {
        spareggio();
    }
}

function spareggio() {
    console.log("Pareggio, giochiamo ancora");
    choicePlayer();
    cpu = Math.floor(Math.random() * 3);
    if (cpu === 0) {
        cpu = "forbici";
    } else if (cpu === 1) {
        cpu = "sasso";
    } else {
        cpu = "carta";
    }
    console.log("CPU:", cpu);

    if (cpu === player) {
        console.log("Parità");
    } else if (
        (player === "sasso" && cpu === "forbici") ||
        (player === "forbici" && cpu === "carta") ||
        (player === "carta" && cpu === "sasso")
    ) {
        console.log("PLAYER VINCE");
        pointPlayer++;
    } else {
        console.log("CPU VINCE");
        pointCpu++;
    }

    winner();
}

const getDefaultMoves = () => MOVES;

const getRandomMove = () => {
    cpu = Math.floor(Math.random() * 4);
    return MOVES[cpu];
};

const evaluateRound = (firstMove, secondMove) => {
    if (firstMove === secondMove) {
        return "draw";
    } else if (
        (firstMove === "rock" && secondMove === "scissors") ||
        (firstMove === "rock" && secondMove === "lizard") ||
        (firstMove === "scissors" && secondMove === "paper") ||
        (firstMove === "scissors" && secondMove === "lizard") ||
        (firstMove === "paper" && secondMove === "spock") ||
        (firstMove === "paper" && secondMove === "rock") ||
        (firstMove === "lizard" && secondMove === "paper") ||
        (firstMove === "lizard" && secondMove === "spock") ||
        (firstMove === "spock" && secondMove === "rock") ||
        (firstMove === "spock" && secondMove === "scissors")
    ) {
        return "first";
    } else {
        return "second";
    }
};

const morracinese = {
    getDefaultMoves,
    getRandomMove,
    evaluateRound,
};

export default morracinese;
