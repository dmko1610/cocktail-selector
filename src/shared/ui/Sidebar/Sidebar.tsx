import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';

export default function Sidebar({ codes }: { codes: string[] }) {
  return (
    <aside className={styles.sidebar}>
      {codes.map((code) => (
        <NavLink
          key={code}
          to={`/${code}`}
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          {code[0].toUpperCase() + code.slice(1)}
        </NavLink>
      ))}
    </aside>
  );
}
