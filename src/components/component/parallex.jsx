"use client";

import { Input } from "../ui/input";
import { SubmitButton } from "./submit-button";
import { useFormState } from "react-dom";
import { createSecondOpinion } from "./_actions";
import { toast } from "sonner";
import { useEffect } from "react";
const initialState = {
  message: "",
};

export function Parallex() {
  const [state, formAction] = useFormState(createSecondOpinion, initialState);
  useEffect(() => {
    if (state.message) {
      // console.log(state.message);
      toast(`${state.message}`, {
        // description: "Sunday, December 03, 2023 at 9:00 AM",
      });
    }
  }, [state.message]);

  return (
    <div
      className={`bg-fixed bg-center bg-no-repeat bg-cover min-h-[350px] bg-zinc-400 text-white relative
      bg-[url('/hand.jpg')]  
      `}
    >
      <div className="absolute min-h-[350px] w-full bg-black/60" />
      <div className="absolute flex flex-col min-h-[350px] justify-evenly w-full items-center ">
        <p className="font-extrabold text-center text-3xl">
          Need a free Second Opinion ?
        </p>
        <div className="flex flex-col w:[80%] justify-center items-center">
          <form
            className="flex flex-col sm:flex-row p-5 gap-5 justify-center items-center"
            action={formAction}
          >
            <Input
              type="number"
              placeholder="Phone Number"
              name="phoneNumber"
              style={{
                /* Hide spinner arrows */
                WebkitAppearance: "none",
                MozAppearance: "textfield",
              }}
            ></Input>
            <p className="text-sm text-red-700" aria-live="polite">
              {state?.errors?.requestFor}
            </p>
            <SubmitButton />
            {/* <p
              className="text-sm text-red-700"
              aria-live="polite"
              // className="sr-only"
            >
              {state.message}
            </p> */}
          </form>
        </div>
      </div>
    </div>
  );
}
