import { NextResponse } from "next/server";
import { DBConnect } from "@/lib/database/db";
import employeeDB from "@/lib/database/Model/employeeDB";
import { jwtTokenVerification } from "@/components/helper/utils";

export async function DELETE(request, content) {
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
    // console.log("L-32, authorizedUser----------->", authorizedUser);
    if (!authorizedUser) {
      return NextResponse.json(
        {
          message: "You are not authorized to access this Route",
        },
        { status: 403 }
      );
    }
    const { _id } = await content.params;
    const res = await employeeDB.findOneAndUpdate(
      { _id, isEmployee: true },
      { isEmployee: false }
    );
    if (res) {
      return NextResponse.json(
        {
          status: 200,
          message: "Successfully Record Deleted",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          status: 200,
          message: "No document to delete",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log("L-64, error :", error);
    return NextResponse.json(
      {
        status: 500,
        message: "Something Went Wrong",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request, content) {
  await DBConnect();
  const { _id } = await content.params;
  const employeeData = await request.json();
  // console.log("L-25, api customer update, ", employeeData);
  try {
    const isEmployeeExist = await employeeDB.findOne({ _id });
    if (isEmployeeExist) {
      let updatedEmployee = await employeeDB.findOneAndUpdate(
        { _id },
        {
          $set: {
            name: employeeData?.name || isEmployeeExist.name,
            profileImage:
              employeeData?.profileImage || isEmployeeExist.profileImage,
            phoneNumber:
              employeeData?.phoneNumber || isEmployeeExist.phoneNumber,
            email: employeeData?.email || isEmployeeExist.email,
            dateOfBirth:
              employeeData?.dateOfBirth || isEmployeeExist.dateOfBirth,
            gender: employeeData?.gender || isEmployeeExist.gender,
            bloodGroup: employeeData?.bloodGroup || isEmployeeExist.bloodGroup,
            designation:
              employeeData?.designation || isEmployeeExist.designation,
            qualification:
              employeeData?.qualification || isEmployeeExist.qualification,
            specialization:
              employeeData?.specialization || isEmployeeExist.specialization,
            address: {
              houseNumber:
                employeeData?.houseNumber || isEmployeeExist.houseNumber,
              street: employeeData?.street || isEmployeeExist.street,
              city: employeeData?.city || isEmployeeExist.city,
              pinCode: employeeData?.pinCode || isEmployeeExist.pinCode,
              state: employeeData?.state || isEmployeeExist.state,
              country: employeeData?.country || isEmployeeExist.country,
            },
          },
        },
        { new: true }
      );
      if (updatedEmployee) {
        return NextResponse.json({
          status: 200,
          message: "Employee updated successfully",
        });
      } else {
        return NextResponse.json({
          status: 500,
          message: "Something went wrong !!",
        });
      }
    } else {
      return NextResponse.json({
        status: 400,
        message: "No Record Found for the given Employee",
      });
    }
  } catch (error) {
    console.error("L-78, Error in Update Employee :", error);
    return NextResponse.json({
      status: 500,
      message: "Something went wrong",
    });
  }
}
