import React, { useState, useEffect } from "react";
import { Form, Container, Button, Card, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../redux/api/apiCall";
import { editNotesAsync, fetchNotesAsync } from "../../redux/api/notesApi";

const EditForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { editNotePending } = useSelector((state) => state.notes);

  const updateHandler = (e) => {
    e.preventDefault();
    const data = { title, content, category, id: params.id };
    dispatch(editNotesAsync(data));
    history.push("/");
    dispatch(fetchNotesAsync());
  };

  useEffect(() => {
    const fetching = async () => {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/api/notes/${params.id}`);
      setLoading(false);
      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };

    fetching();
  }, [params.id, date]);
  return (
    <>
      <Container
        className="mt-5"
        style={{
          border: "4px solid black",
          borderRadius: "20px",
          marginBottom: "25px",
        }}>
        <h2 className="text-center my-2">Update note</h2>
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "15px",
            }}>
            <Spinner animation="border" />
          </div>
        )}
        {editNotePending && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "15px",
            }}>
            <Spinner animation="border" />
          </div>
        )}
        <Form className="mt-5" onSubmit={updateHandler}>
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

          <Button type="submit" variant="success" className=" mb-4">
            Update
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default EditForm;
