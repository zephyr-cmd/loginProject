const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      firstName: {
        type: String,
        default: "",
        trim: true,
      },
      lastName: {
        type: String,
        default: "",
        trim: true,
      },
      alias: {
        type: String,
        default: "",
        trim: true,
      },
    },
    phoneNumber: {
      type: Number,
      default: "",
      unique: true,
      required: [true, "Please provide a valid Phone Number"],
    },
    email: {
      type: String,
      default: "",
      lowercase: true,
      trim: true,
    },
    gender: {
      type: String,
      default: null,
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
    address: {
      houseNumber: {
        type: String,
        default: "",
      },
      line1: {
        type: String,
        default: "",
      },
      line2: {
        type: String,
        default: "",
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
        default: "",
      },
      landMark: {
        type: String,
        default: "",
      },
    },
    password: {
      type: String,
    },
    profileImage: {
      type: String,
      default: "",
    },
    role: [],
    otpCode: {
      // OTP for registration
      type: String,
    },
    otpCodeExpiration: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: true,
    },
    token: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.models.adminSchema ||
  mongoose.model("adminSchema", schema);
