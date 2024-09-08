// "use client";

import { SubmitButton } from "@/components/component/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  editUser,
  newAppointmentAction,
} from "@/app/(admin)/_resources/modalForm/_actions";

export function EditProfile(props) {
  // const CustomerDetails = props.CustomerDetails;
  // const CustomerDetails = "";
  const initialState = {
    message: "",
  };
  const [state, formAction] = useFormState(editUser, initialState);

  const dateTimeNow = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 10);
  // console.log("L-33, dateTimeNow---------->", dateTimeNow);

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        // Retrieve _id from local storage
        const _id = localStorage.getItem("_id");
        console.log("L-45, userId------->", _id);

        // Pass _id as a query parameter
        let response = await fetch(`/api/v1/admin/user/${_id}`);
        console.log("L-49, fetchedData", response);

        let fetchedData = await response.json();
        console.log("L-52, fetchedData", fetchedData);

        if (fetchedData?.status === 200) {
          setUserData(fetchedData?.data);
          console.log("L-56, fetchedData", userData);
        }
      } catch (error) {
        console.log("L-63, something went wrong ??", error);
      }
    }

    getData();
  }, []);

  return (
    <div>
      <div className="flex flex-row items-center justify-center gap-10 md:gap-24 border-b-4 pb-2">
        <div>
          <p className="text-xl md:text-3xl text-cyan-500">User Details</p>
        </div>
      </div>
      <form action={formAction} className="flex flex-col mt-7">
        {/* Input fields for certificate details */}
        {/* Add your form fields here */}
        <input type="hidden" name="_id" value={userData._id} />
        <div className="space-y-4">
          <div className="flex justify-between gap-4 items-center ">
            <div className="w-1/2">
              <Label htmlFor="firstName" className="text-sm text-gray-300">
                First Name <span className="text-red-700">*</span>
              </Label>
              <Input
                type="text"
                name="firstName"
                id="firstName"
                defaultValue={userData?.firstName}
                placeholder="firstName"
                className="text-white"
              />
              <p className="text-sm text-red-700" aria-live="polite">
                {state?.errors?.firstName}
              </p>
            </div>
            <div className="w-1/2">
              <Label htmlFor="lastName" className="text-sm text-gray-300">
                Last Name <span className="text-red-700">*</span>
              </Label>
              <Input
                type="text"
                name="lastName"
                id="lastName"
                defaultValue={userData?.lastName}
                placeholder="lastName"
                className="text-white"
              />
              <p className="text-sm text-red-700" aria-live="polite">
                {state?.errors?.lastName}
              </p>
            </div>
          </div>
          <div className="flex justify-between gap-4 items-center ">
            <div className="w-1/2">
              <Label htmlFor="email" className="text-sm text-gray-300">
                Email <span className="text-red-700">*</span>
              </Label>
              <Input
                type="email"
                name="email"
                id="email"
                defaultValue={userData?.email}
                placeholder="Email"
                className="text-white"
              />
              <p className="text-sm text-red-700" aria-live="polite">
                {state?.errors?.email}
              </p>
            </div>
            <div className="w-1/2">
              <Label htmlFor="phoneNumber" className="text-sm text-gray-300">
                Phone Number <span className="text-red-700">*</span>
              </Label>
              <Input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                defaultValue={userData?.phoneNumber}
                placeholder="Phone Number"
                className="text-white"
              />
              <p className="text-sm text-red-700" aria-live="polite">
                {state?.errors?.phoneNumber}
              </p>
            </div>
          </div>
          <div className="flex justify-between gap-4 items-center ">
            <div className="w-1/3">
              <Label htmlFor="dateOfBirth" className="text-sm text-gray-300">
                Date Of Birth <span className="text-red-700">*</span>
              </Label>
              <Input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                max={dateTimeNow}
                // defaultValue={dateTimeNow}
                className="text-white"
              />
              <p className="text-sm text-red-700" aria-live="polite">
                {state?.errors?.dateOfBirth}
              </p>
            </div>
            <div className="w-1/3">
              <Label htmlFor="gender" className="text-sm text-gray-300">
                Gender
              </Label>
              <Select
                name="gender"
                id="gender"
                // className="text-gray-300"
                defaultValue={userData?.gender}
              >
                <SelectTrigger className="text-sm text-gray-400">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Gender</SelectLabel>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other's">Other&apos;s</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className="text-sm text-red-700" aria-live="polite">
                {state?.errors?.gender}
              </p>
            </div>
            <div className="w-1/3">
              <Label htmlFor="sport" className="text-sm text-gray-300">
                Sport
              </Label>
              <Input
                className="text-white"
                type="text"
                name="sport"
                id="sport"
                defaultValue={userData?.sport}
                placeholder="sport"
              />
              <p className="text-sm text-red-700" aria-live="polite">
                {state?.errors?.sport}
              </p>
            </div>

            {/* Blood Group */}
            {/* <div className="w-1/3">
              <Label htmlFor="bloodGroup" className="text-sm text-gray-300">
                Blood Group
              </Label>
              <Select
                name="bloodGroup"
                id="bloodGroup"
                // className="text-gray-300"
                defaultValue={userData?.bloodGroup}
              >
                <SelectTrigger className="text-sm text-gray-400">
                  <SelectValue placeholder="Select a Blood Group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Blood Group</SelectLabel>
                    <SelectItem value="O− ">O− </SelectItem>
                    <SelectItem value="O+ ">O+ </SelectItem>
                    <SelectItem value="A− ">A− </SelectItem>
                    <SelectItem value="A+ ">A+ </SelectItem>
                    <SelectItem value="B− ">B− </SelectItem>
                    <SelectItem value="B+ ">B+ </SelectItem>
                    <SelectItem value="AB− ">AB− </SelectItem>
                    <SelectItem value="AB+ ">AB+ </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className="text-sm text-red-700" aria-live="polite">
                {state?.errors?.bloodGroup}
              </p>
            </div> */}
          </div>
          <div className="flex justify-between gap-4 items-center">
            <div className="w-full pb-5">
              <Label htmlFor="youtubeLink" className="text-sm text-gray-300">
                Youtube Link
                {/* <span className="text-red-700">*</span> */}
              </Label>
              <Input
                type="url"
                name="youtubeLink"
                id="youtubeLink"
                defaultValue={userData?.youtubeLink}
                placeholder="youtube Link"
                className="text-white"
              />
              <p className="text-sm text-red-700" aria-live="polite">
                {state?.errors?.youtubeLink}
              </p>
            </div>
          </div>
          <div className="flex justify-between gap-4 items-center text-white pb-5">
            <label htmlFor="bio">
              Bio
              {/* <span className="text-sm block w-full">
                Please specify the product or service you are enquiring about,
                if any
              </span> */}
              <textarea
                id="message"
                name="message"
                rows="4"
                cols="60"
                defaultValue={userData?.youtubeLink}
                required
                className="w-full text-base block bg-transparent py-2 border border-current  focus:outline-none focus:border-teal"
              ></textarea>
            </label>
          </div>

          {/* <div className="flex py-2 gap-4 justify-between">
            <div className="w-1/3">
              <Label htmlFor="amount" className="text-sm text-gray-300">
                Amount <span className="text-red-700">*</span>
              </Label>
              <Input
                type="number"
                name="amount"
                id="amount"
                // defaultValue={appointmentDetails?.amount}
                placeholder="Amount"
                className="text-white"
              />
              <p className="text-sm text-red-700" aria-live="polite">
                {state?.errors?.amount}
              </p>
            </div>
            <div className="w-2/3 flex gap-4 items-center justify-evenly">
              <div className="">
                <Label htmlFor="amountPaid" className="text-sm text-gray-300">
                  Amount Paid <span className="text-red-700">*</span>
                </Label>
                <Input
                  type="checkbox"
                  name="amountPaid"
                  id="amountPaid"
                  // defaultChecked={appointmentDetails?.amountPaid ? "on" : ""}
                />
                <p className="text-sm text-red-700" aria-live="polite">
                  {state?.errors?.amountPaid}
                </p>
              </div>
              <div className="">
                <Label
                  htmlFor="isPaymentOnline"
                  className="text-sm text-gray-300"
                >
                  Is Payment Online <span className="text-red-700">*</span>
                </Label>
                <Input
                  type="checkbox"
                  name="isPaymentOnline"
                  id="isPaymentOnline"
                  // defaultChecked={appointmentDetails?.isPaymentOnline ? "on" : ""}
                />
                <p className="text-sm text-red-700" aria-live="polite">
                  {state?.errors?.isPaymentOnline}
                </p>
              </div>
            </div>
          </div> */}
        </div>
        <SubmitButton variant="projectbtn1" />
        <p
          className="text-sm text-red-700"
          aria-live="polite"
          // className="sr-only"
        >
          {state.message}
        </p>
      </form>
    </div>
  );
}
