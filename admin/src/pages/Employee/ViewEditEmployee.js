import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer/Footer";
import EditEmployee from "../../components/Employees/EditEmployee";

const ViewEditEmployee = () => {
  return (
    <>
      <Header />
      <EditEmployee type="edit" />
      <hr />
      <Footer />
    </>
  );
};
export default ViewEditEmployee;
