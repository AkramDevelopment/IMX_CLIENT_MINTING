import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "aos/dist/aos.css";
import AOS from "aos";
import Mint from "./pages/Mint";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Mint />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
