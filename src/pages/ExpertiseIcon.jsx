const drawings = {
  flower: <><circle cx="12" cy="12" r="2.4"/><path d="M12 9c-1-4 3-5 4-2 .5 1-.3 2.4-2 3M15 12c4-1 5 3 2 4-1 .5-2.4-.3-3-2M12 15c1 4-3 5-4 2-.5-1 .3-2.4 2-3M9 12c-4 1-5-3-2-4 1-.5 2.4.3 3 2"/></>,
  seed: <><path d="M5 15c0-6 5-10 14-10 0 9-4 14-10 14-2.2 0-4-1.8-4-4Z"/><path d="M7 17c2-4 5-7 9-9"/></>,
  hydroponic: <><path d="M5 12h14l-2 7H7l-2-7Z"/><path d="M12 12V7M12 9c-3 0-4-2-4-4 3 0 4 1 4 4Zm0-2c1-2 2-3 5-3 0 2-1 4-5 4"/><path d="M8 16h8"/></>,
  physiology: <><path d="M5 14c0-6 5-10 14-10 0 9-4 14-10 14"/><path d="m4 18 4-4 2 2 2-4 2 2 4-5"/></>,
  fertilizer: <><path d="M9 3h6M10 3v5l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/><path d="M7 15h10M10 12h4"/></>,
  soil: <><path d="M3 7h18M3 12h18M3 17h18"/><path d="m6 9 2 1 2-1m5 5 2 1 2-1M8 19l2 1 2-1"/></>,
  fertility: <><path d="M4 16h16M5 20h14M12 16V9"/><path d="M12 11c-4 0-5-3-5-5 4 0 5 2 5 5Zm0-2c1-3 3-4 6-4 0 3-2 6-6 6"/></>,
  soilTest: <><path d="M5 18h14M7 18V9h10v9"/><circle cx="12" cy="9" r="4"/><path d="m12 9 2-2M9 13h6"/></>,
  cassava: <><path d="M12 12V6M12 7 8 4M12 8l4-4M12 6l-1-3M12 12c-2 2-4 4-3 8 2 0 3-2 3-4 0 2 1 4 3 4 1-4-1-6-3-8Z"/></>,
  irrigation: <><path d="M3 12h8V7h5M16 5v4"/><path d="M14 12c0 2 2 4 2 6a2 2 0 0 1-4 0c0-2 2-4 2-6m6 1c0 1.5 1.5 3 1.5 4.5"/></>,
  community: <><circle cx="12" cy="7" r="3"/><circle cx="5" cy="11" r="2"/><circle cx="19" cy="11" r="2"/><path d="M7 20v-2a5 5 0 0 1 10 0v2M2 20v-2a3 3 0 0 1 4-3m16 5v-2a3 3 0 0 0-4-3"/></>,
  sugarcane: <><path d="M10 21V4M14 21V3M10 8h4M10 13h4M10 18h4"/><path d="M10 7C6 7 5 4 5 2c3 0 5 2 5 5Zm4 3c4 0 5-3 5-5-3 0-5 2-5 5Z"/></>,
  breeding: <><path d="M7 3c0 6 10 12 10 18M17 3C17 9 7 15 7 21M9 6h6M8 11h8M8 16h8"/></>,
  precision: <><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3"/></>,
  drone: <><path d="M8 11h8l2 4H6l2-4Z"/><path d="M8 11 5 7m11 4 3-4M3 7h5m8 0h5M12 15v4m-2 0h4"/><circle cx="5" cy="7" r="2"/><circle cx="19" cy="7" r="2"/></>,
  research: <><path d="M4 20V10m5 10V5m5 15v-7m5 7V3"/><path d="m3 8 5-4 5 6 7-8"/></>,
  production: <><path d="M4 19h16M7 19v-5m5 5V9m5 10v-7"/><path d="M12 10c-3 0-4-2-4-4 3 0 4 2 4 4Zm0-2c1-3 3-4 6-4 0 3-2 6-6 6"/></>,
  standards: <><path d="M4 7h16v12H4V7Zm3-3h10v3"/><path d="m8 13 2.5 2.5L16 10"/></>,
  smartFarm: <><path d="M5 20h14M8 20v-6h8v6M12 14V9"/><path d="M8 7a6 6 0 0 1 8 0M10 10a3 3 0 0 1 4 0"/><circle cx="12" cy="12" r="1"/></>,
  disease: <><circle cx="12" cy="12" r="7"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2m0-14-2 2M7 17l-2 2"/><circle cx="10" cy="10" r="1"/><circle cx="14" cy="14" r="1"/></>,
  pest: <><path d="M8 9a4 4 0 0 1 8 0v7a4 4 0 0 1-8 0V9Z"/><path d="M12 5V2M8 7 5 5m11 2 3-2M8 11H3m13 0h5M8 16H4m12 0h4M12 9v10"/></>,
  pesticide: <><path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z"/><path d="M12 8c0 2-2 3.5-2 5a2 2 0 0 0 4 0c0-1.5-2-3-2-5Z"/></>,
  biocontrol: <><circle cx="12" cy="12" r="8"/><path d="M5 15h14M8 11c2-4 6-4 8 0-2 3-6 4-8 0Z"/><path d="m10 12 4-2"/></>,
};

export function ExpertiseIcon({ name, label }) {
  return (
    <span className={`expertise-icon expertise-${name}`} title={label} aria-label={label} role="img">
      <svg viewBox="0 0 24 24" aria-hidden="true">{drawings[name]}</svg>
    </span>
  );
}
