import { NextResponse } from "next/server";
import { DBConnect } from "@/lib/database/db";
import AppointmentDB from "@/lib/database/Model/appointmentDB";
import CustomerDB from "@/lib/database/Model/customerDB";
import { generateUniqueId } from "@/components/helper/uniqueId";
import { getNthDate } from "@/components/helper/dateConversion";
import { jwtTokenVerification } from "@/components/helper/utils";
import employeeDB from "@/lib/database/Model/employeeDB";

export async function PUT(request) {
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
    const { selectedDate } = await request.json();
    // const date = "2024-06-04T00:00:00.000Z";
    // const selectedDate = new Date(date);
    if (!selectedDate) {
      return NextResponse.json(
        {
          message: "Date is not defined",
        },
        { status: 404 }
      );
    }
    let endOfDay = await new Date(getNthDate(selectedDate, +1));

    console.log("L-24, selectedDate - ", selectedDate, ":: next Day", endOfDay);

    const res = await AppointmentDB.aggregate([
      {
        $match: {
          amountPaid: true,
          appointmentDate: {
            $gte: new Date(selectedDate),
            $lte: endOfDay,
          },
        },
      },
      {
        $sort: {
          appointmentDate: -1,
        },
      },
      {
        $project: {
          _id: 0,
          appointmentId: 1,
          appointmentDate: 1,
          name: 1,
          age: 1,
          gender: 1,
          phoneNumber: 1,
          requestFor: 1,
          amount: 1,
        },
      },
    ]);
    // console.log("L-55, inside post function", res);
    return NextResponse.json(
      {
        status: 200,
        message: "Data fetched Successfully",
        docLength: res.length,
        data: res,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("L-53 ", error);
    return NextResponse.json(
      {
        message: "something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await DBConnect();
    const data = await request.json();
    const appointmentCount = await AppointmentDB.countDocuments({
      phoneNumber: data.phoneNumber,
    });
    let customer = await CustomerDB.findOneAndUpdate(
      { phoneNumber: data.phoneNumber },
      {
        $set: {
          scheduledAppointment: true,
          name: data.name,
          phoneNumber: data.phoneNumber,
          appointmentDate: data?.appointmentDate || new Date(),
          requestFor: data.requestFor,
          totalVisits: appointmentCount,
        },
      },
      { new: true, upsert: true }
    );
    try {
      // Create a new booking
      const newBooking = new AppointmentDB({
        customerId: customer._id,
        appointmentId: generateUniqueId(4),
        name: data.name,
        phoneNumber: data.phoneNumber,
        appointmentDate: data.appointmentDate,
        requestFor: data.requestFor,
      });
      // Save the booking
      await newBooking.save();
      return NextResponse.json({ status: 201, data: newBooking });
    } catch (error) {
      console.log("Error: ", error);
      return NextResponse.json({ status: 400, data: "something went wrong" });
    }
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({ status: 400, data: "something went wrong" });
  }
}

export async function DELETE(request) {
  await DBConnect();
  const { _id } = await request.json();
  const res = await AppointmentDB.findOneAndDelete({ _id });
  if (res) {
    return NextResponse.json({
      status: 200,
      Message: "Successfully Record Deleted",
    });
  } else {
    return NextResponse.json({ status: 200, Message: "No document to delete" });
  }
}
