import { CheckIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import Image from "next/image";
let { ServerURI } = process.env;
import Link from "next/link";

async function getData() {
  let res = "";
  try {
    res = await fetch(`${ServerURI}/api/v1/employee`);
    if (res) {
      return res.json();
    }
  } catch (error) {
    console.log("something went wrong ??", error);
    return res;
  }
}

async function Crew() {
  const data = await getData();
  // console.log("L-17, data--------------->", data);
  if (!Array.isArray(data.results)) {
    // Handle the case where data is not an array
    return (
      <div className="flex m-5 p-5 justify-center items-center">
        No employees to Display
      </div>
    );
  }
  return (
    <section className="min-h-full w-full pt-2 pb-12 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-800 flex items-center justify-center">
      <div className="px-4 md:px-6">
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6 mt-8 md:gap-8 md:p-20">
          {data.results.map((employee) => (
            <div
              key={employee._id}
              className="flex flex-col p-6 bg-white rounded-lg justify-between border border-slate-200"
            >
              <div className="flex flex-col justify-center items-center">
                <div className="flex justify-center rounded-full overflow-hidden h-40 aspect-square text-zinc-600 dark:text-zinc-400">
                  <Image
                    src={employee.profileImage}
                    height={200}
                    width={200}
                    style={{ objectFit: "cover" }}
                    alt={`Best ${employee?.specialization}'s  | Sarvanjana Hospital Rishikesh`}
                  />
                </div>
                <p className="mt-7 text-base font-bold text-center">
                  {employee.specialization}
                </p>
                <p className="mt-2 text-xl font-bold text-center text-cyan-700">
                  {employee?.name}
                </p>
                <p className="mt-1 text-base font-bold text-center">
                  {employee?.qualification}
                </p>
              </div>
            </div>
          ))}

          {/* <div className="flex flex-col p-6 bg-white rounded-lg  justify-between border border-slate-200 ">
            <div className="flex flex-col justify-center items-center ">
              <div className="flex justify-center rounded-full overflow-hidden h-40 aspect-square text-zinc-600 dark:text-zinc-400">
                <Image
                  src={
                    "https://unsplash.com/photos/M4Xloxsg0Gw/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTJ8fFBoeXNpY2lhbnN8ZW58MHx8fHwxNzExODEwOTE2fDA&force=true&w=1920"
                  }
                  height={"200"}
                  width={"200"}
                  style={{ objectFit: "cover" }}
                  alt=""
                ></Image>
              </div>
              <p className="mt-7 text-base font-bold text-center">
                General Physician
              </p>
              <p className="mt-2 text-xl font-bold text-center text-cyan-700">
                Dr. Taruna Chawdhary
              </p>
              <p className="mt-1 text-base font-bold text-center">MBBS</p>
            </div>
          </div>
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
                  alt=""
                ></Image>
              </div>
              <p className="mt-7 text-base font-bold text-center">
                Gynecologist
              </p>
              <p className="mt-2 text-xl font-bold text-center text-cyan-700">
                Dr. Renu Singh
              </p>
              <p className="mt-1 text-base font-bold text-center">MBBS, MS</p>
            </div>
          </div>
          <div className="flex flex-col p-6 bg-white rounded-lg  justify-between border border-slate-200 ">
            <div className="flex flex-col justify-center items-center ">
              <div className="flex justify-center rounded-full overflow-hidden h-40 aspect-square text-zinc-600 dark:text-zinc-400">
                <Image
                  src={
                    "https://unsplash.com/photos/58Z17lnVS4U/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8QnJhaW58ZW58MHx8fHwxNzExODU5ODkzfDA&force=true&w=1920"
                  }
                  height={"200"}
                  width={"200"}
                  alt=""
                  style={{ objectFit: "cover" }}
                ></Image>
              </div>
              <p className="mt-7 text-base font-bold text-center">
                Neurologist / Neurophysician
              </p>
              <p className="mt-2 text-xl font-bold text-center text-cyan-700">
                Dr. M. Singh
              </p>
              <p className="mt-1 text-base font-bold text-center">
                MBBS, MD, DM
              </p>
            </div>
          </div>
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
                  alt=""
                ></Image>
              </div>
              <p className="mt-7 text-base font-bold text-center">
                Orthopedic Surgeon
              </p>
              <p className="mt-2 text-xl font-bold text-center text-cyan-700 ">
                Dr. Gaurang Agrawal
              </p>
              <p className="mt-1 text-base font-bold text-center">MBBS, MS</p>
            </div>
          </div>
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
                  alt=""
                ></Image>
              </div>
              <p className="mt-7 text-base font-bold text-center">
                Dermatologist / Skin Specialists
              </p>
              <p className="mt-2 text-xl font-bold text-center text-cyan-700">
                Dr. Ankita
              </p>
              <p className="mt-1 text-base font-bold text-center">MBBS, DVDL</p>
            </div>
          </div>
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
                  alt=""
                ></Image>
              </div>
              <p className="mt-7 text-base font-bold text-center">
                Physiotherapy
              </p>
              <p className="mt-2 text-xl font-bold text-center text-cyan-700">
                Dr. Mahima
              </p>
              <p className="mt-1 text-base font-bold text-center">BPT</p>
            </div>
          </div>
          <div className="flex flex-col p-6 bg-white rounded-lg  justify-between border border-slate-200 ">
            <div className="flex flex-col justify-center items-center ">
              <div className="flex justify-center rounded-full overflow-hidden h-40 aspect-square text-zinc-600 dark:text-zinc-400">
                <Image
                  src={
                    "https://unsplash.com/photos/cguXr4imkks/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NHx8b3BodGhhbG1vbG9naXN0fGVufDB8fHx8MTcxMjU5MDEzNXww&force=true&w=1920"
                  }
                  height={"200"}
                  width={"500"}
                  style={{ objectFit: "cover" }}
                  alt=""
                ></Image>
              </div>
              <p className="mt-7 text-base font-bold text-center">
                Eye Surgeon
              </p>
              <p className="mt-2 text-xl font-bold text-center text-cyan-700">
                Dr. Sangeeta{" "}
              </p>
              <p className="mt-1 text-base font-bold text-center">M.Opt</p>
            </div>
          </div>
          <div className="flex flex-col p-6 bg-white rounded-lg  justify-between border border-slate-200 ">
            <div className="flex flex-col justify-center items-center ">
              <div className="flex justify-center rounded-full overflow-hidden h-40 aspect-square text-zinc-600 dark:text-zinc-400">
                <Image
                  src={
                    "https://unsplash.com/photos/W9YEY6G8LVM/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8ZGVudGFsfGVufDB8fHx8MTcxMTczOTIwOHww&force=true&w=1920"
                  }
                  height={"200"}
                  width={"200"}
                  alt=""
                  style={{ objectFit: "cover" }}
                ></Image>
              </div>
              <p className="mt-7 text-base font-bold text-centertext-cyan-700">
                Dental Surgeon
              </p>
              <p className="mt-2 text-xl font-bold text-center text-cyan-700">
                Dr. M Agrawal
              </p>
              <p className="mt-1 text-base font-bold text-center">
                Oral & Maxillo Facial Surgeon
              </p>
              <p className="mt-1 text-base font-bold text-center">BDS, MDS</p>
              <p className="mt-2 text-xl font-bold text-center text-cyan-700">
                Dr. Vijay Kumar
              </p>
              <p className="mt-1 text-base font-bold text-center">BDS</p>
            </div>
          </div>
          <div className="flex flex-col p-6 bg-white rounded-lg  justify-between border border-slate-200 ">
            <div className="flex flex-col justify-center items-center ">
              <div className="flex justify-center rounded-full overflow-hidden h-40 aspect-square text-zinc-600 dark:text-zinc-400">
                <Image
                  src={
                    "https://unsplash.com/photos/i227dPHaQ7s/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzEyNTkwMzI4fA&force=true&w=1920"
                  }
                  height={"200"}
                  width={"500"}
                  style={{ objectFit: "cover" }}
                  alt=""
                ></Image>
              </div>
              <p className="mt-7 text-base font-bold text-center">
                Piles & Fissure Specialists
              </p>
              <p className="mt-2 text-xl font-bold text-center text-cyan-700">
                Dr. Kuldeep
              </p>
              <p className="mt-1 text-base font-bold text-center">BAMS</p>
            </div>
          </div>
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
                  alt=""
                ></Image>
              </div>
              <p className="mt-7 text-base font-bold text-center">
                Yoga & Meditation
                <br />
                Yogacharya
              </p>
              <p className="mt-2 text-xl font-bold text-center text-cyan-700">
                Ms. Anjali Uniyal
              </p>
              <p className="mt-1 text-base font-bold text-center">MA Yoga</p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default Crew;
