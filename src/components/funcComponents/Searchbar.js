import PropTypes from "prop-types";
const Searchbar = (props) => {
    let onChange = (e) => {
        props.onChange(e.target.value);
    };
    return (
        <div className={"searchbar"}>
            <input
                type="text"
                placeholder="Enter a player name"
                onChange={onChange}
            />
        </div>
    );
};

Searchbar.defaultProps = {
    onChange: () => undefined,
};

Searchbar.propTypes = {
    onChange: PropTypes.func,
};

export default Searchbar;
