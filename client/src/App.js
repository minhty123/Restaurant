import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from "./components/Loading/Loading";
import PageNotFound from "./components/NotFound/PageNotFound";
import ViewHome from "./pages/ViewHome";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<ViewHome />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
