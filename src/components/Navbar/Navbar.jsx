import "./Navbar.css";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

function Navbar({entries}) {
    return <nav className="Navbar">
        <ul className="Navbar__list">
            {entries?.map(entry =>
                <li className="Navbar__list-item" key={entry.title}>
                    <Link to={entry.path}>{entry.content}</Link>
                </li>
            )}
        </ul>
    </nav>
}

Navbar.propTypes = {
    entries: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            path: PropTypes.string,
            content: PropTypes.node,
        })
    )
}

export default Navbar;