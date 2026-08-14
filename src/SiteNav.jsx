import { NavLink } from "react-router-dom";
import { NAV_GROUPS, groupItems } from "./navConfig";

export default function SiteNav() {
  return (
    <nav className="top-nav" aria-label="เมนูหลัก">
      {NAV_GROUPS.map((group) => (
        <div className="nav-group" key={group.id}>
          <span>{group.label}</span>
          <div className="nav-menu">
            {groupItems(group).map((item) => (
              <NavLink key={item.to} to={item.to}>{item.label}</NavLink>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}
