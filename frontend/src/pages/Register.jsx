import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios"

const Signup = () => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
const formAction = `${baseUrl}/api/v1/user/register`;

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true)

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(formAction, formData)
      
      if(response.status === 201){
        navigate("/")
      }
      
      console.log(response)
      setFormData({
        userName: "",
        email: "",
        password: ""
      })
    } catch (error) {
      alert("User registration failed "+error.message)
    }
  }

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

  if (isLoading) return null

  return (
    <div className="h-screen w-full px-4 py-8">
      <h1 className="mt-6 text-2xl text-center mb-8">Create new account</h1>
      <form onSubmit={(e)=> handleSubmit(e)}
        className="max-w-sm mx-auto shadow-md shadow-zinc-400 bg-slate-200 p-8 rounded-lg">
        <div className="mb-5">
          <label
            htmlFor="userName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your user name
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value= {formData.userName}
            onChange= {(e)=> handleChange(e)}
            placeholder="Enter username..."
            className="outline-none shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light placeholder:text-slate-400"
            required
          />
        </div>
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
            value= {formData.email}
            onChange= {(e)=> handleChange(e)}
            placeholder="name@example.com"
            className="outline-none shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light placeholder:text-slate-400"
            required
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
            value= {formData.password}
            onChange= {(e)=> handleChange(e)}
            placeholder="Enter password..."
            className="outline-none shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light placeholder:text-slate-400"
            required
          />
        </div>
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
            />
          </div>
          <label
            htmlFor="terms"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            I agree with the{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              terms and conditions
            </a>
          </label>
        </div>
        <div className="text-center mb-4">
          <p>Already have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register new account
        </button>
      </form>
    </div>
  );
};

export default Signup;
