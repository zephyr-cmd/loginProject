import { NextResponse } from "next/server";
import { DBConnect } from "@/lib/database/db";
// import AppointmentDB from "@/app/lib/Model/appointmentDB";
// import CustomerDB from "@/app/lib/Model/customerDB";
import { generateUniqueId } from "@/components/helper/uniqueId";
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
  // console.log("L-21, pageNumber--------->", pageNumber);
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
      role: "admin",
    });
    if (!authorizedUser) {
      return NextResponse.json(
        {
          message: "You are not authorized to access this Route",
        },
        { status: 403 }
      );
    }
    let [employeeCounts, results] = await Promise.all([
      employeeDB.countDocuments({ isEmployee: true, isBlocked: false }),
      employeeDB.aggregate([
        {
          $match: {
            isEmployee: true,
            isBlocked: false,
          },
        },
        {
          $sort: {
            createdAt: -1,
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
            name: 1,
            profileImage: 1,
            phoneNumber: 1,
            // email: 1,
            designation: 1,
            qualification: 1,
            specialization: 1,
            dateOfBirth: 1,
            gender: 1,
          },
        },
      ]),
    ]);
    return NextResponse.json(
      {
        status: 200,
        totalPages: Math.ceil(employeeCounts / limit),
        count: employeeCounts,
        results,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("L-82, error :", error);
    return NextResponse.json(
      {
        status: 500,
        message: "Something Went Wrong",
      },
      { status: 500 }
    );
  }
}
