import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Spinner, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import { createNoteAsync, fetchNotesAsync } from "../../redux/api/notesApi";

const CreateNoteModal = ({ showModal, setShowModal }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const { pending, success } = useSelector((state) => state.notes);

  const resetHandler = () => {
    setTitle("");
    setContent("");
    setCategory("");
  };

  const handleClose = () => setShowModal(false);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createNoteAsync({
        title,
        content,
        category,
      })
    );
    dispatch(fetchNotesAsync());
    resetHandler();
  };

  useEffect(() => {
    if (success) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  return (
    <>
      <Modal
        show={showModal}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">New Note</Modal.Title>
        </Modal.Header>
        {pending && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}>
            <Spinner animation="border" />
          </div>
        )}

        <Modal.Body>
          <Form className="mt-2" onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Complete task"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Learn Redux fundamentals..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>
                  Note Preview (Markdown syntax can be used)
                </Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="work, personal, health...."
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Button
              type="submit"
              variant="success"
              className=" mb-4"
              disabled={pending ? true : false}>
              Create
            </Button>
            <Button
              variant="secondary"
              className="ms-2 mb-4"
              onClick={resetHandler}>
              Reset
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateNoteModal;
