import { Link } from "react-router";
import "./Logo.css";

export default function Logo() {
  return (
    <Link
      to="/"
      className="jobtrack-logo"
      aria-label="JobTrack ana sayfasına git"
    >
      <span className="jobtrack-logo__dot" aria-hidden="true"></span>
      <span className="jobtrack-logo__text">JobTrack</span>
    </Link>
  );
}