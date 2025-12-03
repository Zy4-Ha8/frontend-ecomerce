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
  const [tableActive, setTableActive] = useState(true);
  const [cardActive, setCardActive] = useState(false);
  useEffect(() => {
    if (search === "") {
      dispatch(getAllUsers({ limit: 8, page: currentPage }));
    } else {
      dispatch(getAllUsers({ limit: 8, page: currentPage, search }));
    }
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
      setCurrentPage(1);
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
        Loading={usersLoading}
        List={userState?.users.data}
        Error={usersError?.message}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageClick}
        deleteUser={deleteUser}
        searchStuff={{ search, setSearch }}
        filterBySearch={filterBySearch}
        clearSearch={clearSearch}
        tableStuff={{ tableActive, setTableActive }}
        cardStuff={{ cardActive, setCardActive }}
      />
    </div>
  );
};

export default Users;
