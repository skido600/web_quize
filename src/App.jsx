import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Loader from "./Components/Loader";

// Lazy load components
const Welcome = lazy(() => import("./Components/Welcome"));
const Main = lazy(() => import("./Components/Main"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/quize" element={<Main />} />
          <Route path="/" element={<Welcome />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
