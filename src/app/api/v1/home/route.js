import { NextResponse } from "next/server";
import { DBConnect } from "@/lib/database/db";
import AppointmentDB from "@/lib/database/Model/appointmentDB";
import CustomerDB from "@/lib/database/Model/customerDB";
import { generateUniqueId } from "@/components/helper/uniqueId";

export async function POST(request) {
  try {
    await DBConnect();
    const data = await request.json();
    let appointmentCount = await AppointmentDB.countDocuments({
      phoneNumber: data.phoneNumber,
      amountPaid: true,
    });
    if (data.amountPaid) {
      appointmentCount += 1;
    }
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
          totalVisits: appointmentCount,
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
        gender: data.gender,
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
      await newBooking.save();
      return NextResponse.json({ status: 201, data: newBooking });
    } catch (error) {
      console.log("Error: ", error);
      return NextResponse.json({
        status: 400,
        data: "Appointment Creation Failed",
      });
    }
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({ status: 400, data: "Something Went Wrong" });
  }
}
