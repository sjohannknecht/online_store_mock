import "./Tile.css"
import PropTypes from "prop-types";

function Tile({children, className}) {
    return <div className={["tile", className].join(" ")}>
        {children}
    </div>
}

Tile.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
}
export default Tile;