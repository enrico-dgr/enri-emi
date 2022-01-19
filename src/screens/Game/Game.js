import "./game.css";

import { Component } from "react";
//Components
import MeepMeepModal from "../../components/classComponents/MeepMeepModal";
import Modal from "../../components/funcComponents/Modal";
import PropTypes from "prop-types";
import Scoreboard from "../../components/funcComponents/Scoreboard";
import ScoreboardTransition from "../../components/funcComponents/game/ScoreboardTransition";
import Select3D from "../../components/classComponents/game/Select3D";
import Transition from "../../components/classComponents/Transition";
import fakeAPI from "../../services/game/scoreboard.api.fake";
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
            enemyMove: "",
            round: 0,
            roundMessage: "",
            result: "YOU WON",
            yourWins: 0,
            enemyWins: 0,
            isEnd: false,
            disableChoose: false,
            showRoundModal: false,
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

    // take client player's move
    onSetMove = (yourMove) => {
        let newState = {
            disableChoose: true,
            yourMove,
            enemyMove: morracinese.getRandomMove(),
        };

        this.setState(newState);
    };

    onSetEnemyMove = () => {
        const whoWon = morracinese.evaluateRound(
            this.state.yourMove,
            this.state.enemyMove
        );

        let newState = {
            round: this.state.round + 1,
            showRoundModal: true,
        };

        if (whoWon === "first") {
            newState.yourWins = this.state.yourWins + 1;
            newState.roundMessage = `
            ${this.state.yourMove.toUpperCase()}
                beats
            ${this.state.enemyMove.toUpperCase()}.
            You win this round.
        `;
        } else if (whoWon === "second") {
            newState.enemyWins = this.state.enemyWins + 1;
            newState.roundMessage = `
            ${this.state.yourMove.toUpperCase()}
                loses with
            ${this.state.enemyMove.toUpperCase()}.
            You lose this round.
        `;
        } else {
            newState.roundMessage = "DRAW";
        }

        // check end-match
        if (newState.yourWins > 2) {
            newState = {
                ...newState,
                result: "YOU WON!",
                isEnd: true,
                showRoundModal: false,
            };
        } else if (newState.enemyWins > 2) {
            newState = {
                ...newState,
                result: "YOU LOSE!",
                isEnd: true,
                showRoundModal: false,
            };
        }
        newState.enemyMove = "";
        this.setState(newState);
    };

    closeRoundModal = () => {
        // reset end round modal
        let timeoutState = {
            disableChoose: false,
        };
        if (this.state.showRoundModal) {
            timeoutState.showRoundModal = false;
        }
        this.setState(timeoutState);
    };

    // reset everything you need to reset
    endMatch = () => {
        let timeOutState = {
            yourWins: 0,
            enemyWins: 0,
            round: 0,
            disableChoose: false,
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
        }, 5000);
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
                            onClickLogout={this.props.onClickLogout}
                            playerName={this.props.playerName}
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
                                <p className="player-name">Computer</p>
                                <Select3D
                                    isEnemy
                                    enemyMove={this.state.enemyMove}
                                    onSetMove={this.onSetEnemyMove}
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
                                style={{ pointerEvents: "none" }}
                            />
                            <div
                                className={
                                    "select-wrapped select-wrapped--player"
                                }
                            >
                                <p className={"score"}>
                                    Wins: {this.state.yourWins}
                                </p>

                                <Select3D
                                    disableChoose={this.state.disableChoose}
                                    onSetMove={this.onSetMove}
                                />
                                <p className="player-name">
                                    {this.props.playerName}
                                </p>
                            </div>
                        </div>
                    )}

                    <MeepMeepModal hide={!this.state.showRoundModal}>
                        <p>{this.state.roundMessage}</p>
                        <button onClick={this.closeRoundModal}>OK</button>
                    </MeepMeepModal>
                    {this.state.isEnd && (
                        <Modal className={"game__modal-result"}>
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
    onClickLogout: PropTypes.func.isRequired,
};

export default Game;
