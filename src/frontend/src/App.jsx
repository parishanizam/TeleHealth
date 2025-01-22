import React from 'react'
// import AppRouter from './routes/index.jsx'
import LandingPage from './landing/LandingPage'
import ClinicianLoginPage from './clinicians/pages/ClinicianLoginPage'
import ParentLoginPage from './parents/pages/ParentLoginPage'
import ParentSignupPage from './parents/pages/ParentSignupPage'
import ParentHomePage from './parents/pages/ParentHomePage'
import TutorialComplete from './parents/pages/TutorialComplete'
import TestSelectionTutorialPage from './parents/pages/TestSelectionTutorialPage'
import MediaTestingTutorialPage from './parents/pages/MediaTestingTutorialPage'
import ParentChecklistTutorialPage from './parents/pages/ParentCheckListTutorialPage'
import AssessmentTutorialPage from './parents/pages/AssessmentTutorialPage'
function App() {
  return <AssessmentTutorialPage/>
  // return <AppRouter />
}
export default App
