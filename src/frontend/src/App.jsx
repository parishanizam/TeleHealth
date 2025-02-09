// src/App.jsx
import React from "react";
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