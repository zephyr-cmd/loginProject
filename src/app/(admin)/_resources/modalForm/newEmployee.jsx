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
import { newEmployeeAction } from "@/app/(admin)/_resources/modalForm/_actions";

export function NewEmployeeForm(props) {
  const EmployeeDetails = props.employeeDetails || "";
  const initialState = {
    message: "",
  };
  const [state, formAction] = useFormState(newEmployeeAction, initialState);

  const dateTimeNow = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 10);
  // console.log("L-33, dateTimeNow---------->", dateTimeNow);

  return (
    <div>
      <div className="flex flex-row items-center justify-center gap-10 md:gap-24 border-b-4 pb-2">
        <div>
          <p className="text-xl md:text-3xl text-cyan-500">Employee Details</p>
        </div>
      </div>
      <form action={formAction} className="flex flex-col mt-7">
        {/* Input fields for new Employee details */}
        <input type="hidden" name="_id" value={EmployeeDetails?._id} />
        <div className="space-y-4">
          <div className="flex justify-between gap-4 items-center ">
            <div className="w-1/3">
              <Label htmlFor="name" className="text-sm text-gray-300">
                Name <span className="text-red-700">*</span>
              </Label>
              <Input
                type="text"
                name="name"
                id="name"
                defaultValue={EmployeeDetails?.name}
                placeholder="Name"
                className="text-white"
              />
              <p className="text-sm text-red-700" aria-live="polite">
                {state?.errors?.name}
              </p>
            </div>
            <div className="w-2/3">
              <Label htmlFor="profileImage" className="text-sm text-gray-300">
                Profile Image <span className="text-red-700">*</span>
              </Label>
              <Input
                type="text"
                name="profileImage"
                id="profileImage"
                defaultValue={EmployeeDetails?.profileImage}
                placeholder="Profile Image URL"
                className="text-white"
              />
              <p className="text-sm text-red-700" aria-live="polite">
                {state?.errors?.profileImage}
              </p>
            </div>
          </div>
          <div className="flex justify-between gap-4 items-center">
            <div className="w-1/3">
              <Label htmlFor="designation" className="text-sm text-gray-300">
                Designation <span className="text-red-700">*</span>
              </Label>
              <Select
                name="designation"
                id="designation"
                // className="text-gray-300"
                defaultValue={EmployeeDetails?.designation}
              >
                <SelectTrigger className="text-sm text-gray-400">
                  <SelectValue placeholder="Select Designation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Designation</SelectLabel>
                    <SelectItem value="doctor">Doctor</SelectItem>
                    <SelectItem value="yogacharya">Yogacharya</SelectItem>
                    <SelectItem value="staffNurse">Staff Nurse</SelectItem>
                    <SelectItem value="labTechnician">
                      Lab Technician
                    </SelectItem>
                    <SelectItem value="chemist">Chemist</SelectItem>
                    <SelectItem value="other's">Other&apos;s</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className="text-sm text-red-700" aria-live="polite">
                {state?.errors?.designation}
              </p>
            </div>
            <div className="w-1/3">
              <Label htmlFor="qualification" className="text-sm text-gray-300">
                Qualification <span className="text-red-700">*</span>
              </Label>
              <Input
                type="text"
                name="qualification"
                id="qualification"
                defaultValue={EmployeeDetails?.qualification}
                placeholder="qualification"
                className="text-white"
              />
              <p className="text-sm text-red-700" aria-live="polite">
                {state?.errors?.qualification}
              </p>
            </div>
            <div className="w-1/3">
              <Label htmlFor="specialization" className="text-sm text-gray-300">
                Specialization <span className="text-red-700">*</span>
              </Label>
              <Input
                type="text"
                name="specialization"
                id="specialization"
                defaultValue={EmployeeDetails?.specialization}
                placeholder="specialization"
                className="text-white"
              />
              <p className="text-sm text-red-700" aria-live="polite">
                {state?.errors?.specialization}
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
                defaultValue={
                  EmployeeDetails?.dateOfBirth
                    ? new Date(EmployeeDetails.dateOfBirth)
                        .toISOString()
                        .split("T")[0]
                    : "YYYY-MM-DD"
                }
                className="text-white"
              />
              <p className="text-sm text-red-700" aria-live="polite">
                {state?.errors?.dateOfBirth}
              </p>
            </div>
            <div className="w-1/3">
              <Label htmlFor="gender" className="text-sm text-gray-300">
                Gender <span className="text-red-700">*</span>
              </Label>
              <Select
                name="gender"
                id="gender"
                // className="text-gray-300"
                defaultValue={EmployeeDetails?.gender}
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
                defaultValue={EmployeeDetails?.bloodGroup}
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
              <Label htmlFor="phoneNumber" className="text-sm text-gray-300">
                Mobile Number <span className="text-red-700">*</span>
              </Label>
              <Input
                type="number"
                name="phoneNumber"
                id="phoneNumber"
                defaultValue={EmployeeDetails?.phoneNumber}
                placeholder="Mobile Number"
                className="text-white"
              />
              <p className="text-sm text-red-700" aria-live="polite">
                {state?.errors?.phoneNumber}
              </p>
            </div>
            <div className="w-2/3">
              <Label htmlFor="email" className="text-sm text-gray-300">
                Email
              </Label>
              <Input
                type="text"
                name="email"
                id="email"
                defaultValue={EmployeeDetails?.email}
                placeholder="email"
                className="text-white"
              />
              <p className="text-sm text-red-700" aria-live="polite">
                {state?.errors?.email}
              </p>
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
                  defaultValue={EmployeeDetails?.address?.houseNumber}
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
                  defaultValue={EmployeeDetails?.address?.street}
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
                  defaultValue={EmployeeDetails?.address?.city}
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
                  defaultValue={EmployeeDetails?.address?.pinCode}
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
                  defaultValue={EmployeeDetails?.address?.state}
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
                  defaultValue={EmployeeDetails?.address?.country}
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
