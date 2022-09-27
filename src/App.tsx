import React  from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout"
import Home from "./Routes/Home/Index"
import Fonts from "./Routes/Fonts"
import Variables from "./Routes/Variables"


function App() {
  return (
    <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="fonts" element={<Fonts />} />
      <Route path="variables" element={<Variables />} />
      {/* Using path="*"" means "match anything", so this route
            acts like a catch-all for URLs that we don't have explicit
            routes for. */}
      {/* <Route path="*" element={<NoMatch />} /> */}
    </Route>
  </Routes>
  );
}

export default App;
