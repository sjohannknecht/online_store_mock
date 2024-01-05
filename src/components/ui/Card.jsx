import "./Card.css";
import PropTypes from "prop-types";

function Card({children, className}) {
    return <div className={["Card", className].join(" ")}>
        {children}
    </div>
}

Card.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
}

export default Card;