"use client";

import { useFormState } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { loginAction } from "@/components/component/_actions";
import { SubmitButton } from "@/components/component/submit-button";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";

const Login = () => {
  const initialState = {
    message: "",
  };
  const [state, formAction] = useFormState(loginAction, initialState);
  // console.log("L-16, object", state);
  if (state.status === 200) {
    const { _id, token, role } = state.data;
    localStorage.setItem("_id", _id);
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
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      {/* <Link href={"/"}>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto h-10 w-auto"
            src="/sarvanjana.png"
            alt="company logo"
            width={1200}
            height={50}
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
      </Link> */}
      <div className="flex justify-center items-center font-bold">Logo</div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action={formAction}>
          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </Label>
            <div className="mt-2">
              <Input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <p className="text-sm text-red-700" aria-live="polite">
              {state?.errors?.email}
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </Label>
              {/* <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div> */}
            </div>
            <div className="mt-2">
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <SubmitButton variant="projectbtn1" buttonName="Sign in" />
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
            href="register"
            className="flex items-center text-indigo-600 hover:text-indigo-500"
          >
            <p className="text-center text-sm text-gray-500">
              Don&apos;t have an account? &nbsp;
            </p>
            Register here
          </Link>

          {/* <p className="text-center text-sm text-gray-500">
            Forgot Password, kindly contact the system administrator. &nbsp;
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
