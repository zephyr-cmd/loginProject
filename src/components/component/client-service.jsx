import { DoctorIcon, StethoscopeIcon } from "@/app/_components/social";
import { Button } from "@/components/ui/button";
import { FileTextIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export function ClientService() {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 w-full gap-y-2 flex justify-center">
      <div className="p-6 bg-white rounded-lg w-full flex flex-col space-y-5 gap-5 justify-center items-center">
        <div className="pt-4">
          <h1 className="flex justify-center items-center text-center font-semibold">
            Sarvanjana Hospital is a 24/7 Multispecialty Hospital & Emergency
            Care Center based In Shyampur (Rishikesh), Uttrakhand With top-notch
            Medical & Surgical Specialties Supporting Patients.​
          </h1>
        </div>
        <div className="w-full px-1 rounded-sm flex items-center justify-center">
          <Link href={"/appointment"} aria-label="appointment">
            <Button variant="projectbtn" className="text-wrap p-2">
              <h2>Book Appointment</h2>
              {/* & Health Checkup Packages */}
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-5 justify-evenly md:gap-x-10 aspect-[7/2] w-full md:w-[70%]">
          <Link
            className="flex flex-col justify-center items-center p-2 bg-white rounded shadow-lg shadow-green-400/50 hover:shadow-green-400/80 border border-slate-200"
            aria-label="Lab Tests & Diagnostics"
            href={"/coming-soon"}
          >
            <FileTextIcon className="size-10 mb-5 " />
            <h3 className="text-center">Lab Tests & Diagnostics</h3>
          </Link>
          <Link
            className="flex flex-col justify-center items-center p-2 bg-white rounded shadow-lg shadow-green-400/50 hover:shadow-green-400/80 border border-slate-200"
            aria-label="Our Doctor's"
            href={"/our-doctors"}
          >
            <DoctorIcon className="size-10 mb-5" />
            <h3 className="text-center">Consult Doctor</h3>
          </Link>
          <Link
            className="flex flex-col justify-center items-center p-2 bg-white rounded shadow-lg shadow-green-400/50 hover:shadow-green-400/80 border border-slate-200"
            aria-label="Health Checkups"
            href={"/health-checkups"}
          >
            <StethoscopeIcon className="w-10 h-10 mb-5" />
            <h3 className="sm:hidden text-center">Health Checkups</h3>
            <h3 className=" hidden sm:block text-center">
              Popular Health Checkups
            </h3>
          </Link>
        </div>
        <div className="flex flex-col gap-y-2 md:flex-row justify-evenly w-full items-center">
          <p className="uppercase">Don&apos;t know which test to get</p>
          <Link
            aria-label="Call for Diagnostics Test "
            href={"tel:+911353152695"}
          >
            <Button variant="projectbtn">Call Us</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
