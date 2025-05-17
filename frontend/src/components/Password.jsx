import { useState } from "react";
import axios from "axios"

const Password = () => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const changeOldPassword = (e) => {
    setOldPassword(e.target.value);
  };

  const changeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const changePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseUrl}/api/v1/user/change-password`,
        {
          oldPassword,
          newPassword,
        },
        {
          withCredentials: true,
        },
      );
      if (response.status === 200) {
        alert("Password changed successfully");
      }
    } catch (error) {
      alert("Password change failed"+error.message);
    }
  };

  return(
      <form onSubmit={(e) => changePassword(e)}>
        <div className="mb-5">
          <label
            htmlFor="old-password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Change password
          </label>
          <input
            type="password"
            id="old-password"
            name="oldPassword"
            className="my-4 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-slate-400"
            placeholder="Previous password"
            required
            value={oldPassword}
            onChange={(e) => changeOldPassword(e)}
          />

          <input
            type="password"
            name="newPassword"
            className="my-4 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-slate-400"
            placeholder="New password"
            required
            value={newPassword}
            onChange={(e) => changeNewPassword(e)}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 outline-none rounded-lg text-md sm:w-auto px-4 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Update password
        </button>
      </form>
    )
}

export default Password