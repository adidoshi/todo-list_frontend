import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Row, Container, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { deleteNote, listNotes } from "../redux/actions/notesActions";
import DisplayErrorMessage from "./DisplayErrorMessage";
import Loading from "./Loading";

const MainCard = ({ search }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      history.push("/login");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNote(id));
    }
  };

  return (
    <>
      {error && (
        <DisplayErrorMessage variant="danger">{error}</DisplayErrorMessage>
      )}
      {errorDelete && (
        <DisplayErrorMessage variant="danger">
          {errorDelete}
        </DisplayErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      <Container>
        <h1 className="mt-3">Welcome back {userInfo && userInfo.name}</h1>
        <hr />

        <Row xs={1} md={2} className="g-4 mt-3">
          {notes &&
            notes
              .filter((filteredNote) =>
                filteredNote.title.toLowerCase().includes(search.toLowerCase())
              )
              .reverse()
              .map((note) => {
                return (
                  <div className="col-sm-6" key={note._id}>
                    <div className="card">
                      <div className="card-body change">
                        <h5 className="card-title">{note.title}</h5>
                        <Button
                          variant="outline-success"
                          size="sm"
                          className="mb-2">
                          {note.category}
                        </Button>
                        <ReactMarkdown>{note.content}</ReactMarkdown>
                        <Link to={`/updatenote/${note._id}`}>
                          <Button variant="warning">Edit</Button>
                        </Link>
                        <Button
                          variant="danger"
                          className="ms-3"
                          onClick={() => deleteHandler(note._id)}>
                          Delete
                        </Button>
                        <p>Created on: {note.createdAt.substring(0, 10)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
        </Row>
      </Container>
    </>
  );
};

export default MainCard;
