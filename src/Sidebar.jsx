import { NavLink } from "react-router-dom";
import { NAV_GROUPS, groupItems } from "./navConfig";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {NAV_GROUPS.map((group) => (
        <section key={group.id}>
          <h2>{group.label}</h2>
          <p>{group.hint}</p>
          {groupItems(group).map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/"}>
              <strong>{item.label}</strong>
              <small>{item.desc}</small>
            </NavLink>
          ))}
        </section>
      ))}
    </aside>
  );
}
