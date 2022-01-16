import lizard from "../assets/img/choiches/lizard.png";
import paper from "../assets/img/choiches/paper.png";
import rock from "../assets/img/choiches/rock.png";
import scissors from "../assets/img/choiches/scissors.png";
import spock from "../assets/img/choiches/spock.png";

const MOVES = ["scissors", "paper", "rock", "lizard", "spock"];
const MOVES_IMGS = [scissors, paper, rock, lizard, spock];

const getDefaultMoves = () => MOVES;

const getDefaultMovesImgs = () => MOVES_IMGS;

const getRandomMove = () => {
    let cpu = Math.round(Math.random() * 4);
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
    getDefaultMovesImgs,
    getRandomMove,
    evaluateRound,
};

export default morracinese;
