/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 21, 2025
 * Purpose: Displays ClinicianLoginPage and its content
 */

import React from "react";
import ClinicianLogin from "../components/Login/ClinicianLogin";

function ClinicianLoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <ClinicianLogin />
    </div>
  );
}

export default ClinicianLoginPage;
