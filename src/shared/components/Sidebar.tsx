import { NavLink } from 'react-router-dom';

export default function Sidebar({ codes }: { codes: string[] }) {
  return (
    <aside className="sidebar">
      {codes.map((code) => (
        <NavLink
          key={code}
          to={`/${code}`}
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          {code[0].toUpperCase() + code.slice(1)}
        </NavLink>
      ))}
    </aside>
  );
}
