import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer/Footer";
import EditCustomer from "../../components/Customer/EditCustomer";

const ViewEditCustomer = () => {
  return (
    <>
      <Header />
      <EditCustomer type="edit" />
      <hr />
      <Footer />
    </>
  );
};
export default ViewEditCustomer;
