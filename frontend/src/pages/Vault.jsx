import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";

const Vault = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/current-user`,
          {
            withCredentials: true,
          },
        );
        if (!response.data.success) {
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
    <div>
      <div className="flex justify-between mx-4 mt-4">
        <Link to="/">
          <h1 className="text-3xl font-bold text-slate-600">Vault</h1>
        </Link>
        <Link to="/account">
          <button className="rounded-full">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <span className="text-white text-2xl">
                {user?.userName[0].toUpperCase()}
              </span>
            )}
          </button>
        </Link>
      </div>
      <h4 className="flex items-center gap-1 mt-12 px-4">
        <IoMdLock size={20} />
        Passwords
      </h4>
    </div>
  );
};

export default Vault;
