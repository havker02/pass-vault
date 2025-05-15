import { NavLink } from "react-router-dom"

const Navbar = () => {
  return (
    <div>
      <nav className="text-white bg-zinc-500 h-14 flex justify-end">
        <ul className="flex gap-3 mr-2 h-full">
          <li className="flex items-center h-full">
            <NavLink to="/">HOME</NavLink>
          </li>
          <li className="flex items-center h-full">
            <NavLink to="/contact">CONTACT</NavLink>
          </li>
            <li className="flex items-center h-full">
            <NavLink to="/account">ACCOUNT</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar