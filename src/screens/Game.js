import "./game.css";

import { Component } from "react";
//Components
import Modal from "../components/funcComponents/Modal";
import PropTypes from "prop-types";
import Scoreboard from "../components/funcComponents/Scoreboard";
import Select from "../components/classComponents/Select.js";
import morracinese from "../utils/morracinese";
import versus from "../assets/img/versus.gif";

class Game extends Component {
    constructor(props) {
        super(props);

        this.moves = morracinese.getDefaultMoves();

        this.state = {
            move: this.moves[0],
            enemyMove: this.moves[3],
            round: 0,
            result: "",
            yourWins: 0,
            enemyWins: 0,
            isEnd: false,
            showScoreboard: false,
            scoreboard: [],
        };
    }

    updateScoreboard = () => {
        let scoreboard = JSON.parse(localStorage.getItem("scoreboard"));

        const updatePlayer = (p) => {
            if (p.playerName === this.props.playerName) {
                return {
                    ...p,
                    victories: p.victories + 1,
                };
            }
            return p;
        };

        scoreboard = scoreboard.map(updatePlayer);

        localStorage.setItem("scoreboard", JSON.stringify(scoreboard));
        this.setState({ scoreboard: [...scoreboard] });
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
            newState = { ...newState, result: "YOU WIN", isEnd: true };
            this.updateScoreboard();
        } else if (newState.enemyWins > 2) {
            newState = { ...newState, result: "ENEMY WINS", isEnd: true };
        }
        let timeOutState = {};
        if (newState.isEnd) {
            timeOutState.showScoreboard = true;
            timeOutState.isEnd = false;
        }
        setTimeout(() => {
            this.setState(timeOutState);
        }, 3000);
        this.setState(newState);
    };

    render() {
        return (
            <div className="game">
                <div className="game-bg"></div>
                <div className="game__content">
                    <h1 className="title">
                        Rock Scissors Paper
                        <br />&<br /> Lizard Spock
                    </h1>
                    {this.state.showScoreboard === false && (
                        <div className="game__content__match">
                            <h2>Round: {this.state.round}</h2>

                            <div
                                className={
                                    "select-wrapped select-wrapped--enemy"
                                }
                            >
                                <Select
                                    disable={true}
                                    move={this.state.enemyMove}
                                />
                                <p className={"score"}>
                                    Wins:{this.state.enemyWins}
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
                                    Wins:{this.state.yourWins}
                                </p>

                                <Select
                                    move={this.state.move}
                                    moves={this.moves}
                                    onClickChoose={this.onClickChoose}
                                />
                            </div>
                        </div>
                    )}

                    {this.state.isEnd && (
                        <Modal>
                            <h1>{this.state.result}</h1>
                        </Modal>
                    )}
                    {this.state.showScoreboard && (
                        <Scoreboard scores={this.state.scoreboard} />
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
