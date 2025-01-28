import AppRouter from './routes/index.jsx'
import ClientOverview from './clinicians/pages/ClientOverview.jsx'
import ClinicianDashboard from './clinicians/pages/ClinicianDashboard.jsx'
import ClinicianLoginPage from './clinicians/pages/ClinicianLoginPage.jsx'
import AddClientPage from "./clinicians/pages/AddClientPage"
import BiasReviewPage from "./clinicians/pages/BiasReviewPage"
import ResultsAnalysisPage from "./clinicians/pages/ResultsAnalysisPage"

function App() {
  // return <AddClientPage />
  // return <ClinicianLoginPage />
  // return <ClinicianDashboard />
  return <ClientOverview />
  // // return <AppRouter />
  // return <BiasReviewPage />
  // return <ResultsAnalysisPage />
}
export default App
