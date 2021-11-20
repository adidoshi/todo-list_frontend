import React, { useState, useEffect } from "react";
import { Form, Container, Button, Card } from "react-bootstrap";
import MainNavbar from "./MainNavbar";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { createNote } from "../redux/actions/notesActions";
import { useHistory } from "react-router-dom";
import Loading from "./Loading";
import DisplayErrorMessage from "./DisplayErrorMessage";

const CreateNote = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  const noteCreate = useSelector((state) => state.noteCreate);
  const { loading, error } = noteCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const resetHandler = () => {
    setTitle("");
    setContent("");
    setCategory("");
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createNote(title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    history.push("/");
  };

  return (
    <>
      <MainNavbar />
      <Container className="outer mt-5">
        <h2 className="text-center my-2">Create your note</h2>
        <Form className="mt-5" onSubmit={submitHandler}>
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
          {loading && <Loading size={50} />}
          <Button type="submit" variant="success" className=" mb-4">
            Create
          </Button>
          <Button
            variant="secondary"
            className="ms-2 mb-4"
            onClick={resetHandler}>
            Reset
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default CreateNote;
