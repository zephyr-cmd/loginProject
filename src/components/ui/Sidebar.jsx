"use client";
import { useEffect, useMemo, useState } from "react";
import { ExpandSideBarIcon, EmployeeIcon } from "@/components/icons/icons";
import {
  HomeIcon,
  LandmarkIcon,
  LineChartIcon,
  UsersIcon,
} from "@/components/icons/icons2";
// import { AppointmentIcon, DoctorIcon } from "@/app/_components/social";
import { AppointmentIcon, DoctorIcon } from "@/components/icons/social";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Sidebar({ className, role, sideBarOpen }) {
  const [sideBarCollapse, setSideBarCollapse] = useState();
  const sideBarCollapseFunc = () => {
    // setSideBarCollapse(!sideBarCollapse);
    setSideBarCollapse((prev) => !prev);
  };
  const pathName = usePathname();

  const tabs = useMemo(() => {
    if (role === "admin") {
      return [
        { name: "home", logo: HomeIcon },
        { name: "appointment", logo: AppointmentIcon },
        { name: "customers", logo: DoctorIcon },
        { name: "free-opinion", logo: UsersIcon },
        { name: "employees", logo: EmployeeIcon },
        { name: "analytics", logo: LineChartIcon },
        { name: "finances", logo: LandmarkIcon },
        // { name: "admin", logo: AdminIcon },
      ];
    } else if (role === "editor") {
      return [
        { name: "home", logo: HomeIcon },
        { name: "appointment", logo: AppointmentIcon },
        { name: "customers", logo: DoctorIcon },
        // { name: "analytics", logo: LineChartIcon },
        // { name: "editor", logo: EditorIcon },
      ];
    } else {
      return [
        { name: "home", logo: HomeIcon },
        // { name: "appointment", logo: AppointmentIcon },
        // { name: "customers", logo: DoctorIcon },
      ];
    }
  }, [role]);

  useEffect(() => {
    setSideBarCollapse(sideBarOpen);
    sideBarCollapseFunc();
  }, [sideBarOpen]);

  // useEffect(() => {
  //   const handleLinkClick = (screenWidth) => {
  //     if (screenWidth < 640) {
  //       // Tailwind's `sm` breakpoint is 640px
  //       sideBarCollapseFunc();
  //     }
  //   };
  //   const handleResize = () => {
  //     const screenWidth = window.innerWidth;
  //     // console.log("L-60, handleLinkClick----------->", screenWidth);
  //     handleLinkClick(screenWidth);
  //   };
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  return (
    <>
      <aside
        className={`flex items-center fixed sm:relative transition-all ease-in-out border-r-2 z-10 mt-14 lg:mt-[60px] h-full sm:h-auto bg-white sm:bg-gray-100/40 dark:bg-black duration-700 ${
          sideBarCollapse === true ? "w-[0%]" : "w-[100%] sm:w-[25%] lg:w-[15%]"
        } ${className}`}
      >
        {/* <span onClick={sideBarCollapseFunc}>
          <ExpandSideBarIcon
            className={` z-50 absolute size-10 sm:size-[3dvw] top-1/2 right-[-40px] transition-all ease-in-out duration-1000 ${
              sideBarCollapse ? "rotate-180" : "rotate-0"
            }`}
          />
        </span> */}
        <ul
          className={`flex flex-col justify-start items-start h-[100%] w-full gap-y-2 pt-4 p-5 transition-all ease-in-out  duration-700 origin-left ${
            sideBarCollapse ? "scale-x-0" : "scale-x-100"
          }`}
        >
          {tabs.map((tab, index) => (
            <Link
              key={index}
              href={`/dashboard/${tab.name}`}
              onClick={() => {
                if (window.innerWidth < 640) {
                  // Tailwind's `sm` breakpoint is 640px
                  sideBarCollapseFunc();
                }
              }}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-white dark:hover:text-blue-600 cursor-pointer link ${
                pathName === `/dashboard/${tab.name}`
                  ? "bg-zinc-500 text-gray-900"
                  : ""
              }`}
            >
              <tab.logo className="w-[15%] mx-2" />
              <span>
                {tab.name.charAt(0).toUpperCase() + tab.name.slice(1)}
              </span>
            </Link>
          ))}
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;
