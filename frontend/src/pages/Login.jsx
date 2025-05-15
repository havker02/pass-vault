import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const Login = () => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const formAction = `${baseUrl}/api/v1/user/login`;

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/v1/user/current-user`, {
          withCredentials: true
        })
        if(response.status === 200) {
          navigate("/")
        } else {
          setIsLoading(false)
        }
      } catch (error) {
        setIsLoading(false)
      }
    }
    checkAuth()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(formAction, formData, {
        withCredentials: true,
      });
      if (response.data.success) {
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (isLoading) return null

  return (
    <div className="h-screen w-full px-4">
      <h1 className="mt-16 text-2xl text-center">Login your account</h1>
      <form onSubmit= {(e) => handleSubmit(e)} 
        className="bg-slate-200 rounded-lg shadow-md shadow-zinc-400 p-6 mt-12 max-w-sm mx-auto">
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-slate-400"
            placeholder="name@example.com"
            required
            value={formData.email}
            onChange={(e)=> handleChange(e)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={(e)=> handleChange(e)}
            placeholder="Enter your password"
            className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-slate-400"
            required
          />
        </div>
        <div className="mt-4 text-center">
          <p>
            Don't have an account? <Link to="/register" className="text-blue-600">Register</Link>
          </p>
        </div>
        <button
          type="submit"
          className="mt-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
