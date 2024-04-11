import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from "./components/Loading/Loading";
import PageNotFound from "./components/NotFound/PageNotFound";

const ViewHome = React.lazy(() => import("./pages/ViewHome"));
// const ViewPartner = React.lazy(() => import("./pages/Partner/ViewPartner"));
// const ViewAddPartner = React.lazy(() =>
//   import("./pages/Partner/ViewAddPartner")
// );
// const ViewEditPartner = React.lazy(() =>
//   import("./pages/Partner/ViewEditPartner")
// );
// const ViewNews = React.lazy(() => import("./pages/New/ViewNews"));
// const ViewAddNews = React.lazy(() => import("./pages/New/ViewAddNews"));
// const ViewEditNews = React.lazy(() => import("./pages/New/ViewEditNews"));
// const ViewNewsDetail = React.lazy(() => import("./pages/New/ViewNewsDetail"));

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<ViewHome />} />
          {/* <Route path="/partner" element={<ViewPartner />} />
          <Route path="/partner/add" element={<ViewAddPartner />} />
          <Route path="/partner/:slug" element={<ViewEditPartner />} />
          <Route path="/news" element={<ViewNews />} />
          <Route path="/news/create" element={<ViewAddNews />} />
          <Route path="/news/:slug" element={<ViewEditNews />} />
          <Route path="/news/:slug/detail" element={<ViewNewsDetail />} /> */}
          <Route path="/loading" element={<Loading />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
