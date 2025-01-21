import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Landing
import LandingPage from '../landing/LandingPage';

// Parents
import ParentLoginPage from '../parents/pages/ParentLoginPage';
import ParentSignUpPage from '../parents/pages/ParentSignUpPage';
import ParentAccountConfirmationPage from '../parents/pages/ParentAccountConfirmationPage';
import ParentChecklistPage from '../parents/pages/ParentChecklistPage';
import TestSelectionPage from '../parents/pages/TestSelectionPage';

// Clinicians
import ClinicianLoginPage from '../clinicians/pages/ClinicianLoginPage';

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
    element: <ParentSignUpPage />,
  },
  {
    path: '/parents/parentaccountconfirmation',
    element: <ParentAccountConfirmationPage />,
  },
  {
    path: '/clinicians/login',
    element: <ClinicianLoginPage />,
  },
  {
    path: '/parents/checklist',
    element: <ParentChecklistPage />,
  },
  {
    path: '/parents/testselection',
    element: <TestSelectionPage />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
