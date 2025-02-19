import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import One from "./views/articles/One";

function App() {
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="one" element={<One />} />
    </Routes>
  </BrowserRouter>;
}

export default App;
