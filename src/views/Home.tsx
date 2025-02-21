import { motion } from "motion/react";
import "../App.css";
import Content from "../components/Content/Content";

function Home() {
  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="title-bg">
        <h2 className="title">Articles by</h2>
        <div className="porfile">
          <img src="tux.gif" alt="" />
          <h3>s_b4ss</h3>
        </div>
      </div>
      <p>
        This project is linked to my portfolio
        <a href="https://sb4ss.vercel.app"> go check it out.</a>
      </p>
      <Content />
    </motion.div>
  );
}

export default Home;
