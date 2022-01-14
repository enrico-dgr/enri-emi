import "./scoreboard.css";

import PlayerComp from "./Player";
import PropTypes from "prop-types";

const Player = (p, index) => (
    <PlayerComp playerName={p.playerName} score={p.victories} index={index} />
);

const sort = (p1, p2) => p2.victories - p1.victories;

const Scoreboard = (props) => {
    return (
        <div className={"scoreboard"}>
            {props.scores.sort(sort).map(Player)}
        </div>
    );
};

Scoreboard.defaultProps = {};

Scoreboard.propTypes = {
    scores: PropTypes.array.isRequired,
};

export default Scoreboard;
