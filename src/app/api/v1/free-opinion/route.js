import { NextResponse } from "next/server";
import { DBConnect } from "@/lib/database/db";
import CustomerDB from "@/lib/database/Model/customerDB";

export async function GET(request) {
  await DBConnect();
  const res = await CustomerDB.find({ SalesLead: true });
  // console.log("L-8, inside GET Lambda-function", res);
  return NextResponse.json({
    status: 200,
    docLength: res.length,
    data: res,
  });
}

export async function POST(request) {
  await DBConnect();
  const { phoneNumber } = await request.json();
  console.log(phoneNumber);
  let res = await CustomerDB.findOneAndUpdate(
    { phoneNumber: phoneNumber },
    { SalesLead: true },
    { upsert: true, new: true }
  );
  // console.log("L-24, inside POST Lambda-function", res);
  return NextResponse.json({ status: 200, data: res });
}

export async function DELETE(request) {
  await DBConnect();
  const { phoneNumber } = await request.json();
  const res = await CustomerDB.findOneAndDelete({ phoneNumber });
  if (res) {
    return NextResponse.json({ status: 200, message: "Successfully Deleted" });
  } else {
    return NextResponse.json({ status: 200, Message: "No Document to delete" });
  }
}
