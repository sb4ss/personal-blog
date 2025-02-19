import { motion } from "motion/react";
import "../App.css";
import Content from "../components/Content/Content";

function Home() {
  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <h2>Welcome to my blog</h2>
      <Content />
    </motion.div>
  );
}

export default Home;
