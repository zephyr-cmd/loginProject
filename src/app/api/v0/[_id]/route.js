import { NextResponse } from "next/server";
import ToDoDB from "../../../../lib/database/Model/todo";
import { DBConnect } from "../../../../lib/database/db";

export async function PUT(request, content) {
  const todoId = { _id: content.params._id };
  const data = await request.json();
  console.log("L-10, inside post function", data, todoId);
  DBConnect;
  let res = await ToDoDB.findOneAndUpdate(todoId, data);
  console.log("L-10, inside post function", res);
  return NextResponse.json({ stauts: 200, data: "res" });
}
