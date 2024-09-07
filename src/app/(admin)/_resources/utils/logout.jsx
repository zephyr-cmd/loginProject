"use server";
const { ServerURI } = process.env;

import axios from "axios";
import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

export async function Logout() {
  //   const userId = props.user;
  try {
    const userId = cookies().get("user").value;
    // console.log("L-11, userId-------->", userId, "serverURI :", ServerURI);
    const logOutData = await axios.put(`${ServerURI}/api/v1/admin`, { userId });
    // console.log("L-17, server logout Data----------->", logOutData.status);
    if (logOutData.status == 200) {
      cookies().delete("user");
      cookies().delete("authToken");
    }
  } catch (error) {
    // alert("Something went wrong!");
    console.error("L-21, Error in logout:", error);
  }
  // redirect(`/login`);
}
