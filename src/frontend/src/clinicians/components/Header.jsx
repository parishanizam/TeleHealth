/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 22, 2025
 * Purpose: Page header for consistent page headings throughout the system
 */

import { useNavigate } from "react-router-dom";

import Logout from "../../assets/logout.svg";

export function Header({ title, showLogout = true }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("/api/clinicians/logout", { method: "POST" });
      await fetch("/api/parents/logout", { method: "POST" });

      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");

      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="relative flex justify-center items-center w-full text-slate-800 max-md:max-w-full">
      <div className="flex justify-center items-center w-full gap-2.5 py-5 text-6xl tracking-tight text-black leading-[64px] whitespace-nowrap max-md:text-4xl">
        {title}
      </div>

      {showLogout && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2 items-center text-base font-bold">
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
      )}
    </div>
  );
}
