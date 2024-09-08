import { NextResponse } from "next/server";
import { DBConnect } from "@/lib/database/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import EmployeeDB from "@/lib/database/Model/employeeDB";
import userDB from "@/lib/database/Model/userDB";
const { securityKey } = process.env;

export async function GET(request, content) {
  try {
    await DBConnect();
    console.log("L-172, inside get function ");
    const { _id } = await content.params;
    // const { searchParams } = new URL(request.url);
    // const userId = searchParams.get("userId");

    if (!_id) {
      return NextResponse.json({
        status: 400,
        message: "User ID is required",
        data: {},
      });
    }

    // Find user by ID
    const user = await userDB.findById(_id);
    if (!user) {
      return NextResponse.json({
        status: 404,
        message: "User not found",
        data: {},
      });
    }

    // Respond with user details
    return NextResponse.json({
      status: 200,
      success: true,
      message: "User details retrieved successfully",
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        sport: user.sport,
        youtubeLink: user.youtubeLink,
        message: user.message,
      },
    });
  } catch (error) {
    console.error("Error retrieving user details:", error.message);
    return NextResponse.json({
      status: 500,
      message: "Something went wrong",
      error: error.message,
      data: {},
    });
  }
}

export async function PUT(request, content) {
  try {
    await DBConnect();
    const { _id } = await content.params;

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      dateOfBirth,
      gender,
      sport,
      youtubeLink,
      message,
    } = await request.json();

    // Find user by ID
    let user = await userDB.findById(_id);
    if (!user) {
      return NextResponse.json({
        status: 404,
        message: "User not found",
        data: {},
      });
    }

    // Update user fields
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.dateOfBirth = dateOfBirth;
    user.gender = gender;
    user.sport = sport;
    user.youtubeLink = youtubeLink;
    user.message = message;

    // Save updated user
    await user.save();

    return NextResponse.json({
      status: 200,
      success: true,
      message: "User updated successfully",
      data: {
        userId: user._id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error) {
    console.error("Error updating user:", error.message);
    return NextResponse.json({
      status: 500,
      message: "Something went wrong",
      error: error.message,
      data: {},
    });
  }
}
