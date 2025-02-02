// src/components/ConsentForm.jsx

import React from 'react';

export default function ConsentForm({ onConsent, onDecline }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        {/* Title */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold">Recording Consent</h2>
        </div>

        {/* Text */}
        <div className="mb-6 text-center text-xl leading-8">
          We kindly ask for your consent to record
          <br />
          video and audio. This recording may be
          <br />
          used for analyzing responses and
          <br />
          ensuring the quality of the assessment.
          <br />
          Your data will be handled securely, only
          <br />
          viewable by your clinician and used
          <br />
          solely for the purpose outlined above.
          <br /><br />
          Do you consent to the recording of
          <br />
          video and audio for this assessment?
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={onConsent}
            className="w-full sm:w-auto px-6 py-3 bg-slate-900 text-white rounded-lg text-xl hover:bg-slate-800 transition"
          >
            I consent
          </button>
          <button 
            onClick={onDecline}
            className="w-full sm:w-auto px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg text-xl hover:bg-blue-50 transition"
          >
            I do not consent
          </button>
        </div>
      </div>
    </div>
  );
}
