import "./select3D.css";

import { Component } from "react";
import MeepMeepModal from "../MeepMeepModal";
import PropTypes from "prop-types";
//Components
import morracinese from "../../../utils/morracinese";

class Select3D extends Component {
    constructor(props) {
        super(props);

        this.moves = morracinese.getDefaultMoves();
        this.imgs = morracinese.getDefaultMovesImgs();
        this.timeoutUpdateOrientation = {};

        this.previouseTouchX = 0;

        this.state = {
            move: "",
            confirmationModal: false,
            movementX: 0,
            mouseDown: false,
        };
    }

    onMouseUp = () => {
        this.previouseTouchX = 0;

        this.setState({
            mouseDown: false,
        });
    };

    componentDidMount() {
        window.addEventListener("mouseup", this.onMouseUp);
    }

    onMouseDown = () => {
        this.setState({
            mouseDown: true,
        });
    };

    onMouseMove = async (e) => {
        let newState = {};

        if (this.state.mouseDown) {
            newState = {
                movementX: e.movementX + this.state.movementX,
            };
        }

        this.setState(newState);
    };

    onTouchStart = (e) => {
        this.previouseTouchX = e.touches[0].pageX;
    };

    onTouchMove = async (e) => {
        let newState = {};

        newState = {
            movementX:
                e.touches[0].pageX -
                this.previouseTouchX +
                this.state.movementX,
        };

        this.previouseTouchX = e.touches[0].pageX;

        this.setState(newState);
    };

    openModal = () => {
        this.setState({ confirmationModal: true });
    };

    onClickMove = (move) => () => {
        this.setState({ move });
        this.openModal();
    };

    closeModal = () => {
        this.setState({ confirmationModal: false });
    };

    onClickConfirmMove = () => {
        this.props.onClick(this.state.move);
        this.closeModal();
    };

    onClickDiscardMove = () => {
        this.closeModal();
    };

    componentWillUnmount() {
        window.removeEventListener("mouseup", this.onMouseUp);
    }

    render() {
        return (
            <div
                className="select-3d__container"
                onMouseDown={this.onMouseDown}
                onTouchStart={this.onTouchStart}
                onMouseMove={this.onMouseMove}
                onTouchMove={this.onTouchMove}
            >
                <div className="select-3d">
                    <div
                        className="select-3d__inner"
                        style={{
                            transform: `rotateY(${this.state.movementX}deg)`,
                        }}
                    >
                        {this.moves.map(this.Button)}
                    </div>
                </div>
                {this.state.confirmationModal && (
                    <MeepMeepModal>
                        <h2 style={{ color: "white" }}>Confirm your choice:</h2>
                        <h2 style={{ color: "white" }}>{this.state.move}</h2>
                        <button onClick={this.onClickConfirmMove}>Yes</button>
                        <button onClick={this.onClickDiscardMove}>No</button>
                    </MeepMeepModal>
                )}
            </div>
        );
    }

    Button = (move, i) => {
        return (
            <div
                key={i + move}
                className={`select-3d__face`}
                onClick={this.onClickMove(move)}
            >
                <img src={this.imgs[i]} alt={move} width="90%" height="95%" />
                <h3 className={"choice"}>{move}</h3>
            </div>
        );
    };
}

Select3D.defaultProps = {
    disable: false,
    isUser: false,
    onClick: () => undefined,
};

Select3D.propTypes = {
    disable: PropTypes.bool,
    isUser: PropTypes.bool,
    onClick: PropTypes.func,
};

export default Select3D;
