import React, { useState, useEffect } from "react";
import { Form, Container, Button, Card } from "react-bootstrap";
import MainNavbar from "./MainNavbar";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { updateNote } from "../redux/actions/notesActions";
import DisplayErrorMessage from "./DisplayErrorMessage";
import Loading from "./Loading";

const UpdateNote = ({ match }) => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const dispatch = useDispatch();

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error } = noteUpdate;

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(
        `https://todolistnotesapp.herokuapp.com/api/notes/${match.params.id}`
      );

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };

    fetching();
  }, [match.params.id, date]);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateNote(match.params.id, title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    history.push("/");
  };
  return (
    <>
      <MainNavbar />
      <Container className="outer mt-5">
        <h2 className="text-center my-2">Update note</h2>
        <Form className="mt-5" onSubmit={updateHandler}>
          {error && (
            <DisplayErrorMessage variant="danger">{error}</DisplayErrorMessage>
          )}
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
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
          {content && (
            <Card>
              <Card.Header>Note Preview</Card.Header>
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
          {loading && <Loading size={50} />}
          <Button type="submit" variant="success" className=" mb-4">
            Update
          </Button>
          <Button variant="secondary" className="ms-2 mb-4">
            Delete
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default UpdateNote;
