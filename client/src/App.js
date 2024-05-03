import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Loading from "./components/Loading/Loading";
import PageNotFound from "./components/NotFound/PageNotFound";
import ViewHome from "./pages/ViewHome";
import ViewCustomer from "./pages/Customer/ViewCustomer";
import ViewAddCustomer from "./pages/Customer/ViewAddCustomer";
import ViewAddEmployee from "./pages/Employee/ViewAddEmployee";
import ViewAddTable from "./pages/Table/ViewAddTable";
import ViewEditEmployee from "./pages/Employee/ViewEditEmployee";
import ViewEditMenu from "./pages/Menu/ViewEditMenu";
import ViewEmployees from "./pages/Employee/ViewEmployee";
import ViewAddMenu from "./pages/Menu/ViewAddMenu";
import ViewMenu from "./pages/Menu/ViewMenu";
import ViewTable from "./pages/Table/ViewTable";

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<ViewHome />} />
          <Route path="/customers" element={<ViewCustomer />} />
          <Route path="/customers/create" element={<ViewAddCustomer />} />
          <Route path="/employees/create" element={<ViewAddEmployee />} />
          <Route path="/tables/create" element={<ViewAddTable />} />
          <Route path="/menus/create" element={<ViewAddMenu />} />
          <Route path="/employees/:slug" element={<ViewEditEmployee />} />
          <Route path="/menus/:slug" element={<ViewEditMenu />} />
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
