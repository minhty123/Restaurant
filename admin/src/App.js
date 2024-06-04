import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Loading from "./components/Loading/Loading";
import PageNotFound from "./components/NotFound/PageNotFound";

const ViewHome = React.lazy(() => import("./pages/ViewHome"));
const ViewCustomer = React.lazy(() => import("./pages/Customer/ViewCustomer"));
const ViewCateTable = React.lazy(() =>
  import("./pages/CateTable/ViewCateTable")
);
const ViewAddCustomer = React.lazy(() =>
  import("./pages/Customer/ViewAddCustomer")
);
const ViewAddEmployee = React.lazy(() =>
  import("./pages/Employee/ViewAddEmployee")
);
const ViewAddTable = React.lazy(() => import("./pages/Table/ViewAddTable"));
const ViewAddCateTable = React.lazy(() =>
  import("./pages/CateTable/ViewAddCateTable")
);
const ViewEditEmployee = React.lazy(() =>
  import("./pages/Employee/ViewEditEmployee")
);
const ViewEditMenu = React.lazy(() => import("./pages/Menu/ViewEditMenu"));
const ViewEditTable = React.lazy(() => import("./pages/Table/ViewEditTable"));

const ViewEditCateTable = React.lazy(() =>
  import("./pages/CateTable/ViewEditCateTable")
);
const ViewEditCustomer = React.lazy(() =>
  import("./pages/Customer/ViewEditCustomer")
);
const ViewEmployees = React.lazy(() => import("./pages/Employee/ViewEmployee"));
const ViewAddMenu = React.lazy(() => import("./pages/Menu/ViewAddMenu"));
const ViewMenu = React.lazy(() => import("./pages/Menu/ViewMenu"));
const ViewTable = React.lazy(() => import("./pages/Table/ViewTable"));
function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<ViewHome />} />
          <Route path="/customers" element={<ViewCustomer />} />
          <Route path="/catetables" element={<ViewCateTable />} />
          <Route path="/customers/create" element={<ViewAddCustomer />} />
          <Route path="/employees/create" element={<ViewAddEmployee />} />
          <Route path="/tables/create" element={<ViewAddTable />} />
          <Route path="/catetables/create" element={<ViewAddCateTable />} />
          <Route path="/menus/create" element={<ViewAddMenu />} />
          <Route path="/employees/edit/:slug" element={<ViewEditEmployee />} />
          <Route path="/menus/edit/:slug" element={<ViewEditMenu />} />
          <Route path="/tables/edit/:slug" element={<ViewEditTable />} />
          <Route
            path="/catetables/edit/:slug"
            element={<ViewEditCateTable />}
          />
          <Route path="/customers/edit/:slug" element={<ViewEditCustomer />} />
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
