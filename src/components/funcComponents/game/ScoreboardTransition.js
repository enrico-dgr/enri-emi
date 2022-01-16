import "./scoreboardTransition.css";

import PropTypes from "prop-types";
import TransitionClass from "../../classComponents/Transition";

const ScoreboardTransition = (props) => {
    return (
        <TransitionClass
            defaultClass={"scoreboard-transition-screen"}
            enterClass={"scoreboard-transition-screen--enter"}
            exitClass={"scoreboard-transition-screen--exit"}
            timeoutBeforeEnter={100}
            timeoutBeforeExit={2000}
            transitionOn={props.transitionOn}
            onExit={props.onExit}
        />
    );
};

ScoreboardTransition.defaultProps = {
    onExit: () => undefined,
    transitionOn: false,
};

ScoreboardTransition.propTypes = {
    onExit: PropTypes.func,
    transitionOn: PropTypes.bool,
};

export default ScoreboardTransition;
