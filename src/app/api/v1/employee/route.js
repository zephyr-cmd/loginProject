import { NextResponse } from "next/server";
import { DBConnect } from "@/lib/database/db";
import { generateUniqueId } from "@/components/helper/uniqueId";
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
        isBlocked: false,
        $or: [{ designation: "doctor" }, { designation: "yogacharya" }],
      }),
      employeeDB.aggregate([
        {
          $match: {
            isEmployee: true,
            isBlocked: false,
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
            profileImage: 1,
            // designation: 1,
            qualification: 1,
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
export async function POST(request) {
  try {
    await DBConnect();
    const data = await request.json();
    let employeeExist = await employeeDB.findOne({
      phoneNumber: data.phoneNumber,
    });
    if (!employeeExist) {
      let employee = await employeeDB.create({
        name: data.name,
        profileImage: data.profileImage,
        email: data.email,
        phoneNumber: data.phoneNumber,
        designation: data.designation,
        specialization: data.specialization,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        bloodGroup: data.bloodGroup,
        qualification: data.qualification,
        address: {
          houseNumber: data?.houseNumber || "",
          street: data?.street || "",
          city: data?.city || "",
          pinCode: data?.pinCode || "",
          state: data?.state || "",
          country: data?.country || "",
        },
        isEmployee: true,
      });
      if (employee) {
        return NextResponse.json({
          status: 201,
          message: "Successfully Employee Created",
          data: employee,
        });
      } else {
        console.log("Error: ", error);
        console.log("L-146, ", error);
        return NextResponse.json({
          status: 500,
          message: "something went wrong",
        });
      }
    } else {
      return NextResponse.json({
        status: 409,
        message: "Employee Already Exist",
      });
    }
  } catch (error) {
    console.log("L-159, ", error);
    return NextResponse.json({ status: 500, message: "something went wrong" });
  }
}

export async function DELETE(request) {
  await DBConnect();
  const { _id } = await request.json();
  const res = await employeeDB.findOneAndDelete({ _id });
  if (res) {
    return NextResponse.json({
      status: 200,
      Message: "Successfully Record Deleted",
    });
  } else {
    return NextResponse.json({ status: 200, Message: "No document to delete" });
  }
}
