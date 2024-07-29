import { NavLink } from "react-router-dom"

const Nav = () => {
    return (
        <nav className="w-full flex justify-between items-center p-4 border-b border-slate-400 h-16 z-50 fixed">
            <NavLink to="/">CitySearch</NavLink>
            <NavLink to="/cities">Search Cities</NavLink>
        </nav>
    )
}

export default Nav