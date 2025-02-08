import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Landing
import LandingPage from '../landing/LandingPage';

// Parents
import ParentLoginPage from '../parents/pages/ParentLoginPage';
import ParentSignupPage from '../parents/pages/ParentSignupPage';
import ParentAccountConfirmationPage from '../parents/pages/ParentAccountConfirmationPage';
import ParentChecklistPage from '../parents/pages/ParentChecklistPage';
import TestSelectionPage from '../parents/pages/TestSelectionPage';
import MediaTesting from '../parents/pages/MediaTesting';
import TestComplete from '../parents/pages/TestCompletePage';
import QuizManagement from '../parents/pages/QuizManagement';
import AssessmentTutorialPage from '../parents/pages/AssessmentTutorialPage';
import MediaTestingTutorialPage from '../parents/pages/MediaTestingTutorialPage';
import ParentChecklistPageTutorial from '../parents/pages/ParentCheckListTutorialPage';
import TestSelectionTutorialPage from '../parents/pages/TestSelectionTutorialPage';
import TutorialComplete from '../parents/pages/TutorialComplete';
import ParentHomePage from '../parents/pages/ParentHomePage';
import RepetitionQuestion from '../parents/pages/RepetitionQuestionPage';
import TestInstructions from '../parents/pages/TestInstructions';
import QuantifierQuestion from '../parents/pages/QuantifierQuestion';
import MatchingTutorialPage from '../parents/pages/MatchingTutorialPage';
import OverallTutorialPage from '../parents/pages/OverallTutorialPage';
import QuantifierTutorialPage from '../parents/pages/QuantifierTutorialPage';
import RepetitionTutorialPage from '../parents/pages/RepetitionTutorialPage';
// Clinicians
import ClinicianLoginPage from '../clinicians/pages/ClinicianLoginPage';
import BiasReviewPage from '../clinicians/pages/BiasReviewPage';
import ClientOverview from '../clinicians/pages/ClientOverview';
import ClinicianDashboard from '../clinicians/pages/ClinicianDashboard';
import ResultsAnalysisPage from '../clinicians/pages/ResultsAnalysisPage';
import AddClientPage from '../clinicians/pages/AddClientPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/parents/login',
    element: <ParentLoginPage />,
  },
  {
    path: '/parents/signup',
    element: <ParentSignupPage />,
  },
  {
    path: '/parents/parentaccountconfirmation',
    element: <ParentAccountConfirmationPage />,
  },
  {
    path: '/parents/ParentHomePage',
    element: <ParentHomePage />,
  },
  {
    path: '/parents/MediaTesting',
    element: <MediaTesting />,
  },
  {
    path: '/parents/checklist',
    element: <ParentChecklistPage />,
  },
  {
    path: '/parents/testselection',
    element: <TestSelectionPage />,
  },
  {
    path: '/parents/testcomplete',
    element: <TestComplete />,
  },
  {
    path: '/parents/QuizManagement',
    element: <QuizManagement />,
  },
  {
    path: '/parents/AssessmentTutorialPage',
    element: <AssessmentTutorialPage />,
  },
  {
    path: '/parents/MediaTestingTutorialPage',
    element: <MediaTestingTutorialPage />,
  },
  {
    path: '/parents/ParentChecklistPageTutorial',
    element: <ParentChecklistPageTutorial />,
  },
  {
    path: '/parents/TestSelectionTutorialPage',
    element: <TestSelectionTutorialPage />,
  },
  {
    path: '/parents/TutorialComplete',
    element: <TutorialComplete />,
  },
  {
    path: '/clinicians/login',
    element: <ClinicianLoginPage />,
  },
  {
    path: '/clinicians/BiasReviewPage',
    element: <BiasReviewPage />,
  },
  {
    path: '/clinicians/ClientOverview/:clientId',
    element: <ClientOverview />,
  },
  {
    path: '/clinicians/ClinicianDashboard',
    element: <ClinicianDashboard />,
  },
  {
    path: '/clinicians/ResultsAnalysisPage',
    element: <ResultsAnalysisPage />,
  },
  {
    path: '/clinicians/AddClientPage',
    element: <AddClientPage />,
  },
  {
    path: '/parents/RepetitionQuestionPage',
    element: <RepetitionQuestion />,
  },
  {
    path: '/parents/:testTypeInstructions',
    element: <TestInstructions />,
  },
  {
    path: '/parents/QuantifierQuestionPage',
    element: <QuantifierQuestion />,
  },
  {
    path: '/parents/OverallTutorialPage',
    element: <OverallTutorialPage />,
  },
  {
    path: '/parents/MatchingTutorialPage',
    element: <MatchingTutorialPage/>,
  },
  {
    path: '/parents/QuantifierTutorialPage',
    element: <QuantifierTutorialPage/>,
  },
  {
    path: '/parents/RepetitionTutorialPage',
    element: <RepetitionTutorialPage/>,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
