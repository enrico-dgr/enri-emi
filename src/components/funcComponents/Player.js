import PropTypes from "prop-types";
import React from "react";

const Player = (props) => {
    return (
        <div className="player" key={props.playerName + props.index}>
            <p>{props.index}</p>
            <span className="player-name">{this.props.playerName}</span>

            <p>{props.score}</p>
        </div>
    );
};

Player.propTypes = {
    playerName: PropTypes.string.isRequired,

    score: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
};

export default Player;
