import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="w-full flex justify-between items-center p-4 border-b border-slate-400 h-16 z-50 bg-base-100 shadow-sm">
      <NavLink to="/" className={"font-bold text-2xl text-primary"}>
        CitySearch
      </NavLink>
      <NavLink to="/cities" className={"font-semibold text-secondary"}>
        Search Cities
      </NavLink>
    </nav>
  );
};

export default Nav;
