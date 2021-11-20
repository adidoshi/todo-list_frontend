import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginScreen from "./screens/userAuth/LoginScreen";
import RegisterScreen from "./screens/userAuth/RegisterScreen";
import Main from "./components/Main";
import Profile from "./screens/profile/Profile";
import CreateNote from "./components/CreateNote";
import UpdateNote from "./components/UpdateNote";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/updatenote/:id" component={UpdateNote} />
          <Route exact path="/createnote" component={CreateNote} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
