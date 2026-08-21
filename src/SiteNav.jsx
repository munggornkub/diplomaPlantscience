import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { NAV_GROUPS } from "./navConfig";

export default function SiteNav() {
  const location = useLocation();
  const [openGroup, setOpenGroup] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    setOpenGroup(null);
  }, [location.pathname]);

  useEffect(() => {
    const close = event => {
      if (!navRef.current?.contains(event.target)) setOpenGroup(null);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);

  return <nav className="top-nav" aria-label="เมนูหลัก" ref={navRef}>
    {NAV_GROUPS.map(group => {
      if (group.solo) return <NavLink className="top-link" key={group.id} to={group.to} end={group.to === "/"}>{group.label}</NavLink>;
      const active = group.items.some(item => location.pathname.startsWith(item.to));
      const open = openGroup === group.id;
      return <div className={`nav-cluster${active ? " active" : ""}${open ? " open" : ""}`} key={group.id}>
        <button type="button" aria-expanded={open} onClick={() => setOpenGroup(open ? null : group.id)}>{group.label}<span aria-hidden="true">⌄</span></button>
        <div className="nav-dropdown" hidden={!open}>
          <p>{group.hint}</p>
          {group.items.map(item => <NavLink key={item.to} to={item.to}>
            <strong>{item.label}</strong><small>{item.desc}</small>
          </NavLink>)}
        </div>
      </div>;
    })}
  </nav>;
}
