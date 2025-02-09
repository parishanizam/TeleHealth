import React from "react";
import { useNavigate } from "react-router-dom";
import Globe from "../../assets/globe.svg";
import Logout from "../../assets/logout.svg";

export function Header({ title }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("/api/clinicians/logout", { method: "POST" });
      await fetch("/api/parents/logout", { method: "POST" });

      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");  // Clear authentication data
      
      navigate("/");       // Redirect to Landing Page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex flex-wrap gap-5 justify-between items-start w-full text-slate-800 max-md:max-w-full">
      <button className="flex flex-col items-center">
          <img
            loading="lazy"
            src={Globe}
            className="object-contain aspect-square fill-slate-800 w-[25px]"
            alt="Language"
          />
          <div>EN</div>
        </button>
      <div className="gap-2.5 self-stretch py-5 text-6xl tracking-tight text-center text-black leading-[64px] whitespace-nowrap max-md:text-4xl">
        {title}
      </div>
      <div className="flex gap-10 items-center py-2.5 text-base font-bold leading-none text-center whitespace-nowrap w-[50px]">        
        <button onClick={handleLogout} className="flex flex-col items-center">
          <img
            loading="lazy"
            src={Logout}
            className="object-contain aspect-square fill-slate-900 w-[25px]"
            alt="Logout"
          />
          <div>Logout</div>
        </button>
      </div>
    </div>
  );
}
