import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../actions/userActions";

export default function CreateUser(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // const redirect = props.location.search
  //   ? props.location.search.split("=")[1]
  //   : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and confirm password are not match");
    } else {
      dispatch(createUser(name, email, password));
    }
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push("/users");
    }
  }, [props.history, userInfo]);
  return (
    <div>
      <form className="container mt-5" onSubmit={submitHandler}>
        <div>
          <h1 className="font-weight-light">Create New User</h1>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="name">Name</label>
          <input
            className="form-control"
            type="text"
            id="name"
            placeholder="name"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            className="form-control"
            type="email"
            id="email"
            placeholder="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            type="password"
            id="password"
            placeholder="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className="form-control"
            type="password"
            id="confirmPassword"
            placeholder="confirm password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <button className="btn btn-primary" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
