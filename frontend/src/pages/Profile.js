import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

export default function Profile(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumer] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    loading: loadingUpdate,
    error: errorUpdate,
  } = userUpdateProfile;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo._id, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and Confirm password Are Not Matched");
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          name,
          email,
          phoneNumber,
          password,
        })
      );
    }
  };
  return (
    <div>
      <form className="container mt-5" onSubmit={submitHandler}>
        <div>
          <h1 className="font-weight-light">User Profile</h1>
        </div>
        {loading ? (
          <p>loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            {loadingUpdate && <p>loading</p>}
            {errorUpdate && <p> {errorUpdate} </p>}
            {successUpdate && <p>Profile Updated Successfully</p>}
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
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                id="password "
                type="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                className="form-control"
                id="confirmPassword "
                type="password"
                placeholder="Enter confirm  password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-lg" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
