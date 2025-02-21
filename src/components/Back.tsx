import { IoArrowBackOutline } from "react-icons/io5";
import "./back.css";
import { Link } from "react-router-dom";

function Back() {
  return (
    <Link to="/">
      <IoArrowBackOutline className="arrow" />
    </Link>
  );
}

export default Back;
