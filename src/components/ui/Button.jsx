import "./Button.css"
import PropTypes from "prop-types";

function Button({onClick, children, ...rest}) {
    return <button onClick={onClick} {...rest}>{children}</button>;
}

Button.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
}

export default Button;