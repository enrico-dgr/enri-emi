import PropTypes from "prop-types";
import TransitionClass from "../../classComponents/Transition";

const ScoreboardTransition = (props) => {
    return (
        <TransitionClass
            defaultClass={"game-transition-screen"}
            enterClass={"game-transition-screen--enter"}
            exitClass={"game-transition-screen--exit"}
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
