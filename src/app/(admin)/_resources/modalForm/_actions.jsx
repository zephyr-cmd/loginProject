"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import axios from "axios";
import {
  ageCalculator,
  dateTimeConversion,
} from "@/components/helper/dateConversion";
let { ServerURI } = process.env;

export async function newAppointmentAction(prevState, formData) {
  // console.log("L-14, FormData editCustomerAction---->", formData);
  // console.log("L-15, PrevState editCustomerAction---->", prevState);

  const schema = z.object({
    name: z.string().min(5, { message: "Must be 5 or more characters long" }),
    phoneNumber: z.string().optional(),
    dateOfBirth: z.coerce.date().optional(),
    gender: z.string().optional(),
    bloodGroup: z.string().optional(),
    requestFor: z.string().optional(),
    doctorName: z.string().optional(),
    amount: z.string().optional(),
    amountPaid: z
      .string()
      .nullable()
      .transform((val) => {
        return val === "on" ? true : false;
      })
      .optional(),
    isPaymentOnline: z
      .string()
      .nullable()
      .transform((val) => {
        // Convert "on" to true, and null to false
        return val === "on" ? true : false;
      })
      .optional(),
    houseNumber: z.string().optional(),
    street: z.string().optional(),
    city: z.string().optional(),
    pinCode: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
  });
  const validatedFields = schema.safeParse({
    name: formData.get("name"),
    phoneNumber: formData.get("phoneNumber"),
    dateOfBirth: formData.get("dateOfBirth"),
    gender: formData.get("gender"),
    bloodGroup: formData.get("bloodGroup"),
    requestFor: formData.get("requestFor"),
    doctorName: formData.get("doctorName"),
    amount: formData.get("amount"),
    amountPaid: formData.get("amountPaid"),
    isPaymentOnline: formData.get("isPaymentOnline"),
    houseNumber: formData.get("houseNumber"),
    street: formData.get("street"),
    city: formData.get("city"),
    pinCode: formData.get("pinCode"),
    state: formData.get("state"),
    state: formData.get("state"),
    country: formData.get("country"),
  });
  console.log("L-196, validateFields: ", validatedFields.success);
  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please Provide Correct Details",
    };
  }
  const newObjData = validatedFields.data;
  newObjData.age = ageCalculator(newObjData?.dateOfBirth);
  let newDate = new Date();
  newDate.setHours(newDate.getHours() + 5);
  newDate.setMinutes(newDate.getMinutes() + 30);
  newObjData.appointmentDate = `${newDate}`;
  // console.log("L-81, apiResponse: editCustomerAction--->", newObjData);

  try {
    const apiResponse = await axios.post(
      `${ServerURI}/api/v1/home`,
      newObjData
    );
    // console.log("L-88, apiResponse: newAppointment--->", apiResponse?.data);
    if (apiResponse.status == 200) {
      revalidatePath("/");
      return { message: `Successfully updated Record`, status: 200 };
    } else {
      return { message: `something went wrong !` };
    }
  } catch (e) {
    console.log("L-96, error:", e);
    return { message: "Failed to create Booking" };
  }
}
export async function editAppointmentAction(prevState, formData) {
  // console.log("L-101, FormData editAppointmetAction---->", formData);
  // console.log("L-102, PrevState editAppointmentAction---->", prevState);

  const schema = z.object({
    _id: z
      .string()
      .min(5, { message: "userId missing !! kindly contact the admin" }),
    phoneNumber: z.string().optional(),
    doctorName: z
      .string()
      .min(5, { message: "Must be 5 or more characters long" }),
    amount: z.string(),
    gender: z.string().optional(),
    age: z.string(),
    weight: z.string().optional(),
    // .min(10, { message: "Number contains less than 10 digits" })
    // .max(10, { message: "number contains more than 10 digits" }),
    amountPaid: z
      .string()
      .nullable()
      .transform((val) => {
        return val === "on" ? true : false;
      })
      .optional(),
    isPaymentOnline: z
      .string()
      .nullable()
      .transform((val) => {
        // Convert "on" to true, and null to false
        return val === "on" ? true : false;
      })
      .optional(),
  });
  const validatedFields = schema.safeParse({
    _id: formData.get("_id"),
    phoneNumber: formData.get("phoneNumber"),
    doctorName: formData.get("doctorName"),
    amount: formData.get("amount"),
    gender: formData.get("gender"),
    age: formData.get("age"),
    weight: formData.get("weight"),
    amountPaid: formData.get("amountPaid"),
    isPaymentOnline: formData.get("isPaymentOnline"),
  });
  // console.log("L-141, validateFields: ", validatedFields.success);
  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please Provide Correct Details",
    };
  }
  const newObjData = validatedFields.data;

  try {
    const apiResponse = await axios.put(
      `${ServerURI}/api/v1/appointment/${newObjData._id}`,
      newObjData
    );
    // console.log("L-156, apiResponse-------->", apiResponse?.status);
    if (apiResponse.status == 200) {
      revalidatePath("/");
      return { message: `Successfully updated Record`, status: 200 };
    } else {
      return { message: `something went wrong !` };
    }
  } catch (e) {
    console.log("L-164, error:", e);
    return { message: "Failed to create Booking" };
  }
}
export async function editCustomerAction(prevState, formData) {
  console.log("L-169, FormData editCustomerAction---->", formData);
  console.log("L-170, PrevState editCustomerAction---->", prevState);

  const schema = z.object({
    _id: z
      .string()
      .min(5, { message: "userId missing !! kindly contact the admin" }),
    name: z.string().min(5, { message: "Must be 5 or more characters long" }),
    phoneNumber: z.string().optional(),
    dateOfBirth: z.coerce.date().optional(),
    gender: z.string().optional(),
    bloodGroup: z.string().optional(),
    houseNumber: z.string().optional(),
    street: z.string().optional(),
    city: z.string().optional(),
    pinCode: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
  });
  const validatedFields = schema.safeParse({
    _id: formData.get("_id"),
    name: formData.get("name"),
    phoneNumber: formData.get("phoneNumber"),
    dateOfBirth: formData.get("dateOfBirth"),
    gender: formData.get("gender"),
    bloodGroup: formData.get("bloodGroup"),
    houseNumber: formData.get("houseNumber"),
    street: formData.get("street"),
    city: formData.get("city"),
    pinCode: formData.get("pinCode"),
    state: formData.get("state"),
    state: formData.get("state"),
    country: formData.get("country"),
  });
  console.log("L-203, validateFields: ", validatedFields.success);
  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please Provide Correct Details",
    };
  }
  const newObjData = validatedFields.data;

  try {
    const apiResponse = await axios.put(
      `${ServerURI}/api/v1/customer/${newObjData._id}`,
      newObjData
    );
    // console.log("L-218, apiResponse: editCustomerAction--->", apiResponse.data);
    if (apiResponse.status == 200) {
      revalidatePath("/");
      return { message: `Successfully updated Record`, status: 200 };
    } else {
      return { message: `something went wrong !` };
    }
  } catch (e) {
    console.log("L-226, error:", e);
    return { message: "Failed to create Booking" };
  }
}
export async function newEmployeeAction(prevState, formData) {
  // console.log("L-231, FormData editCustomerAction---->", formData);
  // console.log("L-232, PrevState editCustomerAction---->", prevState);

  const schema = z.object({
    _id: z
      .string()
      .optional()
      .refine(
        (value) => {
          // If _id is not provided (undefined) or is an empty string, allow it
          if (value === undefined || value === "") {
            return true;
          }
          // If _id is provided, ensure it has a minimum length of 5 characters
          return value.length >= 5;
        },
        {
          message: "Must be 5 or more characters long",
        }
      )
      .transform((value) => {
        // Transform undefined or empty string to null
        if (value === undefined || value === "") {
          return null;
        }
        // Otherwise retain the value
        return value;
      }),
    name: z.string().min(5, { message: "Must be 5 or more characters long" }),
    profileImage: z.string().min(5, { message: "Profile Image URL Required" }),
    phoneNumber: z
      .string()
      .length(10, { message: "Mobile Number must be exactly 10 digits long" })
      .regex(/^\d{10}$/, {
        message: " &  contain only digits",
      }),
    email: z
      .string()
      .optional()
      .refine(
        (value) => value === "" || z.string().email().safeParse(value).success,
        {
          message: "Please use a valid email address",
        }
      ),
    dateOfBirth: z.coerce.date().optional(),
    gender: z.string().min(1, { message: "Select appropiate Value" }),
    bloodGroup: z.string().optional(),
    designation: z.string().min(1, { message: "Select appropiate Value" }),
    qualification: z.string().min(1, { message: "Qualification Required" }),
    specialization: z.string().min(3, { message: "Specialization Required" }),
    houseNumber: z.string().optional(),
    street: z.string().optional(),
    city: z.string().optional(),
    pinCode: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
  });
  const validatedFields = schema.safeParse({
    _id: formData.get("_id"),
    name: formData.get("name"),
    profileImage: formData.get("profileImage"),
    phoneNumber: formData.get("phoneNumber"),
    email: formData.get("email"),
    dateOfBirth: formData.get("dateOfBirth"),
    gender: formData.get("gender"),
    bloodGroup: formData.get("bloodGroup"),
    designation: formData.get("designation"),
    qualification: formData.get("qualification"),
    specialization: formData.get("specialization"),
    houseNumber: formData.get("houseNumber"),
    street: formData.get("street"),
    city: formData.get("city"),
    pinCode: formData.get("pinCode"),
    state: formData.get("state"),
    state: formData.get("state"),
    country: formData.get("country"),
  });
  console.log("L-309, validateFields: ", validatedFields.success);
  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please Provide Correct Details",
    };
  }
  const newObjData = validatedFields.data;
  // console.log("L-318, apiResponse: editCustomerAction--->", newObjData);

  try {
    let apiResponse = {};
    if (newObjData._id === null) {
      apiResponse = await axios.post(
        `${ServerURI}/api/v1/employee`,
        newObjData
      );
      // console.log("L-327, apiResponse: newAppointment--->", apiResponse?.data);
    } else {
      apiResponse = await axios.put(
        `${ServerURI}/api/v1/employee/${newObjData._id}`,
        newObjData
      );
      // console.log("L-333 apiResponse for existEmployee", apiResponse?.data);
    }
    if (
      apiResponse?.data?.status == 200 ||
      apiResponse?.data?.status == 201 ||
      apiResponse?.data?.status == 400 ||
      apiResponse?.data?.status == 409 ||
      apiResponse?.data?.status == 500
    ) {
      revalidatePath("/");
      return { message: `${apiResponse?.data?.message}` };
    } else {
      return { message: `something went wrong !` };
    }
  } catch (error) {
    console.log("L-348, error:", error);
    return { message: "Failed to create Booking" };
  }
}
