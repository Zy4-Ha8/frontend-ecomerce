import { useDispatch, useSelector } from "react-redux";
import DashboardTable from "../../../components/DashboardTable";
import { useEffect, useState } from "react";
import {
  getAllUsers,
  deleteUser as dlUser,
} from "../../../features/users/usersSlice";
import {
  deleteCategory as dlCategory,
  getAllCategories,
} from "../../../features/categories/categoriesSlice";

const Categories = () => {
  const tableHeaders = ["id", "name", "description", "is_active", "image_url"];
  const categoryState = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [tableActive, setTableActive] = useState(true);
  const [cardActive, setCardActive] = useState(false);
  useEffect(() => {
    if (search === "") {
      dispatch(getAllCategories({ limit: 8, page: currentPage }));
    } else {
      dispatch(getAllCategories({ limit: 8, page: currentPage, search }));
    }
  }, [dispatch, currentPage]);
  const loading = categoryState?.loading;
  const itemsList = categoryState?.categories.data;
  const Error = categoryState?.error;
  const totalPages = categoryState?.categories?.totalPage || 0;
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };
  const deleteCategory = (id) => {
    dispatch(dlCategory(id));
  };

  const filterBySearch = (e) => {
    e.preventDefault();
    if (search) {
      setCurrentPage(1);
      dispatch(getAllCategories({ limit: 8, page: currentPage, search }));
    }
  };
  const clearSearch = (e) => {
    e.preventDefault();
    if (search !== "") {
      setSearch("");
      dispatch(getAllCategories({ limit: 8, page: currentPage }));
    }
  };
  console.log(categoryState);
  return (
    <div className="h-164">
      <DashboardTable
        pageHeader={"Categories"}
        tableHeaders={tableHeaders}
        Loading={loading}
        List={itemsList}
        Error={Error?.message}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageClick}
        deleteItem={deleteCategory}
        searchStuff={{ search, setSearch }}
        filterBySearch={filterBySearch}
        clearSearch={clearSearch}
        tableStuff={{ tableActive, setTableActive }}
        cardStuff={{ cardActive, setCardActive }}
        updatedRoute={"update-category"}
      />
    </div>
  );
};

export default Categories;
