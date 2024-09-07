"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { dateConversion } from "../helper/dateConversion";
import { cookies } from "next/headers";
let { ServerURI } = process.env;

export async function createSubscriber(prevState, formData) {
  // console.log("L-4, FormData---->", formData);
  // console.log("L-8, PrevState---->", prevState);

  const schema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
  });
  const validatedFields = schema.safeParse({
    email: formData.get("email"),
  });
  // console.log("L-18, validateFields: ", validatedFields.success);
  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please Provide Correct Details",
    };
  }
  const newObjdata = validatedFields.data;

  try {
    const apiResponse = await axios.post(
      `${ServerURI}/api/v1/subscriber`,
      newObjdata
    );
    // console.log("L-33, apiResponse-------->", apiResponse.status);
    revalidatePath("/");
    if (apiResponse.status == 200) {
      revalidatePath("/");
      return { message: `Successfully Subscribed` };
    } else {
      return { message: `something went wrong !` };
    }
  } catch (e) {
    return { message: "Failed to subscribe" };
  }
}

export async function createSecondOpinion(prevState, formData) {
  // console.log("L-47, FormData---->", formData);
  // console.log("L-48, PrevState---->", prevState);

  const schema = z.object({
    phoneNumber: z
      .string()
      .min(10, { message: "Number contains less than 10 digits" })
      .max(10, { message: "number contains more than 10 digits" }),
  });
  const validatedFields = schema.safeParse({
    phoneNumber: formData.get("phoneNumber"),
  });
  // console.log("L-59, validateFields: ", validatedFields.success);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please Provide Correct Details",
    };
  }
  const newObjdata = validatedFields.data;
  try {
    const apiResponse = await axios.post(
      `${ServerURI}/api/v1/free-opinion`,
      newObjdata
    );
    console.log("L-72, apiResponse : ", apiResponse.status);
    revalidatePath("/");
    if (apiResponse.status == 200) {
      return { message: `Successfull, we will back to you soon !!!` };
    } else {
      return { message: `something went wrong !` };
    }
  } catch (e) {
    console.log(`L-83, error form server component : ${e}`);
    return { message: `Failed to create second openion` };
  }
}

export async function loginAction(prevState, formData) {
  // console.log("L-86, FormData---->", formData);
  // console.log("L-87, PrevState---->", prevState);

  const schema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string(),
  });
  const validatedFields = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  // console.log("L-97, validateFields: ", validatedFields.success);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please Provide Correct Details",
    };
  }
  const newObjdata = validatedFields.data;
  try {
    const apiResponse = await axios.post(
      `${ServerURI}/api/v1/admin`,
      newObjdata
    );
    // console.log("L-110, apiResponse : ", apiResponse?.data);
    revalidatePath("/admin");
    if (apiResponse?.data?.status == 200) {
      let actionData = apiResponse?.data?.data;
      // console.log("L-117, apiResponse : ", actionData?.token);
      cookies().set("authToken", actionData?.token);
      cookies().set("user", actionData?.userId);
      return {
        status: apiResponse?.data?.status,
        data: apiResponse?.data?.data,
        message: `Successfull, Logged in`,
      };
    } else {
      return {
        message: ` ${apiResponse?.data?.message}`,
        status: apiResponse?.data?.status,
      };
    }
  } catch (e) {
    console.log(`L-132, error form server component : ${e}`);
    return { message: `Failed to create second openion` };
  }
}
export async function signUpAction(prevState, formData) {
  console.log("L-86, FormData---->", formData);
  // console.log("L-87, PrevState---->", prevState);

  const schema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    phoneNumber: z
      .string()
      .min(10, { message: "Number contains less than 10 digits" })
      .max(10, { message: "number contains more than 10 digits" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string(),
  });
  const validatedFields = schema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    phoneNumber: formData.get("phoneNumber"),
    email: formData.get("email"),
    sport: formData.get("sport"),
    password: formData.get("password"),
  });
  // console.log("L-97, validateFields: ", validatedFields.success);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please Provide Correct Details",
    };
  }
  const newObjdata = validatedFields.data;
  try {
    const apiResponse = await axios.post(
      `${ServerURI}/api/v1/admin/signup`,
      newObjdata
    );
    // console.log("L-110, apiResponse : ", apiResponse?.data);
    revalidatePath("/admin");
    if (apiResponse?.data?.status == 200) {
      let actionData = apiResponse?.data?.data;
      console.log("L-174, apiResponse : ", actionData?.token);
      cookies().set("authToken", actionData?.token);
      cookies().set("user", actionData?.userId);
      return {
        status: apiResponse?.data?.status,
        data: apiResponse?.data?.data,
        message: `Successfull, Logged in`,
      };
    } else {
      return {
        message: ` ${apiResponse?.data?.message}`,
        status: apiResponse?.data?.status,
      };
    }
  } catch (e) {
    console.log(`L-132, error form server component : ${e}`);
    return { message: `Failed to create second openion` };
  }
}

export async function experienceAction(prevState, formData) {
  console.log("L-131, FormData---->", formData);
  // console.log("L-87, PrevState---->", prevState);

  const schema = z.object({
    employeeName: z
      .string()
      .min(5, { message: "Must be 5 or more characters long" }),
    designation: z.string(),
    dateOfJoining: z.coerce.date(),
    dateOfLeaving: z.coerce.date(),
  });
  const validatedFields = schema.safeParse({
    employeeName: formData.get("employeeName"),
    designation: formData.get("designation"),
    dateOfJoining: formData.get("dateOfJoining"),
    dateOfLeaving: formData.get("dateOfLeaving"),
  });
  // console.log("L-97, validateFields: ", validatedFields.success);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please Provide Correct Details",
    };
  }
  const newObjData = validatedFields.data;
  console.log("L-158, new Objects : ", newObjData);
  // revalidatePath("/admin");
  let dOJ = dateConversion(`${newObjData.dateOfJoining}`);
  let dOL = dateConversion(`${newObjData.dateOfLeaving}`);
  // let dOJ = newObjData.dateOfJoiningdate.toLocaleDateString();
  // let dOL = newObjData.dateOfLeaving.toLocaleDateString();
  redirect(
    `/experience/?employeeName=${newObjData.employeeName}&designation=${newObjData.designation}&dateOfJoining=${dOJ}&dateOfLeaving=${dOL}`
  );
  try {
  } catch (e) {
    console.log(`L-174, error form server component : ${e}`);
    return { message: `Failed to create second openion` };
  }
}
