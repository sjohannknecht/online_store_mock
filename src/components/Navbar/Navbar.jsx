import "./Navbar.css";
import {Link} from "react-router-dom";

function Navbar({entries}) {
    return <nav className="Navbar">
        <ul className="Navbar__list">
            {entries.map(entry =>
                <li className="Navbar__list-item" key={entry.title}>
                    <Link to={entry.path}>{entry.content}</Link>
                </li>
            )}
        </ul>
    </nav>
}

export default Navbar;