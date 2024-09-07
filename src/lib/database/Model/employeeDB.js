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
    name: {
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
    designation: { type: String, default: "" }, // Doctor/Nurse/etc
    qualification: { type: String, default: "" }, // MBBS/BDS/GNM/ANM
    specialization: { type: String, default: "" }, //Gynecologist/Dermatologist*
    about: { type: String, default: "" },
    isEmployee: { type: Boolean, default: false },
    role: { type: String, default: "user" },
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

export default mongoose.models.Employee || mongoose.model("Employee", schema);
