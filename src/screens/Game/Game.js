import "./game.css";

import { Component } from "react";
//Components
import Modal from "../../components/funcComponents/Modal";
import PropTypes from "prop-types";
import Scoreboard from "../../components/funcComponents/Scoreboard";
import ScoreboardTransition from "./ScoreboardTransition";
import Select from "../../components/classComponents/Select";
import Transition from "../../components/classComponents/Transition";
import fakeAPI from "../../services/Game/scoreboard.api.fake";
import morracinese from "../../utils/morracinese";
import versus from "../../assets/img/versus.gif";

class Game extends Component {
    constructor(props) {
        super(props);

        this.moves = morracinese.getDefaultMoves();
        this.movesImgs = morracinese.getDefaultMovesImgs();
        this.isScoreboardUpdated = false;

        this.state = {
            yourMove: this.moves[0],
            enemyMove: this.moves[3],
            round: 0,
            result: "YOU WON",
            yourWins: 0,
            enemyWins: 0,
            isEnd: false,
            showScoreboard: true,
            scoreboard: this.props.scoreboard,
            scoreboardTransition: false,
            matchmakingTransitionOn: false,
            matchmakingTransitionClass: "",
        };
    }

    onExitMatchmakingTransition = () => {
        this.setState({
            showScoreboard: false,
        });
        setTimeout(() => {
            this.setState({
                matchmakingTransitionOn: false,
            });
        }, 5000);
    };

    onExitScoreboardTransition = () => {
        this.setState({
            showScoreboard: true,
        });
        setTimeout(() => {
            this.setState({
                scoreboardTransition: false,
            });
        }, 1000);
    };

    onClickNewMatch = () => {
        this.isScoreboardUpdated = false;
        this.setState({
            matchmakingTransitionOn: true,
        });
    };

    endMatch = () => {
        let timeOutState = {
            yourWins: 0,
            enemyWins: 0,
            round: 0,
            scoreboardTransition: true,
            isEnd: false,
            scoreboard: fakeAPI.getScoreboard(),
        };

        if (this.state.yourWins > 2 && this.isScoreboardUpdated === false) {
            timeOutState.scoreboard = fakeAPI.increasePlayerScore(
                this.props.playerName
            );
            this.isScoreboardUpdated = true;
        }

        setTimeout(() => {
            this.setState(timeOutState);
        }, 3000);
    };

    onClickChoose = (move) => {
        const enemyMove = morracinese.getRandomMove();
        const whoWon = morracinese.evaluateRound(move, enemyMove);

        let newState = {
            ...this.state,
            move,
            enemyMove,
            round: this.state.round + 1,
        };

        if (whoWon === "first") {
            newState.yourWins = this.state.yourWins + 1;
        } else if (whoWon === "second") {
            newState.enemyWins = this.state.enemyWins + 1;
        }

        if (newState.yourWins > 2) {
            newState = { ...newState, result: "YOU WON", isEnd: true };
        } else if (newState.enemyWins > 2) {
            newState = { ...newState, result: "KO", isEnd: true };
        }

        this.setState(newState);
    };

    render() {
        return (
            <div className="game">
                <div className="game-bg"></div>
                <Transition
                    defaultClass={"matchmaking-transition-screen"}
                    enterClass={"matchmaking-transition-screen--enter"}
                    exitClass={"matchmaking-transition-screen--exit"}
                    timeoutBeforeEnter={100}
                    timeoutBeforeExit={5000}
                    transitionOn={this.state.matchmakingTransitionOn}
                    onExit={this.onExitMatchmakingTransition}
                >
                    <div className="loader-dots">Looking for a player</div>
                </Transition>
                <ScoreboardTransition
                    transitionOn={this.state.scoreboardTransition}
                    onExit={this.onExitScoreboardTransition}
                />
                {/* Game content */}
                <div className="game__content">
                    <h1 className="title">
                        Rock Scissors Paper
                        <br />&<br /> Lizard Spock
                    </h1>
                    {this.state.showScoreboard && (
                        <Scoreboard
                            scores={this.state.scoreboard}
                            onClickNewMatch={this.onClickNewMatch}
                        />
                    )}
                    {this.state.showScoreboard === false && (
                        <div className="game__content__match">
                            <h2 className="round">Round: {this.state.round}</h2>

                            <div
                                className={
                                    "select-wrapped select-wrapped--enemy"
                                }
                            >
                                <Select
                                    disable={true}
                                    move={this.state.enemyMove}
                                    moves={this.moves}
                                    imgs={this.movesImgs}
                                />
                                <p className={"score"}>
                                    Wins: {this.state.enemyWins}
                                </p>
                            </div>
                            <img
                                src={versus}
                                alt="Versus"
                                width="200"
                                height="200"
                            />
                            <div
                                className={
                                    "select-wrapped select-wrapped--player"
                                }
                            >
                                <p className={"score"}>
                                    Wins: {this.state.yourWins}
                                </p>

                                <Select
                                    move={this.state.yourMove}
                                    moves={this.moves}
                                    imgs={this.movesImgs}
                                    onClickChoose={this.onClickChoose}
                                />
                            </div>
                        </div>
                    )}
                    {this.state.isEnd && (
                        <Modal className="game__modal-result">
                            {this.endMatch()}
                            <h1>{this.state.result}</h1>
                            <h1>{this.state.result}</h1>
                            <h1>{this.state.result}</h1>
                        </Modal>
                    )}
                </div>
            </div>
        );
    }
}

Game.propTypes = {
    playerName: PropTypes.string.isRequired,
};

export default Game;
