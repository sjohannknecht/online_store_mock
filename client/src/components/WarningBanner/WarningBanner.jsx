import PropTypes from "prop-types";
import "./WarningBanner.css";

function WarningBanner({ message }) {
  return <p className="warning-banner">{message}</p>;
}

WarningBanner.propTypes = {
  message: PropTypes.string,
};

export default WarningBanner;
