import React, { useEffect, useState } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import NoteCard from "../components/home/NoteCard";
import MainNavbar from "../components/layout/MainNavbar";
import { fetchNotesAsync } from "../redux/api/notesApi";

const Home = () => {
  const [search, setSearch] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const { notesData } = useSelector((state) => state.notes);

  const { userInfo } = useSelector((state) => state.user);
  const { notesLoading } = useSelector((state) => state.notes);
  useEffect(() => {
    dispatch(fetchNotesAsync());
    if (!userInfo) {
      history.push("/login");
    }
  }, [history, userInfo, dispatch]);

  return (
    <>
      <Helmet title="Splash Notes | Home" />
      <MainNavbar setSearch={setSearch} />
      <Toaster />
      <Container>
        <Toaster />
        <h1 className="my-4">Welcome {userInfo?.name}!</h1>

        {notesLoading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "15px",
            }}>
            <Spinner animation="border" />
          </div>
        )}
        {notesData?.length > 0 ? (
          <Row>
            {notesData &&
              notesData
                .filter((filteredNote) =>
                  filteredNote.title
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((note) => <NoteCard key={note._id} note={note} />)}
          </Row>
        ) : (
          <h2>Nothing to show here! Create a note....</h2>
        )}
      </Container>
    </>
  );
};

export default Home;
