import { Button } from "@/components/ui/button";

export function PlanCard() {
  return (
    <section className="min-h-screen w-full py-12 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-800">
      <p className="mb-12 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text text-center font-bold text-3xl sm:text-5xl lg:text-7xl leading-tight tracking-tighter">
        Health Plans
      </p>
      <div className=" flex items-center justify-center">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3 md:gap-8">
            <div className="flex flex-col p-6 bg-white  rounded-lg dark:bg-zinc-850 justify-between border border-slate-200 dark:border-slate-800">
              <div>
                <p className="text-xl font-bold text-center">Diabetes - M3</p>
                <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                  <span className="text-lg font-bold line-through">
                    MRP &#8377; 1400
                  </span>
                  <span className="text-xl font-bold text-blue-700">
                    &nbsp; Special Price :
                  </span>
                  <span className="text-2xl font-bold">&nbsp; &#8377; 850</span>
                </div>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    Blood Sugar - Fasting
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    Post Prandial
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    Random Blood Sugar
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    Urea
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    Creatinine
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    Lipid Profile
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    HbA1c : hemoglobin A1C
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    Urine Routine
                  </li>
                </ul>
              </div>
              <div className="mt-6">
                <Button variant="projectbtn" className="w-full">
                  Book Now
                </Button>
              </div>
            </div>
            <div className="relative flex flex-col p-6 bg-white shadow-lg shadow-cyan-500/50  rounded-lg dark:bg-zinc-850 justify-between border border-slate-200 dark:border-slate-800">
              <div className="px-3 py-1 text-sm text-white bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 rounded-full inline-block absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                Popular
              </div>
              <div>
                <p className="text-xl font-bold text-center">
                  Full Body Check-Up (80 Parameters)
                </p>
                <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                  <span className="text-lg font-bold line-through">
                    MRP &#8377; 2200
                  </span>
                  <span className="text-xl font-bold text-blue-700">
                    &nbsp; Special Price :
                  </span>
                  <span className="text-2xl font-bold">&nbsp; &#8377; 799</span>
                </div>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-2xs bg-green-500 rounded-full mr-2 p-1" />
                    CBC : Complete Blood Count
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    Thyroid Profile Complete - T3 T4 TSH
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    KFT : Kidney Function Tests
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    LFT : Liver Function Tests
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    Lipid/Cholesterol Profile : Heart Health
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    U R/M : Complete Urine Examination
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    FBS : Fasting Blood Sugar
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    Electrolytes Profile
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    Calcium & Uric Acid
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    ESR (Westergren)
                  </li>
                </ul>
              </div>
              <div className="mt-6">
                <Button className="w-full bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400">
                  Book Now
                </Button>
              </div>
            </div>
            <div className="flex flex-col p-6 bg-white shadow-lg rounded-lg dark:bg-zinc-850 justify-between border dark:border-slate-800">
              <div>
                <p className="text-xl font-bold text-center">
                  Full Body Check-Up (70+ Parameters)
                </p>
                <div className="mt-4 text-center text-zinc-600 dark:text-zinc-400">
                  <span className="text-lg font-bold line-through">
                    MRP &#8377;3800
                  </span>
                  <span className="text-xl font-bold text-blue-700">
                    &nbsp; Special Price :
                  </span>
                  <span className="text-2xl font-bold">
                    &nbsp; &#8377; 1199
                  </span>
                </div>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    HbA1c : Hemoglobin A1C
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    CBC : Complete Blood Count
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    ESR : Erythrocyte Sedimentation Rate
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    Lipid/Cholesterol Profile : Heart Health
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    KFT : Kidney function Tests
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="text-white text-xs bg-green-500 rounded-full mr-2 p-1" />
                    LFT : Liver function Tests
                  </li>
                </ul>
              </div>
              <div className="mt-6">
                <Button variant="projectbtn" className="w-full">
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
