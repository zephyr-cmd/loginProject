import { NextResponse } from "next/server";
import { DBConnect } from "@/lib/database/db";
import AppointmentDB from "@/lib/database/Model/appointmentDB";
// import CustomerDB from "@/app/lib/Model/customerDB";
import employeeDB from "@/lib/database/Model/employeeDB";
import { jwtTokenVerification } from "@/components/helper/utils";

export async function GET(request, content) {
  await DBConnect();
  const authHeader = await request?.headers?.get("authorization");
  if (!authHeader) {
    return NextResponse.json(
      {
        message: "No Token Found.",
      },
      { status: 401 }
    );
  }
  const { pageNumber } = await content.params;
  // console.log("L-20, pageNumber--------->", pageNumber);
  const page = pageNumber || 1;
  const limit = 10;
  const skip = (page - 1) * limit || 0;
  try {
    let jwtVerificaiton = jwtTokenVerification(authHeader);
    if (!jwtVerificaiton.success) {
      return NextResponse.json(
        {
          message: "Token verification failed",
        },
        { status: 401 }
      );
    }
    let authorizedUser = await employeeDB.exists({
      _id: jwtVerificaiton?.decoded?.userId,
      token: authHeader.split(" ")[1],
      // role: "user",
    });
    if (!authorizedUser) {
      return NextResponse.json(
        {
          message: "You are not authorized to access this Route",
        },
        { status: 403 }
      );
    }
    let [appointmentCounts, results] = await Promise.all([
      AppointmentDB.countDocuments({}),
      AppointmentDB.aggregate([
        {
          $match: {
            // amountPaid: true,
          },
        },
        {
          $sort: {
            appointmentDate: -1,
          },
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
        {
          $project: {
            _id: 1,
            appointmentDate: 1,
            appointmentId: 1,
            name: 1,
            phoneNumber: 1,
            requestFor: 1,
            amountPaid: 1,
            amount: 1,
            doctorName: 1,
            age: 1,
            gender: 1,
            weight: 1,
          },
        },
      ]),
    ]);

    // console.log("L-85, Results:", results);

    return NextResponse.json(
      {
        status: 200,
        totalPages: Math.ceil(appointmentCounts / limit),
        count: appointmentCounts,
        results,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("L-94, error :", error);
    return NextResponse.json(
      {
        status: 500,
        message: "Something Went Wrong",
      },
      { status: 500 }
    );
  }
}
