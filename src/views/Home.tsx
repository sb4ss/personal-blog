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
      <h2>Articles by Sb4ss</h2>
      <p>
        This project is linked to my portfolio,
        <a href="https://sb4ss.vercel.app"> go check it out.</a>
      </p>
      <Content />
    </motion.div>
  );
}

export default Home;
