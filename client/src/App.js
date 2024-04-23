import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Loading from "./components/Loading/Loading";
import PageNotFound from "./components/NotFound/PageNotFound";
import ViewHome from "./pages/ViewHome";
import ViewCustomer from "./pages/Customer/ViewCustomer";
import ViewAddCustomer from "./pages/Customer/ViewAddCustomer";
import ViewEmployees from "./pages/ViewEmployee";
import ViewTable from "./pages/ViewTable";

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<ViewHome />} />
          <Route path="/customers" element={<ViewCustomer />} />
          <Route path="/add" element={<ViewAddCustomer />} />
          <Route path="/employees" element={<ViewEmployees />} />
          <Route path="/tables" element={<ViewTable />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
