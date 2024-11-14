import "./Button.css";
import PropTypes from "prop-types";

function Button({ onClick, children, className, ...rest }) {
  return (
    <button
      onClick={onClick}
      className={["Button", className].join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Button;
