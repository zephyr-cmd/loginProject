import { NextResponse } from "next/server";
import { DBConnect } from "@/lib/database/db";
import AppointmentDB from "@/lib/database/Model/appointmentDB";
import CustomerDB from "@/lib/database/Model/customerDB";
import { generateUniqueId } from "@/components/helper/uniqueId";

const newDay = new Date();
const today = new Date(
  newDay.getFullYear(),
  newDay.getMonth(),
  newDay.getDate(),
  newDay.getHours() + 5,
  newDay.getMinutes() + 30
);
const startDayOfMonth = new Date(
  today.getFullYear(),
  today.getMonth(),
  1,
  0,
  0
);
const startOfDay = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate(),
  0,
  0
);
const previousDay = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 1,
  0,
  0
);
const currentTime = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate(),
  today.getHours(),
  today.getMinutes(),
  today.getSeconds()
);
const endOfDay = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() + 1,
  0,
  0
);

export async function GET(request, content) {
  await DBConnect();
  const { pageNumber } = await content.params;
  // console.log("L-31, pageNumber--------->", startOfDay, previousDay);
  const page = pageNumber || 1; // Page number
  const limit = 10; // Number of documents per page
  const skip = (page - 1) * limit || 0;

  try {
    let [dailyReports, monthlyReports, results] = await Promise.all([
      AppointmentDB.aggregate([
        {
          $match: {
            appointmentDate: {
              $gte: startOfDay,
              $lt: endOfDay,
            },
          },
        },
        {
          $group: {
            _id: null,
            totalCount: { $sum: 1 },
            totalAmount: { $sum: "$amount" },
          },
        },
      ]),
      AppointmentDB.aggregate([
        {
          $match: {
            appointmentDate: {
              $gte: startDayOfMonth,
              $lt: endOfDay,
            },
          },
        },
        {
          $group: {
            _id: null,
            totalCount: { $sum: 1 },
            totalAmount: { $sum: "$amount" },
          },
        },
      ]),
      AppointmentDB.aggregate([
        {
          $match: {
            amountPaid: true,
            appointmentDate: {
              $gte: previousDay,
              $lt: endOfDay,
            },
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
            _id: 0,
            appointmentId: 1,
            name: 1,
            age: 1,
            gender: 1,
            appointmentDate: 1,
            amountPaid: 1,
            phoneNumber: 1,
            requestFor: 1,
            amount: 1,
          },
        },
      ]),
    ]);
    const totalDocuments =
      dailyReports.length > 0 ? dailyReports[0].totalCount : 0;

    // console.log("Total Documents:", dailyReports[0].totalCount);
    // console.log("Results:", results);
    // console.log("L-95, StartOfDay :", startOfDay, "|| endOfDay : ", endOfDay);

    return NextResponse.json({
      status: 200,
      totalPages: Math.ceil(totalDocuments / limit),
      dailyReports,
      monthlyReports,
      results,
      startOfDay,
      previousDay,
      currentTime,
      endOfDay,
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
    let customer = await CustomerDB.findOneAndUpdate(
      { phoneNumber: data.phoneNumber },
      {
        $set: {
          scheduledAppointment: true,
          name: data.name,
          phoneNumber: data.phoneNumber,
          dateOfBirth: data.dateOfBirth,
          bloodGroup: data.bloodGroup,
          gender: data.gender,
          requestFor: data.requestFor || "",
          appointmentDate: data?.appointmentDate || new Date(),
          totalVisits: +1,
          address: {
            houseNumber: data?.houseNumber || "",
            street: data?.street || "",
            city: data?.city || "",
            pinCode: data?.pinCode || "",
            state: data?.state || "",
            country: data?.country || "",
          },
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
        isClientBooked: false,
        doctorName: data.doctorName,
        amount: data.amount,
        weight: data.weight,
        amountPaid: data.amountPaid,
        isPaymentOnline: data.isPaymentOnline,
        age: data.age,
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
