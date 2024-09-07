import { NextResponse } from "next/server";
import { DBConnect } from "@/lib/database/db";
import subscriberDB from "@/lib/database/Model/subscriberDB";

export async function GET(request) {
  await DBConnect();
  const res = await subscriberDB.find();
  //   console.log("L-8, inside GET Lambda-function", res);
  return NextResponse.json({
    stauts: 200,
    data: { docLength: res.length, data: res },
  });
}

export async function POST(request) {
  await DBConnect();
  let { email } = await request.json();
  email = email.trim().toLowerCase();
  const res = await subscriberDB.findOneAndUpdate(
    { email: email },
    { $set: { isSubscribed: true } },
    { new: true, upsert: true }
  );
  //   console.log("L-24, inside POST Lambda-function", res);
  return NextResponse.json({ stauts: 200, data: res });
}

export async function DELETE(request) {
  await DBConnect();
  const { email } = await request.json();
  const res = await subscriberDB.findOneAndDelete({ email });
  if (res) {
    return NextResponse.json({ stauts: 200, data: res.length });
  } else {
    return NextResponse.json({ stauts: 200, data: "no document to delete" });
  }
}
