import { Routes, Route } from "react-router-dom";
import SiteNav from "./SiteNav";
import Home from "./pages/Home";
import Structure from "./pages/Structure";
import Courses from "./pages/Courses";
import Plan from "./pages/Plan";
import Graph from "./pages/Graph";
import Faculty from "./pages/Faculty";
import OBE from "./pages/OBE";
import StakeholderNeeds from "./pages/StakeholderNeeds";
import Benchmark from "./pages/Benchmark";
import LabourMarketBenchmark from "./pages/LabourMarketBenchmark";
import PLO from "./pages/PLO";
import YLO from "./pages/YLO";
import CLO from "./pages/CLO";
import Teaching from "./pages/Teaching";
import Assessment from "./pages/Assessment";
import KSAPedagogy from "./pages/KSAPedagogy";
import Careers from "./pages/Careers";
import Jobs from "./pages/Jobs";
import Refs from "./pages/Refs";
import DetailPage from "./pages/DetailPage";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="site-shell">
      <header className="site-header"><a className="brand" href="/"><span className="brand-mark">PS</span><span className="brand-copy"><strong>PLANT SCIENCE</strong><small>DIPLOMA PROGRAM</small></span></a><SiteNav /></header>
      <div className="layout">
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/structure" element={<Structure />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/plan" element={<Plan />} />
            <Route path="/graph" element={<Graph />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/obe" element={<OBE />} />
            <Route path="/sh-needs" element={<StakeholderNeeds />} />
            <Route path="/benchmark" element={<Benchmark />} />
            <Route path="/labour-market" element={<LabourMarketBenchmark />} />
            <Route path="/plo" element={<PLO />} />
            <Route path="/ylo" element={<YLO />} />
            <Route path="/clo" element={<CLO />} />
            <Route path="/teaching" element={<Teaching />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/ksa-pedagogy" element={<KSAPedagogy />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/refs" element={<Refs />} />
            <Route path="/structure/:id" element={<DetailPage title="โครงสร้างหลักสูตร" />} />
            <Route path="/plo/:id" element={<DetailPage title="PLO" />} />
            <Route path="/ylo/:id" element={<DetailPage title="YLO" />} />
            <Route path="/courses/:code" element={<DetailPage title="รายวิชา" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
