import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import EditMenu from "../../components/Menu/EditMenu";

const ViewEditMenu = () => {
  return (
    <>
      <Header />
      <EditMenu type="edit" />
      <Footer />
    </>
  );
};
export default ViewEditMenu;
