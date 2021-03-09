import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../actions/userActions";
import PaginationComponent from "../components/Pagination";
import Search from "../components/Search";

export default function Users(props) {
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.usersList);
  const { loading, error, users } = usersList;

  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const ITEMS_PER_PAGE = 5;

  const userDelete = useSelector((state) => state.userDelete);

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  const usersData = useMemo(() => {
    let computedUsers = usersList?.users;

    if (search) {
      computedUsers = computedUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedUsers?.length);

    return computedUsers?.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [currentPage, usersList?.users, search]);

  const deleteHandler = (user) => {
    if (window.confirm("Are You sure..! You want to delete the User..?")) {
      dispatch(deleteUser(user._id));
    }
  };

  return (
    <>
      <div className="conatiner mt-5">
        <div className="row justify-content-center">
          <div className="col-md-15 d-flex flex-row-reverse">
            <Search
              onSearch={(value) => {
                setSearch(value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
        <div className="conatiner mt-4 table-responsive">
          {loadingDelete && <p>loading...</p>}
          {errorDelete && <p>{errorDelete}</p>}
          {successDelete && <p>User Deleted Successfully</p>}
          {loading ? (
            <p>loading..</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <table className="table table-striped table-bordered table-hover">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Id</th>
                <th>Phone Number</th>
                <th>Actions</th>
              </tr>
              {usersData?.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user._id}</td>
                  <td>{user.phoneNumber}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-primary ml-2 my-2 my-sm-0"
                      onClick={() =>
                        props.history.push(`/user/${user._id}/updateUser`)
                      }
                    >
                      ✏
                    </button>

                    <button
                      type="button"
                      className="btn btn-outline-danger ml-2 my-2 my-sm-0"
                      onClick={() => deleteHandler(user)}
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          )}
        </div>
        <div className="row justify-content-center">
          <div className="col-md-20 ">
            <PaginationComponent
              total={totalItems}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
