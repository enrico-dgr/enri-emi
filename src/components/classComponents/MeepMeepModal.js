import "./meepMeepModal.css";

import { Component } from "react";
import PropTypes from "prop-types";

class MeepMeepModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOut: false,
        };
    }

    render() {
        return (
            <div
                className={`meep-meep-modal__container ${
                    this.state.isOut ? "out" : ""
                }`}
            >
                <div className={"meep-meep-modal__background "}>
                    <div className={"meep-meep-modal "}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

MeepMeepModal.propTypes = {
    isOut: false,
};

MeepMeepModal.propTypes = {
    children: PropTypes.node,
    isOut: PropTypes.bool,
};

export default MeepMeepModal;
