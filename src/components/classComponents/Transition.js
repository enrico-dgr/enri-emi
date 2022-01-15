import { Component } from "react";
import PropTypes from "prop-types";

class Transition extends Component {
    constructor(props) {
        super(props);

        this.started = false;

        this.state = {
            classVariation: "",
        };
    }

    transitionExit = () => {
        setTimeout(() => {
            this.setState({
                classVariation: this.props.exitClass,
            });
            this.props.onExit();
        }, this.props.timeoutBeforeExit);
    };

    transitionStart = () => {
        setTimeout(() => {
            this.setState({
                classVariation: this.props.enterClass,
            });

            if (this.props.exitClass !== "") {
                this.transitionExit();
            }
        }, this.props.timeoutBeforeEnter);
    };

    render() {
        if (this.props.transitionOn && this.started === false) {
            this.started = true;
            this.transitionStart();
        } else if (this.props.transitionOn === false) {
            this.started = false;
        }

        return (
            this.props.transitionOn && (
                <div
                    className={`${this.props.defaultClass} ${this.state.classVariation}`}
                >
                    {this.props.children}
                </div>
            )
        );
    }
}

Transition.defaultProps = {
    defaultClass: "",
    enterClass: "",
    exitClass: "",
    onExit: () => undefined,
    timeoutBeforeEnter: 0,
    timeoutBeforeExit: 0,
    transitionOn: false,
};

Transition.propTypes = {
    children: PropTypes.node,
    defaultClass: PropTypes.string,
    enterClass: PropTypes.string,
    exitClass: PropTypes.string,
    onExit: PropTypes.func,
    timeoutBeforeEnter: PropTypes.number,
    timeoutBeforeExit: PropTypes.number,
    transitionOn: PropTypes.bool,
};

export default Transition;
