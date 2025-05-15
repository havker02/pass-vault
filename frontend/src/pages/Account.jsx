import {useState, useEffect} from "react"
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"

const Account = () => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
  const checkAuth = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/v1/user/current-user`, {
          withCredentials: true
        })
        if (!response.status === 200) {
          navigate("/login")
        } else {
          setUser(response.data.user)
        }
      } catch (error) {
        navigate("/login")
      } finally {
        setIsLoading(false)
      }
    }
    checkAuth()
  }, [])

  if (isLoading) return null
  
  return (
    <div>Account</div>
  )
}

export default Account