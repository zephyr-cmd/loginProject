import { NextResponse } from "next/server";
import { DBConnect } from "@/lib/database/db";
import AppointmentDB from "@/lib/database/Model/appointmentDB";
import employeeDB from "@/lib/database/Model/employeeDB";
import customerDB from "@/lib/database/Model/customerDB";
import { generateUniqueId } from "@/components/helper/uniqueId";
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
    // console.log("L-34, authorizedUser----------->", authorizedUser);
    if (!authorizedUser) {
      return NextResponse.json(
        {
          message: "You are not authorized to access this Route",
        },
        { status: 403 }
      );
    }
    const { _id } = await content.params;
    const res = await AppointmentDB.findOneAndDelete({ _id });
    // const res = await AppointmentDB.findOneAndUpdate(
    //   { _id },
    //   { isClientBooked: false }
    // );
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
  const appointmentData = await request.json();
  try {
    let appointmentCount = await AppointmentDB.countDocuments({
      phoneNumber: appointmentData.phoneNumber,
      amountPaid: true,
    });
    if (appointmentData.amountPaid) {
      appointmentCount += 1;
    }

    const [customer, res] = await Promise.all([
      customerDB.findOneAndUpdate(
        { phoneNumber: appointmentData.phoneNumber },
        { $set: { totalVisits: appointmentCount } },
        {
          new: true,
          projection: { _id: 1, totalVisits: 1 },
        }
      ),
      AppointmentDB.findOneAndUpdate(
        { _id },
        {
          $set: {
            doctorName: appointmentData.doctorName,
            amount: appointmentData.amount,
            gender: appointmentData.gender,
            age: appointmentData.age,
            weight: appointmentData.weight,
            amountPaid: appointmentData.amountPaid,
            isPaymentOnline: appointmentData.isPaymentOnline,
          },
        },
        { new: true }
      ),
    ]);
    if (res) {
      // console.log("L-51, api appointment update, ", res);
      return NextResponse.json({
        status: 200,
        message: "Successfully Record Updated",
      });
    } else {
      return NextResponse.json({
        status: 404,
        message: "Record Updation Failed",
      });
    }
  } catch (error) {
    console.error("Error Appointment Deletion :", error);
    return NextResponse.json({
      status: 500,
      message: "Something went wrong",
    });
  }
}
