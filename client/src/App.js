import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Loading from "./components/Loading/Loading";
import PageNotFound from "./components/NotFound/PageNotFound";
import ViewHome from "./pages/ViewHome";
import ViewCustomer from "./pages/Customer/ViewCustomer";
import ViewAddCustomer from "./pages/Customer/ViewAddCustomer";
import ViewAddEmployee from "./pages/Employee/ViewAddEmployee";
import ViewEmployees from "./pages/Employee/ViewEmployee";
import ViewMenu from "./pages/ViewMenu";
import ViewTable from "./pages/ViewTable";

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<ViewHome />} />
          <Route path="/customers" element={<ViewCustomer />} />
          <Route path="/customers/create" element={<ViewAddCustomer />} />
          <Route path="/employees/create" element={<ViewAddEmployee />} />
          <Route path="/employees" element={<ViewEmployees />} />
          <Route path="/tables" element={<ViewTable />} />
          <Route path="/menus" element={<ViewMenu />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
