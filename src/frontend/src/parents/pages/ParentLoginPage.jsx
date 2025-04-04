/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 21, 2025
 * Purpose: Displays ParentLoginPage and its content
 */

import React from "react";
import ParentLogin from "../components/ParentLogin";

function ParentLoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <ParentLogin />
    </div>
  );
}

export default ParentLoginPage;
