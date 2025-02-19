import Home from "./views/Home";
import One from "./views/articles/One";
import { useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

function RoutesWithAnimation() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.key}>
      <Route path="/" element={<Home />} />
      <Route path="/one" element={<One />} />
    </Routes>
  );
}

export default RoutesWithAnimation;
