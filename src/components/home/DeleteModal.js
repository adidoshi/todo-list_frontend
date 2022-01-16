import axios from "axios";
import React, { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../redux/api/apiCall";
import { fetchNotesAsync } from "../../redux/api/notesApi";
import { errorOptions, successOptions } from "../utils/toastStyle";

const DeleteModal = ({ showModal, setShow, note }) => {
  const [delPending, setDelPending] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const handleClose = () => setShow(false);
  const dispatch = useDispatch();

  const delNote = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    try {
      let url = `${BASE_URL}/api/notes/${note?._id}`;
      setDelPending(true);
      await axios.delete(url, config);
      setDelPending(false);
      toast.success("Note removed successfully!", { style: successOptions });
      dispatch(fetchNotesAsync());
      handleClose();
    } catch (error) {
      toast.error(error.response.data.message, { style: errorOptions });
    }
  };

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete note from DB</Modal.Title>
        </Modal.Header>
        {delPending && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}>
            <Spinner animation="border" />
          </div>
        )}
        <Modal.Body>Do you want to delete the note?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => delNote(note._id)}
            disabled={delPending ? true : false}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;
