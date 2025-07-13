'use client'

import { closedSelectedUserData, fetchAllUsersData, selectedUserInfo, setPage, setQuery } from "@/reduxtoolkit/reducers/DailyStatus/adminStatusReducer"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function AdminDashBorard()
{
   const allUsersData = useSelector((state) => state.admin.allUsersData);
  const selectedUserData = useSelector((state) => state.admin.selectedUserData);
  const currentPage = useSelector((state) => state.admin.currentPage);
  const totalUsers = useSelector((state) => state.admin.totalUsers);
  const query = useSelector((state) => state.admin.query);
  const totalPages=Math.ceil(totalUsers/10)
  const [search, setSearch] = useState(query);

    const dispatch=useDispatch()
    useEffect(()=>{
const fetchdata=async()=>{
    await dispatch(fetchAllUsersData({ page: currentPage, query }))
}

fetchdata()
    },[dispatch,currentPage,query])
    const handleSearch = () => {
    dispatch(setQuery(search));
    dispatch(setPage(1));
  };
  const handlePageClick = (pageNum) => {
    dispatch(setPage(pageNum));
  };
   const handleDownloadCSV =()=>{
    if(!allUsersData || allUsersData?.length===0)
    {
        alert("No data to download");
    return;
    }

    const headers =[
    "Username",
    "Today",
    "Yesterday",
    "Total Tickets",
    "In Progress",
    "Completed",
    "Yet To Take",
    "Created At",
    "Updated At",
   ]
// Format each row in csv objects not supported
   const rows=allUsersData.map((user) => [
  user.username,
  user.today,
  user.yesterday,
  user.totalTickets,
  user.inProgress,
  user.completed,
  user.yetToTake,
  new Date(user.createdAt).toLocaleString(),
  new Date(user.updatedAt).toLocaleString(),
]);

  // Escape CSV values (wrap in quotes, replace quotes inside with double quotes)
  const escapeCSV = (text) =>
    `"${String(text).replace(/"/g, '""')}"`;

   const csvContent = [
    headers.map(escapeCSV).join(","), // header row
    ...rows.map((row) => row.map(escapeCSV).join(",")), // data rows
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `user-status-${new Date().toLocaleDateString()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
   }
const handleLogedout = async () => {
    await fetch("api/auth/setcookielogout", { method: 'POST', credentials: "include" });
    window.location.href = "/";
  };
   
    return(
        <>
        <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Admin DashBoard</h1>
        <div className="mx-auto">
            <div className="flex gap-3 mb-10">
            <input 
            type="text"
            placeholder="Search"
            className="border px-4 py-2 rounded w-72"
            value={search}
          onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-green-500 rounded px-4 py-2"
            onClick={handleSearch}
            >
                Search
            </button>
             <button className="bg-red-500 rounded text-white px-4 py-2"
            onClick={handleLogedout}
            >
                Logout
            </button>
        </div>
        <div className="flex flex-end">
                <button className="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                onClick={handleDownloadCSV }
                >
                    Download CSV
                </button>
            </div>
        </div>
        <div className="overflow-x-auto">
           
            <table className="bg-gray-200 table-auto w-full text-sm border border-gray-300 min-w-[1000px] border-collapse ">
                <thead className="bg-gray-200 border text-center">
<tr>
    <th className="border border-gray-400 p-2">Created Date</th>
    <th className="border border-gray-400 p-2">Updated Date</th>
    <th className="border border-gray-400 p-2">User Name</th>
    <th className="border border-gray-400 p-2">Today Content</th>
    <th className="border border-gray-400 p-2">Yesterday Content</th>
    <th className="border border-gray-400 p-2">Total Tickets</th>
    <th className="border border-gray-400 p-2">Completed Tickets</th>
    <th className="border border-gray-400 p-2">Inprogress Tickets</th>
    <th className="border border-gray-400 p-2">YetToTake Tickets</th>
    <th className="border border-gray-400 p-2">Action</th>
</tr>
</thead>
<tbody>
    {
        allUsersData?.length>0 ?(
<>
{
    allUsersData.map((val,i)=>(
        <tr key={i} className="text-center">
            <td className="border border-gray-400 p-2">{val.createdAt}.</td>
            <td className="border border-gray-400 p-2">{val.updatedAt}</td>
            <td className="border border-gray-400 p-2">{val.username}</td>
            <td className="border border-gray-400 p-2 break-words">{val.today}</td>
            <td className="border border-gray-400 p-2 break-words" >{val.yesterday}</td>
            <td className="border border-gray-400 p-2">{val.totalTickets}</td>
            <td className="border border-gray-400 p-2">{val.completed}</td>
            <td className="border border-gray-400 p-2">{val.inProgress}</td>
            <td className="border border-gray-400 p-2">{val.yetToTake}</td>
            <td className="border border-gray-400 p-2 "><button className="border bg-blue-500 rounded text-white px-4 py-2"
            onClick={()=>dispatch(selectedUserInfo(val))}
            >View</button></td>
        </tr>
    ))
}
</>
        ):(
            <>
            <tr>
        <td colSpan="7" className="text-center text-red-500 font-bold py-4 border border-gray-400">
          No Records
        </td>
      </tr>
            </>
        )
    }
</tbody>
            </table>
            <div className="flex justify-center items-center gap-2 mt-4">
  <button
    onClick={() => handlePageClick(currentPage - 1)}
    disabled={currentPage === 1}
    className={`px-3 py-1 rounded ${
      currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
    }`}
  >
    Previous
  </button>

  <span className="px-3 py-1 border rounded bg-white text-sm">
    Page {currentPage} of {totalPages}
  </span>

  <button
    onClick={() => handlePageClick(currentPage + 1)}
    disabled={currentPage === totalPages}
    className={`px-3 py-1 rounded ${
      currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
    }`}
  >
    Next
  </button>
</div>
        </div>
{
    selectedUserData &&(
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-xl w-[600px] max-h-[50vh] overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">User Info</h2>
      <p><strong>Username:</strong> {selectedUserData.username}</p>
      <p className="break-words"><strong>Today Work:</strong> {selectedUserData.today}</p>
      <p className="break-words"><strong>Yesterday Work:</strong> {selectedUserData.yesterday}</p>
      <p><strong>totalTickets:</strong> {selectedUserData.totalTickets}</p>
      <p><strong>completed:</strong> {selectedUserData.completed}</p>
      <p><strong>inProgress:</strong> {selectedUserData.inProgress}</p>
      <p><strong>yetToTake:</strong> {selectedUserData.yetToTake}</p>
      <p><strong>Created:</strong> {new Date(selectedUserData.createdAt).toLocaleString()}</p>
      <p><strong>Updated:</strong> {new Date(selectedUserData.updatedAt).toLocaleString()}</p>

      <div className="text-right mt-4">
        <button
          className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => dispatch(closedSelectedUserData())}
        >
          Close
        </button>
      </div>
    </div>
  </div>
    )
}
     
        </div>
        </>
    )
}