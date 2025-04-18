/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 3, 2025
 * Purpose: Main app management, router, and recording management
 */

import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRouter from "./routes/index.jsx";
import { RecordingManagerProvider } from "./parents/helpers/RecordingManagerContext";

function App() {
  return (
      <RecordingManagerProvider>
        <AppRouter />
      </RecordingManagerProvider>
  );
}

export default App;