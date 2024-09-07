"use client";

import { SubmitButton } from "@/components/component/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";
// import { useEffect, useState } from "react";
import { toast } from "sonner";
import { editAppointmentAction } from "@/app/(admin)/_resources/modalForm/_actions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

export function EditAppointmentForm(props) {
  const appointmentDetails = props.appointmentDetails;
  const initialState = {
    message: "",
  };

  const [state, formAction] = useFormState(editAppointmentAction, initialState);
  const [employeesName, setEmployeesName] = useState([]);
  useEffect(() => {
    let token = localStorage.getItem("token");
    async function getData(token) {
      try {
        let response = await fetch(`/api/v1/employee/fetchdata`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        let fetchedData = await response.json();
        // console.log("L-88, fetchAppointment", fetchedData);
        if (response.status == 401) {
          setStatus(response.status);
          setMessage(fetchedData.message);
          localStorage.clear();
          Logout();
          return;
        } else if (response.status == 403) {
          setStatus(response.status);
          setMessage("Token expired, Kindly logout & login again !");
          return;
        } else if (response.status == 500) {
          setStatus(response.status);
          setMessage(fetchedData.message);
          return;
        } else if (response.status == 200) {
          // setStatus(response.status);
          // setAppointmentData(fetchedData.results);
          // setTotalPages(fetchedData?.totalPages);
          setEmployeesName(fetchedData?.results);
        } else {
          setStatus(response.status);
        }
      } catch (error) {
        console.log("something went wrong ??", error);
      }
    }
    getData(token);
  }, []);

  return (
    <div>
      <div className="flex flex-row items-center justify-center gap-10 md:gap-24 border-b-4 pb-2">
        <div>
          <p className="text-xl md:text-3xl text-cyan-500">Patient Details</p>
        </div>
        <div className="text-white">
          <p className="text-base sm:text-xl">{appointmentDetails?.name}</p>
          <p className="text-base sm:text-xl">
            {appointmentDetails?.phoneNumber}
          </p>
          <p className="text-base sm:text-xl">
            {appointmentDetails?.appointmentId}
          </p>
        </div>
      </div>
      <form action={formAction} className="flex flex-col mt-7">
        {/* Input fields for certificate details */}
        {/* Add your form fields here */}
        <input type="hidden" name="_id" value={appointmentDetails?._id} />
        <input
          type="hidden"
          name="phoneNumber"
          value={appointmentDetails?.phoneNumber}
        />
        <div className="space-y-4">
          <div className="flex justify-between items-center gap-4">
            <div className="w-2/3">
              <Label htmlFor="doctorName" className="text-sm text-gray-300">
                Doctor&apos;s Name <span className="text-red-700">*</span>
              </Label>
              <Select
                id="doctorName"
                name="doctorName"
                defaultValue={appointmentDetails?.doctorName}
                className="text-white"
              >
                <SelectTrigger className="text-sm text-gray-400">
                  <SelectValue placeholder="Select name" />
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
            <div className="w-1/3">
              <Label htmlFor="amount" className="text-sm text-gray-300">
                Amount <span className="text-red-700">*</span>
              </Label>
              <Input
                type="number"
                name="amount"
                id="amount"
                defaultValue={appointmentDetails?.amount}
                placeholder="Amount"
                className="text-white"
              />
              <p className="text-sm text-red-700" aria-live="polite">
                {state?.errors?.amount}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center gap-4">
            <div className="w-1/3">
              <Label htmlFor="gender" className="text-sm text-gray-300">
                Gender
              </Label>
              <Select
                name="gender"
                id="gender"
                // className="text-gray-300"
                defaultValue={appointmentDetails?.gender}
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
              <Label htmlFor="age" className="text-sm text-gray-300">
                Age <span className="text-red-700">*</span>
              </Label>
              <Input
                type="number"
                name="age"
                id="age"
                defaultValue={appointmentDetails?.age}
                placeholder="Age"
                className="text-white"
              />
              <p className="text-sm text-red-700" aria-live="polite">
                {state?.errors?.age}
              </p>
            </div>
            <div className="w-1/3">
              <Label htmlFor="weight" className="text-sm text-gray-300">
                Weight
              </Label>
              <Input
                className="text-white"
                type="number"
                name="weight"
                id="weight"
                defaultValue={appointmentDetails?.weight}
                placeholder="Weight"
              />
              <p className="text-sm text-red-700" aria-live="polite">
                {state?.errors?.weight}
              </p>
            </div>
          </div>
          <div className="flex flex-row py-2 justify-evenly">
            <div className="space-y-4">
              <Label htmlFor="amountPaid" className="text-sm text-gray-300">
                Amount Paid <span className="text-red-700">*</span>
              </Label>
              <Input
                type="checkbox"
                name="amountPaid"
                id="amountPaid"
                defaultChecked={appointmentDetails?.amountPaid ? "on" : ""}
              />
              <p className="text-sm text-red-700" aria-live="polite">
                {state?.errors?.amountPaid}
              </p>
            </div>
            <div className="space-y-4">
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
                defaultChecked={appointmentDetails?.isPaymentOnline ? "on" : ""}
              />
              <p className="text-sm text-red-700" aria-live="polite">
                {state?.errors?.isPaymentOnline}
              </p>
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
