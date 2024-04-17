import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import "./Partner.scss";
const Partner = () => {
  const navigate = useNavigate();
  const [partner, setPartner] = useState([]);
  const [partnerId, setPartnerId] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setShow(true);
    setPartnerId(e);
  };
  async function getPartner() {
    const res = await axios.get("http://localhost:8000/partners");
    setPartner(res.data.partner);
  }
  async function deletePartner() {
    await axios.delete("http://localhost:8000/partners/" + partnerId);
    handleClose();
    window.location.reload();
  }
  const editPartner = (e) => {
    navigate("/partner/" + e);
  };
  useEffect(() => {
    getPartner();
  }, []);
  return (
    <Container fluid="xxl">
      <h1 className="all">My Partners</h1>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Logo</th>
            <th>Name</th>
            <th colSpan={2}>Create At</th>
          </tr>
        </thead>
        <tbody>
          {partner.length > 0 &&
            partner.map((item, index) => (
              <tr className="tr-partner" key={index}>
                <td>{index + 1}</td>
                <td className="td-image">
                  <img className="logo-image" src={item.logo} alt={item.name} />
                </td>
                <td className="td-name">{item.name}</td>
                <td>{item.createdAt}</td>
                <td>
                  <button
                    className="edit-delete"
                    onClick={() => {
                      editPartner(`${item.slug}`);
                    }}
                  >
                    <img
                      src="https://res.cloudinary.com/dwpjjpgrz/image/upload/v1677255155/ICON/icons8-edit-30_tmdtyi.png"
                      alt="edit"
                    />
                  </button>{" "}
                  <button
                    className="edit-delete"
                    onClick={() => handleShow(`${item._id}`)}
                  >
                    <img
                      src="https://res.cloudinary.com/dwpjjpgrz/image/upload/v1677255261/ICON/icons8-trash-can-30_irvcca.png"
                      alt="delete"
                    />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Wait!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this partner ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deletePartner}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
export default Partner;