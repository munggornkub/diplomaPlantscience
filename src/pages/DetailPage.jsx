import { useParams } from "react-router-dom";
import PageTemplate from "./PageTemplate";

export default function DetailPage({ title }) {
  const params = useParams();
  const value = params.id ?? params.code;
  return <PageTemplate title={`${title}: ${value}`} step="N" />;
}
