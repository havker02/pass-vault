import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Avatar from "../components/Avatar"
import Password from "../components/Password"
import { TbLogout } from "react-icons/tb";
import { GiReturnArrow } from "react-icons/gi";

const Account = () => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const logoutUser = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/v1/user/logout`,
        {},
        {
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/v1/user/current-user`,
          {
            withCredentials: true,
          },
        );
        if (!response.status === 200) {
          navigate("/login");
        } else {
          setUser(response.data.user);
        }
      } catch (error) {
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (isLoading) return null;

  return (
    <div className="h-screen w-full px-4 mt-2">
      
<Link to="/" className="flex items-center text-lg gap-2 cursor-pointer w-1/4">
  <GiReturnArrow /> Home
</Link>
      
      <h1 className="mt-4 text-3xl font-bold text-center">Account</h1>
      
      <div className="bg-slate-300 p-4 py-8 mt-4 rounded-md shadow-lg shadow-zinc-400">
        <Password />
      </div>

      
      <div className="flex justify-center mt-12">
        <Avatar />
      </div>
      
      <div className="mt-14 flex items-center justify-center">
      
      <button
        onClick={logoutUser}
        className="gap-4 flex text-lg justify-center items-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 outline-none font-medium rounded-full text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
      >
        <TbLogout style={{ color: "zinc", fontSize: "1.5rem" }} /> Logout
      </button>
      </div>

      
    </div>
  );
};

export default Account;
