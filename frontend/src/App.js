import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Contact from "./pages/Contact";
import Signin from "./pages/Signin";
import Register from "./pages/Register";
import Users from "./pages/Users";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import UpdateUser from "./pages/UpdateUser";
import CreateUser from "./pages/CreateUser";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigationbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Router>
        <Navigationbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/users" exact component={Users} />
          <Route path="/user/:id/updateUser" exact component={UpdateUser} />
          <Route path="/createUser" exact component={CreateUser} />
          <Route path="/register" exact component={Register} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
