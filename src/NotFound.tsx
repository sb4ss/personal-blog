import { motion } from "motion/react";
import "./App.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <motion.div
      className="notfound"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2>404 Page not found :(</h2>
      <p>
        You seem to be lost, <Link to="/">¿do you want to go back?</Link>
      </p>
    </motion.div>
  );
};

export default NotFound;
