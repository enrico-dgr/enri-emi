import "./meepMeepModal.css";

import { Component } from "react";
import PropTypes from "prop-types";

class MeepMeepModal extends Component {
    constructor(props) {
        super(props);

        this.disable = true;

        this.state = {
            disableAsync: false,
        };
    }

    disableComp = () => {
        this.timeout = setTimeout(() => {
            this.setState({ disableAsync: true });
            this.disable = false;
        }, 2500);
    };

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    render() {
        if (this.disable === false && this.props.hide) {
            this.disable = true;
            this.disableComp();
        }

        return (
            this.state.disableAsync === false && (
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
