import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../actions/userActions";

export default function Signin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  return (
    <form className="container mt-5" onSubmit={submitHandler}>
      <div>
        <h1 className="font-weight-light">Sign In</h1>
      </div>
      {loading && <p>loading</p>}
      {error && <p>error</p>}
      <div className="form-group mt-3">
        <label htmlFor="email">Email address</label>
        <input
          className="form-control"
          type="email"
          id="email"
          placeholder="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          className="form-control"
          type="password"
          id="password"
          placeholder="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </div>
      <div className="form-group">
        <button className="btn btn-primary btn-lg btn-block " type="submit">
          Sign In
        </button>
      </div>
      <div className="form-group">
        <div>
          New Customer ?
          <Link to={`/register?redirect=${redirect}`}>Create your account</Link>
        </div>
      </div>
    </form>
  );
}
