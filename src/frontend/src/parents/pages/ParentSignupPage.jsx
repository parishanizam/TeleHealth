/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 21, 2025
 * Purpose: Displays ParentSignupPage and its content
 */

import React from "react";
import ParentSignUp from "../components/ParentSignup";

function ParentSignupPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <ParentSignUp />
    </div>
  );
}

export default ParentSignupPage;
