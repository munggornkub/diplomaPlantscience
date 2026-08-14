export function PageHead({ title, subtitle }) {
  return <header className="page-head"><p className="eyebrow">CURRICULUM GRAPH</p><h1>{title}</h1><p>{subtitle}</p></header>;
}

export function Section({ id, title, children }) {
  return <section id={id} className="content-section"><h2>{title}</h2>{children}</section>;
}
