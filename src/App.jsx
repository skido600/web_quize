import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Lazy load components
const Welcome = lazy(() => import("./Components/Welcome"));
const Main = lazy(() => import("./Components/Main"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/quize" element={<Main />} />
          <Route path="/" element={<Welcome />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
