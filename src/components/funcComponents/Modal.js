import "./modal.css";

import PropTypes from "prop-types";

const Modal = (props) => {
    return (
        <div className={"modal-container"}>
            <div className={"modal-content"} style={props.style}>
                {props.children}
            </div>
        </div>
    );
};

Modal.defaultProps = {
    children: <div></div>,
    style: {},
};

Modal.propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
};

export default Modal;
