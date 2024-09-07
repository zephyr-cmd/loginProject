import { NextResponse } from "next/server";
import { DBConnect } from "@/lib/database/db";
import AppointmentDB from "@/lib/database/Model/appointmentDB";
import CustomerDB from "@/lib/database/Model/customerDB";
import { generateUniqueId } from "@/components/helper/uniqueId";

export async function DELETE(request, content) {
  await DBConnect();
  const { _id } = await content.params;
  const res = await CustomerDB.findOneAndDelete({ _id });
  if (res) {
    return NextResponse.json({
      status: 200,
      Message: "Successfully Record Deleted",
    });
  } else {
    return NextResponse.json({ status: 200, Message: "No document to delete" });
  }
}

export async function PUT(request, content) {
  await DBConnect();
  const { _id } = await content.params;
  const customerData = await request.json();
  console.log("L-25, api customer update, ", customerData);
  try {
    const isCustomerExist = await CustomerDB.findOne({ _id });
    console.log("L-28, api customer update, ", isCustomerExist.name);
    if (isCustomerExist) {
      await CustomerDB.findOneAndUpdate(
        { _id },
        {
          $set: {
            name: customerData?.name || isCustomerExist.name,
            phoneNumber:
              customerData?.phoneNumber || isCustomerExist.phoneNumber,
            dateOfBirth:
              customerData?.dateOfBirth || isCustomerExist.dateOfBirth,
            gender: customerData?.gender || isCustomerExist.gender,
            bloodGroup: customerData?.bloodGroup || isCustomerExist.bloodGroup,
            address: {
              houseNumber:
                customerData?.houseNumber || isCustomerExist.houseNumber,
              street: customerData?.street || isCustomerExist.street,
              city: customerData?.city || isCustomerExist.city,
              pinCode: customerData?.pinCode || isCustomerExist.pinCode,
              state: customerData?.state || isCustomerExist.state,
              country: customerData?.country || isCustomerExist.country,
            },
          },
        },
        { new: true }
      );
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
