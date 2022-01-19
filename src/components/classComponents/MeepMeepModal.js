import "./meepMeepModal.css";

import { Component } from "react";
import PropTypes from "prop-types";

/**
 * This is a modal component.
 * This class provides the disabling of rendering without need
 * of any external factor. Time before disabling rendering is `4500 ms`,
 * to concede the animation to complete.
 * But if its rendering is requested again before time is up,
 * the component will remain active and cancel his `timeout`.
 */
class MeepMeepModal extends Component {
    constructor(props) {
        super(props);

        this.disable = false;

        this.state = {
            disableAsync: true,
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (
            nextProps.hide === this.props.hide &&
            nextState.disableAsync === this.state.disableAsync
        ) {
            return false;
        }

        return true;
    }

    componentDidUpdate() {
        if (this.disable === false && this.props.hide) {
            this.disable = true;
            this.disableComp();
        } else if (this.disable && this.props.hide === false) {
            // Component is requested but last timeout of `this.disableComp`
            // is not finished yet.
            // This prevent the new animation/modal to disappear halfway.
            if (this.state.disableAsync === false) {
                clearTimeout(this.timeout);
            } else {
                this.showComp();
            }
            this.disable = false;
        }
    }

    showComp = () => {
        this.setState({ disableAsync: false });
    };

    disableComp = () => {
        // reset of component
        this.timeout = setTimeout(() => {
            this.setState({ disableAsync: true });
        }, 4500);
    };

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    render() {
        return (
            (this.state.disableAsync === false ||
                this.props.hide === false) && (
                <div
                    className={`meep-meep-modal__container ${
                        this.props.hide ? "out" : ""
                    }`}
                >
                    <div
                        className={`meep-meep-modal__background ${
                            this.props.hide ? "out" : ""
                        }`}
                    >
                        <div
                            className={`meep-meep-modal ${
                                this.props.hide ? "out" : ""
                            }`}
                        >
                            {this.props.children}
                        </div>
                    </div>
                </div>
            )
        );
    }
}

MeepMeepModal.propTypes = {
    hide: true,
};

MeepMeepModal.propTypes = {
    children: PropTypes.node,
    hide: PropTypes.bool,
};

export default MeepMeepModal;
