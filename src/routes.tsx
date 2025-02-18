import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import One from "./views/articles/one";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/one", element: <One /> },
]);

export default router;
