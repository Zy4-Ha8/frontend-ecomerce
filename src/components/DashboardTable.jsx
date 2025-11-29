import {
  ArrowLeft,
  ArrowRight,
  Eraser,
  Pencil,
  Search,
  Settings,
  X,
} from "lucide-react";
import React from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function DashboardTable({
  pageHeader,
  tableHeaders,
  usersLoading,
  usersList,
  usersError,
  currentPage,
  totalPages,
  onPageChange,
  deleteUser,
  searchStuff,
  filterBySearch,
  clearSearch,
}) {
  const globalWidth = useSelector((state) => state.pageWidth);
  const showHeader = tableHeaders.map((header) => (
    <th scope="col" className="px-6 py-3 font-medium bg-[#3a5b2216]">
      {header}
    </th>
  ));
  const showBody = usersList?.map((user, index) => (
    <tr className="odd:bg-neutral-primary even:bg-[#3a5b2216] border-b border-default">
      {tableHeaders?.map((header) => (
        <td className="px-6 py-4">
          {typeof user[header] === "object" ? (
            <div className="w-8 h-8">
              <img src={user[header].url} alt="" />
            </div>
          ) : header === "id" ? (
            index + 1
          ) : (
            user[header]
          )}
        </td>
      ))}
      <td>
        <div className="flex items-center justify-center gap-2">
          <Link to={`/dashboard/update-user/${user.id}`}>
            <div className="cursor-pointer ">
              <Settings color="#3a5b22" />
            </div>
          </Link>

          <div
            className="cursor-pointer bg-red-500 rounded-md"
            onClick={() => deleteUser(user.id)}
          >
            <X color="white" />
          </div>
        </div>
      </td>
    </tr>
  ));
  console.log(showBody);
  return (
    <div className="m-4">
      <div className="flex flex-col sm:flex-row  justify-between items-start sm:items-center mb-2">
        <h1 className="text-2xl font-medium">{pageHeader}</h1>

        <form
          className="flex justify-between bg-[#3a5b2216] w-full  sm:w-[320px] p-3 rounded-md"
          onSubmit={filterBySearch}
        >
          <input
            type="text"
            placeholder="Search For User"
            value={searchStuff.search}
            onChange={(e) => searchStuff.setSearch(e.target.value)}
            className="border-none outline-none "
          />
          <div className="flex">
            <button>
              <Search size={globalWidth.isMoblie ? 15 : 20} />
            </button>
            <button
              type="button"
              onClick={clearSearch}
              className="flex items-center justify-center bg-[#3a5b22] p-1 rounded-md text-white"
            >
              <span className="mr-0.5 text-sm">Clear</span>
              <Eraser size={globalWidth.isMoblie ? 15 : 20} />
            </button>
          </div>
        </form>
      </div>

      {/* table */}
      <div className=" relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default rounded-md h-[564.8px] flex flex-col justify-between    ">
        <table className="w-full text-sm text-center rtl:text-right text-body ">
          <thead className="bg-neutral-secondary-soft border-b border-default ">
            <tr>
              {showHeader}
              <th scope="col" className="px-6 py-3 font-medium bg-[#3a5b2216]">
                actions
              </th>
            </tr>
          </thead>
          <tbody>{showBody}</tbody>
        </table>
      </div>

      {/* Pagination */}
      <div>
        {totalPages > 0 && (
          <ReactPaginate
            breakLabel="..."
            nextLabel=<ArrowRight className="cursor-pointer" color="#3a5b22" />
            onPageChange={onPageChange}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel=<ArrowLeft
              className="cursor-pointer"
              color="#3a5b22"
            />
            forcePage={currentPage - 1}
            containerClassName="pagination flex gap-2 justify-center p-4 "
            pageClassName="rounded-full  border"
            pageLinkClassName="page-link cursor-pointer px-3 py-2 rounded-full"
            activeClassName="bg-[#3a5b22] rounded-full text-white"
          />
        )}
      </div>
    </div>
  );
}

export default DashboardTable;
