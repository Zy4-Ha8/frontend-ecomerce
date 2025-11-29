import { useDispatch, useSelector } from "react-redux";
import DashboardTable from "../../../components/DashboardTable";
import { useEffect, useState } from "react";
import {
  getAllUsers,
  deleteUser as dlUser,
} from "../../../features/users/usersSlice";

const Users = () => {
  const tableHeaders = [
    "id",
    "name",
    "username",
    "email",
    "userAvatar",
    "role",
  ];
  const userState = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 8;
  useEffect(() => {
    dispatch(getAllUsers({ limit: 8, page: currentPage }));
  }, [dispatch, currentPage]);
  const usersLoading = userState?.loading;
  const usersList = userState?.users;
  const usersError = userState?.error;
  const totalPages = userState?.users?.totalPage || 0;
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };
  const deleteUser = (id) => {
    dispatch(dlUser(id));
  };

  const filterBySearch = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(getAllUsers({ limit: 8, page: currentPage, search }));
    }
  };
  const clearSearch = (e) => {
    e.preventDefault();
    if (search !== "") {
      setSearch("");
      dispatch(getAllUsers({ limit: 8, page: currentPage }));
    }
  };
  console.log(userState);
  return (
    <div className="h-164">
      <DashboardTable
        pageHeader={"Users"}
        tableHeaders={tableHeaders}
        usersLoading={usersLoading}
        usersList={userState?.users.data}
        usersError={usersError}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageClick}
        deleteUser={deleteUser}
        searchStuff={{ search, setSearch }}
        filterBySearch={filterBySearch}
        clearSearch={clearSearch}
      />
    </div>
  );
};

export default Users;
