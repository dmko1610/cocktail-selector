import { NavLink } from "react-router-dom";

export default function Menu({ codes }: { codes: string[] }) {
  return (
    <nav className="menu">
      {codes.map((code) => (
        <NavLink
          key={code}
          to={`/${code}`}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          {code}
        </NavLink>
      ))}
    </nav>
  );
}
