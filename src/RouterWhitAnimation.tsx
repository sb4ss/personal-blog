import NotFound from "./NotFound.tsx";
import Home from "./views/Home.tsx";
import { useLocation } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import ReactRouterAnimaciones from "./views/articles/ReactRouterAnimaciones.tsx";

function RoutesWithAnimation() {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route
        path="/article-react-router-animaciones"
        element={<ReactRouterAnimaciones />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RoutesWithAnimation;
