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
import { newAppointmentAction } from "@/app/(admin)/_resources/modalForm/_actions";

export function NewAppointmentForm(props) {
  // const CustomerDetails = props.CustomerDetails;
  const CustomerDetails = "";
  const initialState = {
    message: "",
  };
  const [state, formAction] = useFormState(newAppointmentAction, initialState);

  const dateTimeNow = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 10);
  // console.log("L-33, dateTimeNow---------->", dateTimeNow);

  const [employeesName, setEmployeesName] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        let response = await fetch(`/api/v1/employee/fetchdata`);
        let fetchedData = await response.json();
        // console.log("L-41, fetchedData", fetchedData);
        if (fetchedData?.status === 200) {
          setEmployeesName(fetchedData?.results);
        }
      } catch (error) {
        console.log("something went wrong ??", error);
      }
    }
    getData();
  }, []);

  return (
    <div>
      <div className="flex flex-row items-center justify-center gap-10 md:gap-24 border-b-4 pb-2">
        <div>
          <p className="text-xl md:text-3xl text-cyan-500">Patient Details</p>
        </div>
      </div>
      <form action={formAction} className="flex flex-col mt-7">
        {/* Input fields for certificate details */}
        {/* Add your form fields here */}
        <input type="hidden" name="_id" value={CustomerDetails._id} />
        <div className="space-y-4">
          <div className="flex justify-between gap-4 items-center ">
            <div className="w-2/3">
              <Label htmlFor="name" className="text-sm text-gray-300">
                Name <span className="text-red-700">*</span>
              </Label>
              <Input
                type="text"
                name="name"
                id="name"
                defaultValue={CustomerDetails?.name}
                placeholder="Name"
                className="text-white"
              />
              <p className="text-sm text-red-700" aria-live="polite">
                {state?.errors?.name}
              </p>
            </div>
            <div className="w-1/3">
              <Label htmlFor="phoneNumber" className="text-sm text-gray-300">
                Mobile Number <span className="text-red-700">*</span>
              </Label>
              <Input
                type="number"
                name="phoneNumber"
                id="phoneNumber"
                defaultValue={CustomerDetails?.phoneNumber}
                placeholder="Mobile Number"
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
                defaultValue={CustomerDetails?.gender}
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
              <Label htmlFor="bloodGroup" className="text-sm text-gray-300">
                Blood Group
              </Label>
              <Select
                name="bloodGroup"
                id="bloodGroup"
                // className="text-gray-300"
                defaultValue={CustomerDetails?.bloodGroup}
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
            </div>
          </div>
          <div className="flex justify-between gap-4 items-center">
            <div className="w-1/3">
              <Label htmlFor="requestFor" className="text-sm text-gray-300">
                Request For
              </Label>
              <Select
                name="requestFor"
                id="requestFor"
                // className="text-gray-300"
                defaultValue={CustomerDetails?.requestFor}
              >
                <SelectTrigger className="text-sm text-gray-400">
                  <SelectValue placeholder="Select RequestFor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Gender</SelectLabel>
                    <SelectItem value="OPD">OPD</SelectItem>
                    <SelectItem value="Path">Path</SelectItem>
                    <SelectItem value="ECG">ECG</SelectItem>
                    <SelectItem value="x-ray">x-ray</SelectItem>
                    <SelectItem value="Other's">Other&apos;s</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className="text-sm text-red-700" aria-live="polite">
                {state?.errors?.requestFor}
              </p>
            </div>
            <div className="w-2/3">
              <Label htmlFor="doctorName" className="text-sm text-gray-300">
                Doctor&apos;s Name <span className="text-red-700">*</span>
              </Label>
              <Select
                name="doctorName"
                id="doctorName"
                // defaultValue={appointmentDetails?.doctorName}
                className="text-white"
              >
                <SelectTrigger className="text-sm text-gray-400">
                  <SelectValue placeholder="Select Doctor's Name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Doctor&apos;s Name</SelectLabel>
                    {employeesName.map((employee) => (
                      <SelectItem key={employee._id} value={employee.name}>
                        {employee.name + " : "}
                        <span className="italic text-xs">
                          {employee.specialization}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className="text-sm text-red-700" aria-live="polite">
                {state?.errors?.doctorName}
              </p>
            </div>
          </div>
          <div className="flex py-2 gap-4 justify-between">
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
          </div>
          <div className="grid col-span-2 pb-5">
            <div className="flex justify-between items-center gap-4 ">
              <div>
                <Label htmlFor="houseNumber" className="text-sm text-gray-300">
                  House Number
                </Label>
                <Input
                  className="text-white"
                  type="text"
                  name="houseNumber"
                  id="houseNumber"
                  defaultValue={CustomerDetails?.address?.houseNumber}
                  placeholder="houseNumber"
                />
                <p className="text-sm text-red-700" aria-live="polite">
                  {state?.errors?.houseNumber}
                </p>
              </div>
              <div>
                <Label htmlFor="street" className="text-sm text-gray-300">
                  Street
                </Label>
                <Input
                  className="text-white"
                  type="text"
                  name="street"
                  id="street"
                  defaultValue={CustomerDetails?.address?.street}
                  placeholder="street"
                />
                <p className="text-sm text-red-700" aria-live="polite">
                  {state?.errors?.street}
                </p>
              </div>
              <div>
                <Label htmlFor="city" className="text-sm text-gray-300">
                  City
                </Label>
                <Input
                  className="text-white"
                  type="text"
                  name="city"
                  id="city"
                  defaultValue={CustomerDetails?.address?.city}
                  placeholder="city"
                />
                <p className="text-sm text-red-700" aria-live="polite">
                  {state?.errors?.city}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center gap-4 ">
              <div>
                <Label htmlFor="pinCode" className="text-sm text-gray-300">
                  Pin Code
                </Label>
                <Input
                  className="text-white"
                  type="number"
                  name="pinCode"
                  id="pinCode"
                  defaultValue={CustomerDetails?.address?.pinCode}
                  placeholder="pinCode"
                />
                <p className="text-sm text-red-700" aria-live="polite">
                  {state?.errors?.pinCode}
                </p>
              </div>
              <div>
                <Label htmlFor="state" className="text-sm text-gray-300">
                  State
                </Label>
                <Input
                  className="text-white"
                  type="text"
                  name="state"
                  id="state"
                  defaultValue={CustomerDetails?.address?.state}
                  placeholder="state"
                />
                <p className="text-sm text-red-700" aria-live="polite">
                  {state?.errors?.state}
                </p>
              </div>
              <div>
                <Label htmlFor="country" className="text-sm text-gray-300">
                  Country
                </Label>
                <Input
                  className="text-white"
                  type="text"
                  name="country"
                  id="country"
                  defaultValue={CustomerDetails?.address?.country}
                  placeholder="country"
                />
                <p className="text-sm text-red-700" aria-live="polite">
                  {state?.errors?.country}
                </p>
              </div>
            </div>
          </div>
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
