import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import EditCateTable from "../../components/CateTable/EditCateTable";

const ViewEditCateTable = () => {
  return (
    <>
      <Header />
      <EditCateTable type="edit" />
      <Footer />
    </>
  );
};
export default ViewEditCateTable;
