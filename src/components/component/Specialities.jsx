import { CheckIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

function Specialities() {
  return (
    <section className="min-h-full w-full py-12 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-800 flex items-center justify-center">
      <div className="px-4 md:px-6">
        <p className="mb-12 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text text-center font-bold text-3xl sm:text-5xl lg:text-7xl leading-tight tracking-tighter">
          Our Specialities
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6 mt-8 md:gap-8 md:p-20">
          <Link href={"#"}>
            <div className="flex flex-col p-6 bg-white rounded-lg  justify-between border border-slate-200 ">
              <div className="flex flex-col justify-center items-center ">
                <div className="flex justify-center rounded-full overflow-hidden h-40 aspect-square text-zinc-600 dark:text-zinc-400">
                  <Image
                    src={
                      "https://unsplash.com/photos/M4Xloxsg0Gw/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fFBoeXNpY2lhbnN8ZW58MHx8fHwxNzExODEwOTE2fDA&force=true&w=1920"
                    }
                    height={"200"}
                    width={"200"}
                    style={{ objectFit: "cover" }}
                    alt="General Physician | Sarvanjana Hospital Rishikesh"
                  ></Image>
                </div>
                <h3 className="mt-7 text-2xl font-bold text-center">
                  General Physician
                </h3>
              </div>
            </div>
          </Link>
          <Link href={"#"}>
            <div className="flex flex-col p-6 bg-white rounded-lg  justify-between border border-slate-200 ">
              <div className="flex flex-col justify-center items-center ">
                <div className="flex justify-center rounded-full overflow-hidden h-40 aspect-square text-zinc-600 dark:text-zinc-400">
                  <Image
                    src={
                      "https://unsplash.com/photos/HWFR_Eke-6M/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8OHx8Z3luZWNvbG9naXN0fGVufDB8fHx8MTcxMTM1OTUyNnww&force=true&w=1920"
                    }
                    height={"200"}
                    width={"200"}
                    style={{ objectFit: "cover" }}
                    alt="Gynecology | Sarvanjana Hospital Rishikesh"
                  ></Image>
                </div>
                <h3 className="mt-7 text-2xl font-bold text-center">
                  Gynecology
                </h3>
              </div>
            </div>
          </Link>
          <Link href={"#"}>
            <div className="flex flex-col p-6 bg-white rounded-lg  justify-between border border-slate-200 ">
              <div className="flex flex-col justify-center items-center ">
                <div className="flex justify-center rounded-full overflow-hidden h-40 aspect-square text-zinc-600 dark:text-zinc-400">
                  <Image
                    src={
                      "https://unsplash.com/photos/W9YEY6G8LVM/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8ZGVudGFsfGVufDB8fHx8MTcxMTczOTIwOHww&force=true&w=1920"
                    }
                    height={"200"}
                    width={"200"}
                    alt="Dental Care | Sarvanjana Hospital Rishikesh"
                    style={{ objectFit: "cover" }}
                  ></Image>
                </div>
                <h3 className="mt-7 text-2xl font-bold text-center">
                  Dental Care
                </h3>
              </div>
            </div>
          </Link>
          <Link href={"#"}>
            <div className="flex flex-col p-6 bg-white rounded-lg  justify-between border border-slate-200 ">
              <div className="flex flex-col justify-center items-center ">
                <div className="flex justify-center rounded-full overflow-hidden h-40 aspect-square text-zinc-600 dark:text-zinc-400">
                  <Image
                    src={
                      "https://unsplash.com/photos/58Z17lnVS4U/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8QnJhaW58ZW58MHx8fHwxNzExODU5ODkzfDA&force=true&w=1920"
                    }
                    height={"200"}
                    width={"200"}
                    alt="Neurosciences | Sarvanjana Hospital Rishikesh"
                    style={{ objectFit: "cover" }}
                  ></Image>
                </div>
                <h3 className="mt-7 text-2xl font-bold text-center">
                  Neurosciences
                </h3>
              </div>
            </div>
          </Link>
          <Link href={"#"}>
            <div className="flex flex-col p-6 bg-white rounded-lg  justify-between border border-slate-200 ">
              <div className="flex flex-col justify-center items-center ">
                <div className="flex justify-center rounded-full overflow-hidden h-40 aspect-square text-zinc-600 dark:text-zinc-400">
                  <Image
                    src={
                      "https://unsplash.com/photos/ss1YP57gLbM/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8bGVnJTIwbWVufGVufDB8fHx8MTcxMTIyMTU1NHww&force=true&w=1920"
                    }
                    height={"200"}
                    width={"200"}
                    style={{ objectFit: "cover" }}
                    alt="orthopaedics | Sarvanjana Hospital Rishikesh"
                  ></Image>
                </div>
                <h3 className="mt-7 text-2xl font-bold text-center">
                  Orthopaedics
                </h3>
              </div>
            </div>
          </Link>
          <Link href={"#"}>
            <div className="flex flex-col p-6 bg-white rounded-lg  justify-between border border-slate-200 ">
              <div className="flex flex-col justify-center items-center ">
                <div className="flex justify-center rounded-full overflow-hidden h-40 aspect-square text-zinc-600 dark:text-zinc-400">
                  <Image
                    src={
                      "https://unsplash.com/photos/quaIM4h-u5E/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjJ8fGRlcm1hdG9sb2d5fGVufDB8fHx8MTcxMTIyMTgyN3ww&force=true&w=1920"
                    }
                    height={"200"}
                    width={"200"}
                    style={{ objectFit: "cover" }}
                    alt="Dermatology | Sarvanjana Hospital Rishikesh"
                  ></Image>
                </div>
                <h3 className="mt-7 text-2xl font-bold text-center">
                  Dermatology
                </h3>
              </div>
            </div>
          </Link>
          <Link href={"#"}>
            <div className="flex flex-col p-6 bg-white rounded-lg  justify-between border border-slate-200 ">
              <div className="flex flex-col justify-center items-center ">
                <div className="flex justify-center rounded-full overflow-hidden h-40 aspect-square text-zinc-600 dark:text-zinc-400">
                  <Image
                    src={
                      "https://unsplash.com/photos/i227dPHaQ7s/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzEyNTkwMzI4fA&force=true&w=1920"
                    }
                    height={"200"}
                    width={"200"}
                    style={{ objectFit: "cover" }}
                    alt="piles and fissures | Sarvanjana Hospital Rishikesh"
                  ></Image>
                </div>
                <h3 className="mt-7 text-2xl font-bold text-center">
                  Piles and Fissures
                </h3>
              </div>
            </div>
          </Link>
          <Link href={"#"}>
            <div className="flex flex-col p-6 bg-white rounded-lg  justify-between border border-slate-200 ">
              <div className="flex flex-col justify-center items-center ">
                <div className="flex justify-center rounded-full overflow-hidden h-40 aspect-square text-zinc-600 dark:text-zinc-400">
                  <Image
                    src={
                      "https://unsplash.com/photos/EQ-53WaTNC4/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fHBoeXNpb3RoZXJhcHl8ZW58MHx8fHwxNzExODA4MzAxfDA&force=true&w=1920"
                    }
                    height={"200"}
                    width={"500"}
                    style={{ objectFit: "cover" }}
                    alt="Best Physiotherapy | Sarvanjana Hospital Rishikesh"
                  ></Image>
                </div>
                <h3 className="mt-7 text-2xl font-bold text-center">
                  Physiotherapy
                </h3>
              </div>
            </div>
          </Link>
          <Link href={"#"}>
            <div className="flex flex-col p-6 bg-white rounded-lg  justify-between border border-slate-200 ">
              <div className="flex flex-col justify-center items-center ">
                <div className="flex justify-center rounded-full overflow-hidden h-40 aspect-square text-zinc-600 dark:text-zinc-400">
                  <Image
                    src={
                      "https://unsplash.com/photos/893qZckG6I4/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NzJ8fHlvZ2F8ZW58MHx8fHwxNzExODExMjA1fDA&force=true&w=1920"
                    }
                    height={"200"}
                    width={"500"}
                    style={{ objectFit: "cover" }}
                    alt="Yoga & Meditation | Sarvanjana Hospital Rishikesh"
                  ></Image>
                </div>
                <h3 className="mt-7 text-2xl font-bold text-center">
                  Yoga & Meditation
                </h3>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Specialities;
