import React, { useState } from "react";
import { Button, Card, Col } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import Moment from "react-moment";

const NoteCard = ({ modalHandler, note }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const contentStr = note?.content;

  return (
    <>
      <Col xs={12} md={6}>
        <Card className="mb-4">
          <Card.Header className="fw-bold fs-6">
            <Button variant="outline-success" size="sm" className="fw-bold">
              • {note?.category}
            </Button>
          </Card.Header>
          <Card.Body>
            <Card.Title>{note?.title}</Card.Title>
            <div style={{ minHeight: "50px" }}>
              <ReactMarkdown>{`${contentStr.substr(0, 15)}...`}</ReactMarkdown>
            </div>
            <Link to={`/view/${note?._id}`}>
              <Button variant="primary fw-bold text-white" className="mt-2">
                View
              </Button>
            </Link>

            <Link to={`/update/${note?._id}`}>
              <Button
                variant="secondary fw-bold text-white"
                className="ms-2 mt-2"
                onClick={modalHandler}>
                Edit
              </Button>
            </Link>
            <Button
              variant="danger fw-bold"
              className="ms-2 mt-2"
              onClick={handleShow}>
              Delete
            </Button>
            <DeleteModal showModal={show} setShow={setShow} note={note} />
            <div style={{ margin: "10px 0" }}>
              <small>
                Created:{" "}
                <strong>
                  <Moment format="YYYY/MM/DD">{note?.createdAt}</Moment>
                </strong>{" "}
                |{" "}
                <em>
                  <Moment format="hh:mm:ss">{note?.createdAt}</Moment>
                </em>
              </small>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default NoteCard;
