'use client'

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import {
  createUserData,
  fetchUserData,
  updateUserData,
} from "@/reduxtoolkit/reducers/DailyStatus/dailyStatusReducer";

export default function UserFormPageDetails() {
  const { username } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const router = useRouter();

  const [form, setForm] = useState({
    yesterday: '',
    today: '',
    totalTickets: '',
    inProgress: '',
    completed: '',
    yetToTake: '',
    yesterdayDate: new Date().toISOString().split('T')[0],
    todayDate: new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState({});

  const { data, loading, limit, total } = useSelector((state) => state.user);
  const [editMode, setEditMode] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const recordsPerPage = 5;
  const totalPages = Math.ceil(total / recordsPerPage);

  useEffect(() => {
    if (username) {
      dispatch(fetchUserData({ username, page: currentPage, limit }));
    }
  }, [username, dispatch, currentPage,limit]);

  const validateForm = () => {
  const newErrors = {};
  if (!String(form.yesterday).trim()) newErrors.yesterday = 'This field is required';
  if (!String(form.today).trim()) newErrors.today = 'This field is required';
  if (!String(form.totalTickets).trim()) newErrors.totalTickets = 'This field is required';
  if (!String(form.inProgress).trim()) newErrors.inProgress = 'This field is required';
  if (!String(form.completed).trim()) newErrors.completed = 'This field is required';
  if (!String(form.yetToTake).trim()) newErrors.yetToTake = 'This field is required';
  return newErrors;
};

  const handleUserInformationFormSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = { username, ...form };
    try {
      const result = selectedEntry
        ? await dispatch(updateUserData({ id: selectedEntry._id, ...payload }))
        : await dispatch(createUserData(payload));

      if (
        (selectedEntry && updateUserData.fulfilled.match(result)) ||
        (!selectedEntry && createUserData.fulfilled.match(result))
      ) {
        setEditMode(false);
        setForm({
          yesterday: '',
          today: '',
          totalTickets: '',
          inProgress: '',
          completed: '',
          yetToTake: '',
          yesterdayDate: new Date().toISOString().split('T')[0],
          todayDate: new Date().toISOString().split('T')[0],
        });
        setSelectedEntry(null);
        setErrors({});
        dispatch(fetchUserData({ username, page: 1, limit }));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (entry) => {
    setForm({
      yesterday: entry.yesterday,
      today: entry.today,
      totalTickets: entry.totalTickets,
      inProgress: entry.inProgress,
      completed: entry.completed,
      yetToTake: entry.yetToTake,
      yesterdayDate: entry.yesterdayDate,
      todayDate: new Date().toISOString().split('T')[0],
    });
    setSelectedEntry(entry);
    setEditMode(true);
    setErrors({});
  };

  const handleLogedout = async () => {
    await fetch("api/auth/setcookielogout", { method: 'POST', credentials: "include" });
    window.location.href = "/UsersPage";
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-xl">
        {editMode ? (
          <form className="space-y-4" onSubmit={handleUserInformationFormSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">Yesterday Date</label>
              <input
                type="date"
                className="w-full border px-3 py-2 rounded"
                value={form.yesterdayDate}
                onChange={(e) => setForm({ ...form, yesterdayDate: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">What did you do yesterday?</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded"
                value={form.yesterday}
                onChange={(e) => setForm({ ...form, yesterday: e.target.value })}
              />
              {errors.yesterday && <p className="text-red-500 text-sm mt-1">{errors.yesterday}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Today Date</label>
              <input
                type="date"
                className="w-full border px-3 py-2 rounded"
                value={form.todayDate}
                onChange={(e) => setForm({ ...form, todayDate: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">What are you planning today?</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded"
                value={form.today}
                onChange={(e) => setForm({ ...form, today: e.target.value })}
              />
              {errors.today && <p className="text-red-500 text-sm mt-1">{errors.today}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium">Total Tickets</label>
                <input
                  type="number"
                  className="w-full border px-3 py-1 rounded spinner-button"
                  value={form.totalTickets}
                  onChange={(e) => setForm({ ...form, totalTickets: e.target.value })}
                />
                {errors.totalTickets && <p className="text-red-500 text-sm mt-1">{errors.totalTickets}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium">In Progress</label>
                <input
                  type="number"
                  className="w-full border px-3 py-1 rounded spinner-button"
                  value={form.inProgress}
                  onChange={(e) => setForm({ ...form, inProgress: e.target.value })}
                />
                {errors.inProgress && <p className="text-red-500 text-sm mt-1">{errors.inProgress}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium">Completed</label>
                <input
                  type="number"
                  className="w-full border px-3 py-1 rounded spinner-button"
                  value={form.completed}
                  onChange={(e) => setForm({ ...form, completed: e.target.value })}
                />
                {errors.completed && <p className="text-red-500 text-sm mt-1">{errors.completed}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium">Yet to Take</label>
                <input
                  type="number"
                  className="w-full border px-3 py-1 rounded spinner-button"
                  value={form.yetToTake}
                  onChange={(e) => setForm({ ...form, yetToTake: e.target.value })}
                />
                {errors.yetToTake && <p className="text-red-500 text-sm mt-1">{errors.yetToTake}</p>}
              </div>
            </div>

            <div className="flex gap-4">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
                Submit
              </button>
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded w-full"
                onClick={() => {
                  setEditMode(false);
                  setSelectedEntry(null);
                  setErrors({});
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div>
            <h2 className="text-xl font-bold text-blue-600 mb-4">
              {username}'s Daily Update
            </h2>
            <div className="flex justify-between">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={() => {
                  setForm({
                    yesterday: '',
                    today: '',
                    totalTickets: '',
                    inProgress: '',
                    completed: '',
                    yetToTake: '',
                    yesterdayDate: new Date().toISOString().split('T')[0],
                    todayDate: new Date().toISOString().split('T')[0],
                  });
                  setSelectedEntry(null);
                  setErrors({});
                  setEditMode(true);
                }}
              >
                Add Data
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={handleLogedout}
              >
                LogOut
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Table Display */}
      {!editMode && data?.length > 0 ? (
        <div className="mt-10 px-4 overflow-x-auto">
          <div className="mx-auto w-fit">
            <table className="min-w-[1000px] text-sm border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-center">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Tickets</th>
                  <th className="px-4 py-2">In Progress</th>
                  <th className="px-4 py-2">Completed</th>
                  <th className="px-4 py-2">Yet To Take</th>
                  <th className="px-4 py-2">Created</th>
                  <th className="px-4 py-2">Updated</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((entry) => (
                  <tr key={entry._id} className="text-center border-t">
                    <td className="px-4 py-2">{entry.username}</td>
                    <td className="px-4 py-2">{entry.totalTickets}</td>
                    <td className="px-4 py-2">{entry.inProgress}</td>
                    <td className="px-4 py-2">{entry.completed}</td>
                    <td className="px-4 py-2">{entry.yetToTake}</td>
                    <td className="px-4 py-2">{new Date(entry.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-2">{new Date(entry.updatedAt).toLocaleDateString()}</td>
                    <td className="px-4 py-2">
                      <button
                        className="bg-blue-600 text-white px-4 py-1 rounded"
                        onClick={() => handleEdit(entry)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5">
            <div className="w-fit mx-auto">
              <div className="flex justify-center mt-6 gap-2">
                {Array.from({ length: totalPages }, (_, index) => index + 1)
                  .filter((pageNum) => {
                    return (
                      pageNum === 1 ||
                      pageNum === 2 ||
                      pageNum === totalPages ||
                      pageNum === totalPages - 1 ||
                      Math.abs(pageNum - currentPage) <= 1
                    );
                  })
                  .reduce((acc, pageNum, index, arr) => {
                    if (index > 0 && pageNum - arr[index - 1] > 1) {
                      acc.push("dots");
                    }
                    acc.push(pageNum);
                    return acc;
                  }, [])
                  .map((item, idx) =>
                    item === "dots" ? (
                      <span key={`dots-${idx}`} className="px-2 py-1 text-gray-500">...</span>
                    ) : (
                      <button
                        key={item}
                        onClick={() => setCurrentPage(item)}
                        className={`px-3 py-1 rounded ${currentPage === item ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
                      >
                        {item}
                      </button>
                    )
                  )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        !editMode && (
          <div className="flex h-80 justify-center">
            <p className="block my-auto text-red-500 font-bold">No Records...</p>
          </div>
        )
      )}
    </>
  );
}
