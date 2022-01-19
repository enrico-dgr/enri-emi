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
        this.timeoutEnemyAnimation = null;

        this.previouseTouchX = 0;

        this.state = {
            move: "",
            hideConfirmationModal: true,
            movementX: 0,
            mouseDown: false,
        };
    }

    componentDidMount() {
        window.addEventListener("mouseup", this.onMouseUp);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.isEnemy) {
            if (
                this.props.enemyMove !== nextProps.enemyMove ||
                this.state.move !== nextState.move
            ) {
                return true;
            }
        } else {
            if (
                this.state.movementX !== nextState.movementX ||
                this.state.hideConfirmationModal !==
                    nextState.hideConfirmationModal ||
                this.state.mouseDown !== nextState.mouseDown
            ) {
                return true;
            }
        }

        return false;
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            this.props.enemyMove !== "" &&
            this.props.enemyMove !== prevProps.enemyMove &&
            this.props.isEnemy
        ) {
            // `enemyMove` will trigger an animation,
            // this function will properly set the value after animation is done.
            // Notice: the two events are async, so if animation changes,
            // you must change the delay in this function accordingly.
            this.setEnemyMoveAfterAnimation();

            this.setState({ move: this.props.enemyMove });
        }
    }

    /**
     * 3D object movement
     */

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

    onMouseUp = () => {
        this.previouseTouchX = 0;

        this.setState({
            mouseDown: false,
        });
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

    /**
     * User choosing move
     */

    onClickMove = (move) => () => {
        if (this.props.disableChoose === false) {
            this.setState({
                move,
                // open modal
                hideConfirmationModal: false,
            });
        }
    };

    onClickConfirmMove = () => {
        // dispatch event 'move' setted.
        this.props.onSetMove(this.state.move);
        // close modal
        this.setState({ hideConfirmationModal: true });
    };

    onClickDiscardMove = () => {
        // close modal
        this.setState({ hideConfirmationModal: true });
    };

    /**
     * Enemy move: `this.props.enemyMove`'s animations
     * `this.state.move` is assigned in componentDidUpdate
     */

    setEnemyMoveAfterAnimation = () => {
        this.timeoutEnemyAnimation = setTimeout(() => {
            this.props.onSetMove(this.state.move);

            this.timeoutResetAnimation = setTimeout(() => {
                this.setState({ move: "reset" });
            }, 500);
        }, 4500);
    };

    /**
     * Unmount
     */

    componentWillUnmount() {
        window.removeEventListener("mouseup", this.onMouseUp);

        if (this.timeoutEnemyAnimation !== null) {
            clearInterval(this.timeoutEnemyAnimation);
        }
    }

    render() {
        return (
            <div
                className={`select-3d__container ${
                    this.props.isEnemy ? "select-3d__container--enemy" : ""
                }`}
                {...(this.props.isEnemy
                    ? {}
                    : {
                          onMouseDown: this.onMouseDown,
                          onTouchStart: this.onTouchStart,
                          onMouseMove: this.onMouseMove,
                          onTouchMove: this.onTouchMove,
                      })}
            >
                {/* select-3d : rotation offset */}
                <div
                    {...(this.props.isEnemy
                        ? {
                              className: `select-3d select-3d--enemy`,
                          }
                        : {
                              className: `select-3d`,
                          })}
                >
                    {/* select-3d__inner : this is what rotate dynamically */}
                    <div
                        {...(this.props.isEnemy
                            ? // enemy or bot
                              {
                                  className: `select-3d__inner select-3d__inner__animation ${
                                      this.state.move !== ""
                                          ? "select-3d__inner__animation--" +
                                            this.state.move
                                          : ""
                                  }`,
                              }
                            : // client player
                              {
                                  className: `select-3d__inner`,
                                  style: {
                                      transform: `rotateY(${this.state.movementX}deg)`,
                                  },
                              })}
                    >
                        {this.moves.map(this.Button)}
                    </div>
                </div>

                <MeepMeepModal hide={this.state.hideConfirmationModal}>
                    <p>
                        Confirm <span>{this.state.move.toUpperCase()}</span>?
                    </p>
                    <button onClick={this.onClickConfirmMove}>Yes</button>
                    <button onClick={this.onClickDiscardMove}>No</button>
                </MeepMeepModal>
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
    disableChoose: false,
    enemyMove: "",
    isEnemy: false,
    onSetMove: () => undefined,
};

Select3D.propTypes = {
    disableChoose: PropTypes.bool,
    enemyMove: PropTypes.string,
    isEnemy: PropTypes.bool,
    onSetMove: PropTypes.func,
};

export default Select3D;
