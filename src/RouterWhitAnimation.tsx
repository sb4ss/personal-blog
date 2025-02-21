import Home from "./views/Home.tsx";
import One from "./views/articles/One.tsx";
import { useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Two from "./views/articles/Two.tsx";

function RoutesWithAnimation() {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route path="/one" element={<One />} />
      <Route path="/two" element={<Two />} />
    </Routes>
  );
}

export default RoutesWithAnimation;
