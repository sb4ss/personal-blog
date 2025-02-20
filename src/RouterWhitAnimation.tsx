import Home from "./views/Home";
import One from "./views/articles/One";
import { useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Two from "./views/articles/two";

function RoutesWithAnimation() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.key}>
      <Route path="/" element={<Home />} />
      <Route path="/one" element={<One />} />
      <Route path="/two" element={<Two />} />
    </Routes>
  );
}

export default RoutesWithAnimation;
