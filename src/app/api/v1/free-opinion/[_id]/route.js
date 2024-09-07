import { NextResponse } from "next/server";
import { DBConnect } from "@/lib/database/db";
import AppointmentDB from "@/lib/database/Model/appointmentDB";
import CustomerDB from "@/lib/database/Model/customerDB";
import { generateUniqueId } from "@/components/helper/uniqueId";

export async function PATCH(request, content) {
  await DBConnect();
  const { _id } = await content.params;
  const res = await CustomerDB.findOneAndUpdate(
    { _id: _id },
    { SalesLead: false },
    { upsert: true, new: true }
  );
  if (res) {
    return NextResponse.json({
      status: 200,
      Message: "Successfully Record Deleted",
    });
  } else {
    return NextResponse.json({ status: 200, Message: "No document to delete" });
  }
}
