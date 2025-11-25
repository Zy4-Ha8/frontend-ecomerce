import { useDispatch, useSelector } from "react-redux";
import DashboardTable from "../../../components/DashboardTable";
import { useEffect } from "react";
import { getAllUsers } from "../../../features/users/usersSlice";

const Users = () => {
  const tableHeaders = ["id", "name", "username", "userAvatar", "role"];
  const userState = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  const usersLoading = userState?.loading;
  const usersList = userState?.users;
  const usersError = userState?.error;
  console.log(userState);
  return (
    <div>
      <DashboardTable
        pageHeader={"Users"}
        tableHeaders={tableHeaders}
        usersLoading={usersLoading}
        usersList={ userState?.users}
        usersError={usersError}
      />
    </div>
  );
};

export default Users;
