import Graph from "../components/ClientOverview/Graph";
import { Results } from "../components/ClientOverview/Results";
import { Header } from "../components/Header";
// import ClinicianHeader from "../components/Header/ClinicianHeader";

function ClientOverview() {
  return (
    <div className="flex flex-col h-screen">
    {/* Header */}
    <Header title="Mitchell Weingust - Overview" />

    {/* Main Content: Graph and Results */}
    <div className="grid grid-cols-3 flex-grow">
      <Graph />
      <Results />
    </div>
  </div>
);
}

export default ClientOverview;
