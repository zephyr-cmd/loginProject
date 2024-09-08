"use client";

import { useFormState } from "react-dom";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signUpAction } from "@/components/component/_actions";
import { useEffect } from "react";
import { toast } from "sonner";
import { SubmitButton } from "@/components/component/submit-button";
import Image from "next/image";

const Register = () => {
  const initialState = {
    message: "",
  };
  const [state, formAction] = useFormState(signUpAction, initialState);
  // console.log("L-16, object", state);
  if (state.status === 200) {
    const { name, token, role } = state.data;
    localStorage.setItem("name", name);
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    // Redirect to dashboard
    redirect(`/dashboard`); // Navigate to the new post page("/dashboard");
  }

  useEffect(() => {
    if (state) {
      toast(`${state?.data?.message || state?.message}`, {
        // description: "Sunday, December 03, 2023 at 9:00 AM",
      });
    }
  }, [state]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-lg">
        {/* <h2 className="text-2xl font-bold text-center text-black">Logo</h2> */}
        <Link href={"/"}>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Image
              className="mx-auto h-10 w-auto"
              src="/logo.jpg"
              alt="company logo"
              width={1200}
              height={50}
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
        </Link>
        <form className="mt-8 space-y-6" action={formAction}>
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="firstName"
                className="block text-sm font-medium text-black"
              >
                First Name
              </Label>
              <Input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                className="w-full px-3 py-2 mt-1 text-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <p className="text-sm text-red-700" aria-live="polite">
                {state?.errors?.firstName}
              </p>
            </div>
            <div>
              <Label
                htmlFor="lastName"
                className="block text-sm font-medium text-black"
              >
                Last Name
              </Label>
              <Input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                className="w-full px-3 py-2 mt-1 text-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <p className="text-sm text-red-700" aria-live="polite">
                {state?.errors?.lastName}
              </p>
            </div>
            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-black"
              >
                Email
              </Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="w-full px-3 py-2 mt-1 text-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <p className="text-sm text-red-700" aria-live="polite">
                {state?.errors?.email}
              </p>
            </div>
            <div>
              <Label
                htmlFor="mobileNumber"
                className="block text-sm font-medium text-black"
              >
                Mobile Number
              </Label>
              <Input
                type="number"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Mobile Number"
                className="w-full px-3 py-2 mt-1 text-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <p className="text-sm text-red-700" aria-live="polite">
                {state?.errors?.phoneNumber}
              </p>
            </div>
            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-black"
              >
                Password
              </Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="w-full px-3 py-2 mt-1 text-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <p className="text-sm text-red-700" aria-live="polite">
                {state?.errors?.password}
              </p>
            </div>
            <div>
              <Label
                htmlFor="sport"
                className="block text-sm font-medium text-black"
              >
                Sport
              </Label>
              <Input
                type="string"
                name="sport"
                id="sport"
                placeholder="Sport"
                className="w-full px-3 py-2 mt-1 text-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <p className="text-sm text-red-700" aria-live="polite">
                {state?.errors?.sport}
              </p>
            </div>
          </div>
          <div>
            <SubmitButton variant="projectbtn1" buttonName="Register" />
            <p
              className="text-sm text-red-700 mt-5 text-center"
              aria-live="polite"
            >
              {state.message}
            </p>
          </div>
        </form>

        <div className="flex flex-col items-center justify-center">
          <Link
            href="login"
            className="flex items-center text-indigo-600 hover:text-indigo-500"
          >
            <p className="text-center text-sm text-gray-500">
              Already have an account? &nbsp;
            </p>
            Login
          </Link>

          {/* <p className="text-center text-sm text-gray-500">
            Forgot Password, kindly contact the system administrator. &nbsp;
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Register;
