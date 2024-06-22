import { Route, Routes, BrowserRouter } from "react-router-dom";

import {HomePage} from "./pages/homepage";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = ({data}) => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage data={data} />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*"
          element={<h1>404 Not Found</h1>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
