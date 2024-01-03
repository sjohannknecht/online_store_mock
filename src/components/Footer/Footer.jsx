import {Link} from "react-router-dom";
import "./Footer.css";
import PropTypes from "prop-types";

function Footer({entries}) {
    return <footer className="Footer">
        <ul className="Footer__list">
            {entries?.map(entry => <li  className="Footer__list-item" key={entry.title}>
                <Link to={entry.path}>{entry.title}</Link>
            </li>)}
        </ul>
    </footer>
}

Footer.propTypes = {
    entries: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            path: PropTypes.string,
        })
    )
}

export default Footer;