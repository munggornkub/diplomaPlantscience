import { NavLink, useLocation } from "react-router-dom";
import { NAV_GROUPS } from "./navConfig";

export default function Sidebar() {
  const location = useLocation();
  const group = NAV_GROUPS.find(item => !item.solo && item.items.some(link => location.pathname.startsWith(link.to)));

  if (!group) return <aside className="sidebar sidebar-empty" aria-hidden="true" />;

  return (
    <aside className="sidebar">
      <section>
        <span className="sidebar-kicker">SECTION</span>
        <h2>{group.label}</h2>
        <p>{group.hint}</p>
        <nav aria-label={`เมนู${group.label}`}>
          {group.items.map((item, index) => (
            <NavLink key={item.to} to={item.to}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><strong>{item.label}</strong><small>{item.desc}</small></div>
            </NavLink>
          ))}
        </nav>
      </section>
    </aside>
  );
}
