import { NextResponse } from "next/server";
import { DBConnect } from "@/lib/database/db";
import AppointmentDB from "@/lib/database/Model/appointmentDB";
import { currentDateTime } from "@/components/helper/dateConversion";
import { jwtTokenVerification } from "@/components/helper/utils";
import employeeDB from "@/lib/database/Model/employeeDB";

export async function GET(request) {
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
      role: "admin",
    });
    if (!authorizedUser) {
      return NextResponse.json(
        {
          message: "You are not authorized to access this Route",
        },
        { status: 403 }
      );
    }
    let [
      dailyReports,
      monthlyReports,
      monthlyDepartment,
      monthlyRequestFor,
      annualRequestFor,
    ] = await Promise.all([
      AppointmentDB.aggregate([
        {
          $match: {
            amountPaid: true,
            appointmentDate: {
              $gte: new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                1
              ),
            },
          },
        },
        {
          $addFields: {
            // year: { $year: "$appointmentDate" },
            month: { $month: "$appointmentDate" },
            day: { $dayOfMonth: "$appointmentDate" },
          },
        },
        {
          $group: {
            _id: {
              // year: "$year",
              month: "$month",
              day: "$day",
            },
            totalValue: { $sum: "$amount" },
            totalOrders: { $sum: 1 },
          },
        },
        {
          $sort: {
            // "_id.year": 1,
            "_id.month": 1,
            "_id.day": 1,
          },
        },
        {
          $project: {
            _id: 0,
            // year: "$_id.year",
            month: "$_id.month",
            day: "$_id.day",
            totalValue: 1,
            totalOrders: 1,
          },
        },
      ]),
      AppointmentDB.aggregate([
        {
          $match: {
            amountPaid: true,
            appointmentDate: {
              $gte: new Date(
                new Date().getFullYear(),
                new Date().getMonth() - 5,
                1
              ),
            },
          },
        },
        {
          $addFields: {
            year: { $year: "$appointmentDate" },
            month: { $month: "$appointmentDate" },
          },
        },
        {
          $group: {
            _id: { year: "$year", month: "$month" },
            totalValue: { $sum: "$amount" },
            totalOrders: { $sum: 1 },
          },
        },
        {
          $sort: { "_id.year": 1, "_id.month": 1 },
        },
        {
          $project: {
            _id: 0,
            year: "$_id.year",
            month: "$_id.month",
            totalValue: 1,
            totalOrders: 1,
          },
        },
      ]),
      AppointmentDB.aggregate([
        {
          $match: {
            amountPaid: true,
            appointmentDate: {
              $gte: new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                1
              ),
              $lte: new Date(currentDateTime()),
            },
          },
        },
        {
          $group: {
            _id: "$doctorName",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
        {
          $project: {
            _id: 0,
            type: "$_id",
            count: 1,
          },
        },
      ]),
      AppointmentDB.aggregate([
        {
          $match: {
            amountPaid: true,
            appointmentDate: {
              $gte: new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                1
              ),
              $lte: new Date(currentDateTime()),
            },
          },
        },
        {
          $group: {
            _id: "$requestFor",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
        {
          $project: {
            _id: 0,
            type: "$_id",
            count: 1,
          },
        },
      ]),
      AppointmentDB.aggregate([
        {
          $match: {
            amountPaid: true,
            // appointmentDate: {
            //   $gte: new Date(new Date().getFullYear(), 0, 1, 5, 30),
            //   $lte: new Date(currentDateTime()),
            // },
          },
        },
        {
          $group: {
            _id: "$requestFor",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
        {
          $project: {
            _id: 0,
            type: "$_id",
            count: 1,
          },
        },
      ]),
    ]);

    console.log(
      "L-230, startYear",
      new Date(new Date().getFullYear(), 0, 1),
      "::",
      new Date(new Date().getFullYear(), 0, 1, 5, 30),
      "::",
      ", startMonth: ",
      new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      "::",
      new Date(new Date().getFullYear(), new Date().getMonth(), 1, 5, 30),
      "& currentTime----->:",
      currentDateTime()
    );
    return NextResponse.json(
      {
        status: 200,
        dailyReports,
        monthlyReports,
        monthlyDepartment,
        monthlyRequestFor,
        annualRequestFor,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("L-297, error :", error);
    return NextResponse.json(
      {
        status: 500,
        message: "Something Went Wrong",
      },
      { status: 500 }
    );
  }
}
