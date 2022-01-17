import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Edit from "./pages/Edit";
import Register from "./pages/auth/Register";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "./pages/auth/Login";
import View from "./pages/View";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />

          <ProtectedRoutes exact path="/" component={Home}></ProtectedRoutes>
          <ProtectedRoutes
            exact
            path="/view/:id"
            component={View}></ProtectedRoutes>
          <ProtectedRoutes
            exact
            path="/profile"
            component={Profile}></ProtectedRoutes>
          <ProtectedRoutes
            exact
            path="/update/:id"
            component={Edit}></ProtectedRoutes>
        </Switch>
      </Router>
    </>
  );
}

export default App;
