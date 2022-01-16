import React, { useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
// import { format } from "timeago.js";
import { Link } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import Moment from "react-moment";

const NoteCard = ({ modalHandler, note }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Col xs={12} md={6}>
        <Card className="mb-4">
          <Card.Header className="fw-bold fs-6">
            <Button
              variant="outline-success"
              size="sm"
              className="mb-2 fw-bold">
              • {note?.category}
            </Button>
          </Card.Header>
          <Card.Body>
            <Card.Title>{note?.title}</Card.Title>
            <div style={{ minHeight: "100px" }}>
              <ReactMarkdown>{note?.content}</ReactMarkdown>
            </div>
            <Link to={`/update/${note?._id}`}>
              <Button
                variant="secondary fw-bold text-white"
                onClick={modalHandler}>
                Edit
              </Button>
            </Link>
            <Button
              variant="danger fw-bold"
              className="ms-2"
              onClick={handleShow}>
              Delete
            </Button>
            <DeleteModal showModal={show} setShow={setShow} note={note} />
            <div style={{ margin: "10px 0" }}>
              <small>
                Created: <Moment format="YYYY/MM/DD">{note?.createdAt}</Moment>{" "}
                | <Moment format="hh:mm:ss">{note?.createdAt}</Moment>
              </small>
              <br />
              <small style={{ margin: "1px 0" }}>
                Updated: <Moment format="YYYY/MM/DD">{note?.updatedAt}</Moment>{" "}
                | <Moment format="hh:mm:ss">{note?.updatedAt}</Moment>
              </small>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default NoteCard;
