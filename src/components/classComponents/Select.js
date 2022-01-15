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

    getImage = () => {
        return this.props.imgs[
            this.props.moves.findIndex((move) => move === this.props.move)
        ];
    };

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
                    <div className={"select-button-content"}>
                        <img
                            src={this.getImage()}
                            alt={this.props.move}
                            height="100%"
                            width="90%"
                        />
                        <h3 className={"choiche"}>{this.props.move}</h3>
                    </div>
                </div>
                {
                    this.state.modalOn && (
                        <Modal className={"select-modal"}>
                            {this.props.moves.map(this.Button)}
                        </Modal>
                    )
                }
            </div >
        );
    }

    Button = (move, i) => {
        return (
            <div
                key={i + move}
                className={`select__modal__button`}
                onClick={this.onClickChoose(move)}
            >
                <img
                    src={this.props.imgs[i]}
                    alt={move}
                    width="90%"
                    height="100%"
                />
                <h3 className={"choiche"}>{move}</h3>
            </div>
        );
    };
}

Select.defaultProps = {
    disable: false,
    imgs: [],
    move: "",
    moves: [],
    onClickChoose: () => undefined,
};
Select.propTypes = {
    disable: PropTypes.bool,
    imgs: PropTypes.array,
    move: PropTypes.string,
    moves: PropTypes.array,
    onClickChoose: PropTypes.func,
};

export default Select;
