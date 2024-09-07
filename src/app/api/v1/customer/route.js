import { NextResponse } from "next/server";
import { DBConnect } from "@/lib/database/db";
import AppointmentDB from "@/lib/database/Model/appointmentDB";
import CustomerDB from "@/lib/database/Model/customerDB";
import { generateUniqueId } from "@/components/helper/uniqueId";

export async function GET(request) {
  await DBConnect();
  const res = await CustomerDB.find({});
  // console.log("L-8, inside post function", res);
  return NextResponse.json({
    status: 200,
    docLength: res.length,
    data: res,
  });
}

export async function POST(request) {
  try {
    await DBConnect();
    const data = await request.json();
    let customer = await CustomerDB.findOneAndUpdate(
      { phoneNumber: data.phoneNumber },
      {
        $set: {
          scheduledAppointment: true,
          name: data.name,
          phoneNumber: data.phoneNumber,
          appointmentDate: data.appointmentDate,
          requestFor: data.requestFor,
        },
      },
      { new: true, upsert: true }
    );
    try {
      // Create a new booking
      const newBooking = new AppointmentDB({
        customer: customer._id,
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
