import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import One from "./views/articles/One";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="one" element={<One />} />
    </Routes>
  );
}

export default App;
