import './game.css';

import { Component } from 'react/cjs/react.production.min';
//Components

class Game extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isRegistered: false
        }
    }

    render() {
        return (
            <div className="game">
                <div
                    className="game-bg">
                </div>
            </div>
        );
    }
}

export default Game;