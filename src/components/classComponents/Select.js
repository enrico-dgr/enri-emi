import "./select.css";

import { Component } from "react";
//Components
import Modal from "../funcComponents/Modal.js";
import PropTypes from "prop-types";

class Select extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalOn: false,
        };
    }

    onClickShowModal = () => {
        let newState = {};

        if (this.props.disable === false) {
            newState.modalOn = true;
        }
        this.setState(newState);
    };

    onClickChoose = (move) => () => {
        this.setState({
            modalOn: false,
        });

        this.props.onClickChoose(move);
    };

    render() {
        return (
            <div>
                <div
                    className={"select__button"}
                    onClick={this.onClickShowModal}
                >
                    <p>{this.props.move}</p>
                </div>
                {this.state.modalOn && (
                    <Modal
                        style={{
                            height: "35vh",
                            overflowY: "scroll",
                            border: "1px solid black",
                        }}
                    >
                        {this.props.moves.map(this.Button)}
                    </Modal>
                )}
            </div>
        );
    }

    Button = (move, i) => {
        return (
            <div
                key={i + move}
                className={`select__modal__button`}
                onClick={this.onClickChoose(move)}
            >
                <p>{move}</p>
            </div>
        );
    };
}

Select.defaultProps = {
    disable: false,
    move: "",
    moves: [],
    onClickChoose: () => undefined,
};
Select.propTypes = {
    disable: PropTypes.bool,
    move: PropTypes.string,
    moves: PropTypes.array,
    onClickChoose: PropTypes.func,
};

export default Select;
