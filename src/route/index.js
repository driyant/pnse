import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/Homepage";
import SearchResult from "../pages/SearchResult";
import MyBookmarks from "../pages/MyBookmarks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: `/search`,
    element: <SearchResult />
  },
  {
    path: "/mybookmarks",
    element: <MyBookmarks />
  }
]);

export default router;
