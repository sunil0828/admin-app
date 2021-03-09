import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";

export default function UpdateUser(props) {
  const userId = props.match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumer] = useState("");

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    success: successUpdate,
    loading: loadingUpdate,
    error: errorUpdate,
  } = userUpdate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      props.history.push("/users");
    }
    if (!user) {
      dispatch(detailsUser(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setPhoneNumer(user.phoneNumber);
    }
  }, [dispatch, user, userId, props.history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, phoneNumber }));
  };
  return (
    <div className="container mt-5">
      <form className="container " onSubmit={submitHandler}>
        <div>
          <h1 className="font-weight-light">Edit User</h1>
          {loadingUpdate && <p>loading...</p>}
          {errorUpdate && <p>{errorUpdate}</p>}
        </div>
        {loading ? (
          <p>loading..</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <div className="form-group mt-3">
              <label htmlFor="name">Name</label>
              <input
                className="form-control"
                id="name "
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                id="email "
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                className="form-control"
                id="phoneNumber "
                type="number"
                placeholder="Enter phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumer(e.target.value)}
              ></input>
            </div>

            <div className="form-group">
              <button className="btn btn-primary" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
