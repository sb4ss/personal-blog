import { createBrowserRouter } from "react-router-dom";
import Home from "./views/Home";
import One from "./views/articles/One";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/one", element: <One /> },
]);

export default router;
