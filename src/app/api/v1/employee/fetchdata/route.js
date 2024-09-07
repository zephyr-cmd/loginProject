import { NextResponse } from "next/server";
import { DBConnect } from "@/lib/database/db";
import employeeDB from "@/lib/database/Model/employeeDB";

export async function GET(request, content) {
  await DBConnect();
  // console.log("L-8 inside GET: FetchStaff function");
  // const { pageNumber } = (await content.params) ;
  // const pageNumber = 1;
  // const page = pageNumber || 1; // Page number
  const page = 1; // Page number
  const limit = 15; // Number of documents per page
  const skip = (page - 1) * limit || 0;

  try {
    let [employeeCounts, results] = await Promise.all([
      employeeDB.countDocuments({
        isEmployee: true,
        $or: [{ designation: "doctor" }, { designation: "yogacharya" }],
      }),
      employeeDB.aggregate([
        {
          $match: {
            isEmployee: true,
            $or: [{ designation: "doctor" }, { designation: "yogacharya" }],
          },
        },
        {
          $sort: {
            createdAt: 1,
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
            // profileImage: 1,
            // designation: 1,
            // qualification: 1,
            specialization: 1,
          },
        },
      ]),
    ]);
    return NextResponse.json({
      status: 200,
      totalPages: Math.ceil(employeeCounts / limit),
      count: employeeCounts,
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
