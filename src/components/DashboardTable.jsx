import React from "react";

function DashboardTable({
  pageHeader,
  tableHeaders,
  usersLoading,
  usersList,
  usersError,
}) {
  const showHeader = tableHeaders.map((header) => <th scope="col" className="px-6 py-3 font-medium bg-[#3a5b2216]">{header}</th>);
  const showBody = usersList?.map((user) => (
    <tr className="odd:bg-neutral-primary even:bg-[#3a5b2216] border-b border-default">
      {tableHeaders?.map((header) => (
        <td className="px-6 py-4">
          {typeof user[header] === "object" ? (
            <div className="w-8 h-8">
              <img src={user[header].url} alt="" />
            </div>
          ) : (
            user[header]
          )}
        </td>
        
      ))}
      <td>
        action
      </td>
    </tr>
  ));
  console.log(showBody);
  return (
    <div className="m-4 relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default ">
      {/* <h1>{pageHeader}</h1> */}
      <table className="w-full text-sm text-center rtl:text-right text-body">
        <thead className="bg-neutral-secondary-soft border-b border-default ">
          <tr>
            {showHeader}
            <th scope="col" className="px-6 py-3 font-medium bg-[#3a5b2216]">
              actions
            </th>
          </tr>
        </thead>
        <tbody>
          {/* <td>haider ali </td>
          <td>haider ali </td>
          <td>haider ali </td>
          <td>haider ali </td>
          <td>haider ali </td> */}
          {showBody}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardTable;
