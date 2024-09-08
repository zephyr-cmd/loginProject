import { NextResponse } from "next/server";
import { DBConnect } from "@/lib/database/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import EmployeeDB from "@/lib/database/Model/employeeDB";
import userDB from "@/lib/database/Model/userDB";
const { securityKey } = process.env;

//API : Login Admin
export async function POST(request) {
  try {
    await DBConnect();
    let { email, phoneNumber, password } = await request.json();
    // console.log("L-15, login employee--------------->", email);
    // console.log("L-14, login PrivateKey--------------->", securityKey);
    let user = await userDB.findOne({
      isVerified: true,
      $or: [{ phoneNumber: phoneNumber }, { email: email }],
    });
    if (!user) {
      return NextResponse.json({
        status: 403,
        message: "No valid User, Kindly contact Admin",
        data: {},
      });
    }

    const passwordMatch = await bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({
        status: 401,
        message:
          "Invalid credentials, please signin with correct id & password",
        data: {},
      });
    }
    const token = jwt.sign(
      {
        userId: user._id,
        name: user.name,
      },
      securityKey,
      { expiresIn: "360h" }
    );
    user.token = token;
    await user.save();
    return NextResponse.json({
      status: 200,
      success: true,
      message: "Successfully loggedIn",
      data: {
        userId: user._id,
        // phoneNumber: user.phoneNumber,
        // email: user.email,
        _id: user._id,
        token: user.token,
      },
    });
  } catch (error) {
    console.log("L-58", error.message);
    return NextResponse.json({
      stauts: 200,
      error: error.message,
      message: "Something went wrong",
      data: {},
    });
  }
}

// API : logout Admin
export async function PUT(request) {
  try {
    await DBConnect();
    const { phoneNumber, email, token, userId } = await request.json();
    await EmployeeDB.findOneAndUpdate(
      {
        $or: [
          { phoneNumber: phoneNumber },
          { email: email },
          { token: token },
          { _id: userId },
        ],
      },
      { token: null }
    );
    return NextResponse.json(
      {
        status: 200,
        message: "Successfully logged out the user",
        data: {},
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({
      status: 500,
      error: error.message,
      message: "Something went wrong",
      data: {},
    });
  }
}
