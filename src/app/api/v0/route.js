import { NextResponse } from "next/server";
import ToDoDB from "../../../lib/database/Model/todo";
import { DBConnect } from "../../../lib/database/db";

export async function GET(request) {
  await DBConnect();
  const res = await ToDoDB.find();
  console.log("L-110, inside post function", res);
  return NextResponse.json({
    stauts: 200,
    data: { docLength: res.length, data: res },
  });
}

export async function POST(request) {
  await DBConnect();
  const data = await request.json();
  let res = await ToDoDB.create(data);
  console.log("L-14, inside post function", res);
  return NextResponse.json({ stauts: 201, data: res });
}

export async function DELETE(request) {
  await DBConnect();
  const { _id } = await request.json();
  const res = await ToDoDB.findOneAndDelete({ _id });
  if (res) {
    return NextResponse.json({ stauts: 200, data: res.length });
  } else {
    return NextResponse.json({ stauts: 200, data: "no document to delete" });
  }
}
