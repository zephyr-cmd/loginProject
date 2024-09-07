import { NextResponse } from "next/server";
import { DBConnect } from "@/lib/database/db";
// import AppointmentDB from "@/app/lib/Model/appointmentDB";
import CustomerDB from "@/lib/database/Model/customerDB";
// import employeeDB from "@/app/lib/Model/employeeDB";

export async function GET(request, content) {
  await DBConnect();
  const { pageNumber } = await content.params;
  // console.log("L-10, pageNumber--------->", pageNumber);
  const page = pageNumber || 1; // Page number
  const limit = 10; // Number of documents per page
  const skip = (page - 1) * limit || 0;

  try {
    let [employeeCounts, results] = await Promise.all([
      CustomerDB.countDocuments({}),
      CustomerDB.aggregate([
        {
          $match: {
            // isEmployee: true,
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
            phoneNumber: 1,
            appointmentDate: 1,
            totalVisits: 1,
            dateOfBirth: 1,
            gender: 1,
            bloodGroup: 1,
            address: 1,
          },
        },
      ]),
    ]);

    // console.log("L-53, Results:", results);

    return NextResponse.json({
      status: 200,
      totalCount: employeeCounts,
      totalPages: Math.ceil(employeeCounts / limit),
      docLength: results.length,
      results,
    });
  } catch (error) {
    console.log("L-82, error :", error);
    return NextResponse.json({
      status: 500,
      message: "Something Went Wrong",
    });
  }
}
