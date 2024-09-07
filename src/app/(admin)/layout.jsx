"use client";
import Sidebar from "@/components/ui/Sidebar";
import { AdminHeader } from "@/app/(admin)/_admin/adminHeader";
import { Suspense, useEffect, useMemo, useState } from "react";
import { LoadingModal } from "@/components/helper/loadingModal";
import MenuIcon from "@/components/ui/menuIcon";
import Link from "next/link";

function LayoutRoutesComponent({ children }) {
  const [role, setRole] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [sideBarOpen, setSideBarOpen] = useState(true);

  const toggleMenu = () => {
    setSideBarOpen((priv) => !priv);
  };
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  // console.log("L-15, sideBarOpen------------>", sideBarOpen);

  useEffect(() => {
    if (window.innerWidth < 640) {
      setSideBarOpen(false);
    }
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("role");
      if (storedRole) {
        setRole(storedRole);
      }
      const isDarkMode = localStorage.getItem("darkMode");
      // console.log("L-33, localStorage Dark Value------------>", isDarkMode);
      if (isDarkMode === "true") {
        setDarkMode(true);
      } else if (isDarkMode === "false") {
        setDarkMode(false);
      } else {
        localStorage.setItem("darkMode", false);
      }
    }
  }, []);

  const memoizedSidebar = useMemo(() => {
    return <Sidebar role={role} sideBarOpen={sideBarOpen} />;
  }, [role, sideBarOpen]);

  // console.log("L-46, darkMode------------>", darkMode);
  return (
    <div
      className={`${
        darkMode ? "dark" : ""
      } flex flex-col justify-between min-h-[100dvh]`}
    >
      {/* Menu Bar */}
      <header>
        <div
          className="flex fixed z-20 h-14 lg:h-[60px] items-center gap-4 w-full border-b bg-gray-100/70 px-6 dark:bg-white/90
         dark:text-white duration-700"
        >
          <div className="flex w-full justify-between items-center">
            {/* Menu Icon */}
            <div
              className={`flex items-center hover:rounded-lg hover:bg-gray-200/90 p-2.5 gap-2 cursor-pointer `}
              onClick={toggleMenu}
            >
              <div>
                <div className="w-2 h-0.5 bg-gray-800 dark:bg-white my-1 transition-transform duration-700"></div>
                <div className="w-3 h-0.5 bg-gray-800 dark:bg-white my-1 transition-transform duration-700"></div>
                <div className="w-5 h-0.5 bg-gray-800 dark:bg-white my-1 transition-transform duration-700"></div>
              </div>
              <div className="hidden sm:block">Menu</div>
            </div>
            <Link
              className="flex justify-center items-center font-semibold p-5"
              href="/"
            >
              <h1>Dashboard</h1>
            </Link>
            <div className="flex space-x-7 items-center ">
              <div className="hidden md:block mt-2">
                <label className="inline-flex items-center relative">
                  <input
                    className="peer hidden"
                    id="toggle"
                    type="checkbox"
                    checked={darkMode}
                    onChange={toggleDarkMode}
                  />
                  <div className="w-12 h-5 rounded-full ring-0 peer duration-500 outline-none bg-gray-200 overflow-hidden before:flex before:items-center before:justify-center after:flex after:items-center after:justify-center before:content-['☀️'] before:absolute before:h-4 before:w-4 before:top-1/2 before:bg-white before:rounded-full before:left-1 before:-translate-y-1/2 before:transition-all before:duration-700 peer-checked:before:opacity-0 peer-checked:before:rotate-90 peer-checked:before:-translate-y-full peer-checked:bg-[#383838] after:content-['🌑'] after:absolute after:bg-[#1d1d1d] after:rounded-full after:top-[3px] after:translate-y-1/2 after:right-1 after:w-4 after:h-4 after:opacity-0 after:transition-all after:duration-700 peer-checked:after:opacity-100 peer-checked:after:rotate-180 peer-checked:after:translate-y-0"></div>
                </label>
              </div>
              <AdminHeader />
            </div>
          </div>
        </div>
      </header>
      <Suspense fallback={<LoadingModal />}>
        <div className="flex min-h-[100dvh] relative dark:bg-black duration-700 ">
          {/* Side Bar */}
          {memoizedSidebar}
          <main className="flex-1 overflow-y-auto p-4 pt-16 w-full">
            {children}
          </main>
        </div>
      </Suspense>
    </div>
  );
}

export default LayoutRoutesComponent;
