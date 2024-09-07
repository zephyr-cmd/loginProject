const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: [true, "Phone Number is required"],
      trim: true,
      unique: true,
      minlength: [10, "Phone Number must be exactly 10 digits long"],
      maxlength: [10, "Phone Number must be exactly 10 digits long"],
      match: [/^\d{10}$/, "Phone Number must be exactly 10 digits long"],
    },
    email: {
      type: String,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    firstName: {
      type: String,
      trim: true,
      default: "",
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      default: "",
      required: true,
    },
    profileImage: { type: String, default: "" },
    gender: {
      type: String,
      // required: true,
    },
    dateOfBirth: {
      type: Date,
      // required: true,
    },
    bloodGroup: {
      type: String,
      // required: true,
    },
    SalesLead: {
      type: Boolean,
      default: false,
    },
    sport: { type: String, default: "" },
    about: { type: String, default: "" },
    // role: { type: String, default: "user" },
    password: {
      type: String,
      default: "",
    },
    otpCode: {
      type: String,
    },
    otpCodeExpiration: {
      type: Date,
    },
    isVerified: {
      //for admin Dashboard Access
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
      default: "",
    },
    address: {
      houseNumber: {
        type: String,
        default: "",
      },
      line1: {
        type: String,
        // default: "",
      },
      line2: {
        type: String,
        // default: "",
      },
      street: {
        type: String,
        default: "",
      },
      city: {
        type: String,
        default: "",
      },
      pinCode: {
        type: String,
        default: "",
      },
      state: {
        type: String,
        default: "",
      },
      country: {
        type: String,
        default: "India",
      },
      landMark: {
        type: String,
        // default: "",
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", schema);
