/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 21, 2025
 * Purpose: Displays ParentAccountConfirmationPage and its content
 */

import React from "react";
import ParentAccountConfirmation from "../components/ParentAccountConfirmation";

function ParentAccountConfirmationPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <ParentAccountConfirmation />
    </div>
  );
}

export default ParentAccountConfirmationPage;
