import { NextResponse } from "next/server";
import { DBConnect } from "@/lib/database/db";
import bcrypt from "bcrypt";
import userDB from "@/lib/database/Model/userDB";
const { saltRounds } = process.env;
// const bcrypt = require("bcryptjs");

export async function POST(request) {
  try {
    await DBConnect();
    let { firstName, lastName, sport, phoneNumber, email, password } =
      await request.json();
    console.log("L-12, createStudentSer--------------->", phoneNumber);
    const otpCode = generateOTP();

    let user = await userDB.findOne({ email });
    if (user) {
      return NextResponse.json({
        status: 409,
        message: "User already registered, Kindly signIn",
        data: {},
      });
    } else if (!user) {
      const salt = await bcrypt.genSalt(Number(saltRounds));
      const hashed = await bcrypt.hash(password, salt);
      let newUser = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email,
        password: hashed,
        sport,
        otpCode: `${otpCode}`,
        isVerified: true,
        otpCodeExpiration: currentTime(15),
      };
      console.log(
        "L-35, -----------------else if / createStudentSer--------------->",
        newUser
      );
      const savedUser = await userDB.create(newUser);
      if (!savedUser) {
        return NextResponse.json({
          status: 500,
          message:
            "something went wrong :  signUp failed, Please try again later ",
          data: {},
        });
      }
      if (savedUser) {
        // sms msg91
        // sample textMessage = `Dear ${firstName}, Your OTP for registration is ${otpCode} and is valid up to 15 minutes at easyhaionline.com`
        let mobileNo = `91${phoneNumber}`;
        console.log(
          "L-61 , user Created phoneNumber & otp----->",
          mobileNo,
          "**&**",
          savedUser.otpCode
        );
        // msgService(firstName, mobileNo, otpCode)

        return NextResponse.json({
          status: 201,
          message: "Successfully created the user",
          data: savedUser,
        });
      }
    }
  } catch (err) {
    console.log(err.message);
    return NextResponse.json({
      status: 400,
      message: "Something went wrong",
      data: {},
    });
  }
}

let generateOTP = () => {
  const digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

function currentTime(extraTime) {
  var currentTime = new Date();
  // var currentOffset = new Date().getTimezoneOffset();
  var currentOffset = 0;
  var ISTOffset = 330; // IST offset UTC +5:30
  var created_at = new Date(
    currentTime.getTime() + (ISTOffset + currentOffset) * 60000
  );
  created_at.setMinutes(created_at.getMinutes() + extraTime);
  console.log("L-98, created_at + 15min", created_at);
  return created_at;
}
