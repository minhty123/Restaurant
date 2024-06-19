import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer/Footer";
import EditTable from "../../components/Table/EditTable";

const ViewEditTable = () => {
  return (
    <>
      <Header />
      <EditTable type="edit" />
      <Footer />
    </>
  );
};
export default ViewEditTable;
