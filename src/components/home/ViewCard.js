import axios from "axios";
import { useState, useEffect } from "react";
import { Card, Container, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../redux/api/apiCall";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";

const ViewCard = () => {
  const [loading, setLoading] = useState(false);
  const [noteDetails, setNoteDetails] = useState([]);
  const params = useParams();
  useEffect(() => {
    const fetching = async () => {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/api/notes/${params.id}`);
      setLoading(false);
      setNoteDetails(data);
    };

    fetching();
  }, [params.id]);
  return (
    <>
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "15px 0",
          }}>
          <Spinner animation="border" />
        </div>
      )}
      <Container className="mt-5">
        <h2 className="my-5">View you entire created note here!</h2>
        <Card>
          <Card.Header>{noteDetails?.category}</Card.Header>
          <Card.Body>
            <h3>{noteDetails?.title}</h3>
            <ReactMarkdown>{noteDetails?.content}</ReactMarkdown>
            <Card.Footer className="text-muted">
              <p>
                Created:{" "}
                <Moment format="YYYY/MM/DD">{noteDetails?.createdAt}</Moment> |{" "}
                <Moment format="hh:mm:ss">{noteDetails?.createdAt}</Moment>
              </p>

              <p style={{ margin: "1px 0" }}>
                Updated:{" "}
                <Moment format="YYYY/MM/DD">{noteDetails?.updatedAt}</Moment> |{" "}
                <Moment format="hh:mm:ss">{noteDetails?.updatedAt}</Moment>
              </p>
            </Card.Footer>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default ViewCard;
