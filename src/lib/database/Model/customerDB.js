const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    phoneNumber: {
      type: Number,
      required: true,
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      default: "",
      required: true,
    },
    scheduledAppointment: { type: Boolean },
    appointmentDate: {
      type: Date,
      require: true,
    },
    followUpDate: {
      type: Date,
    },
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
    totalVisits: {
      type: Number,
      default: 0,
    },
    requestFor: { type: String, default: "" },
    isPaymentOnline: { type: Boolean, default: false },
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

// const SubSchema = new mongoose.Schema({
//   appointmentDate: Date,
//   amount: Number,
//   amountPaid: Boolean,
//   doctorName: String,
// });

export default mongoose.models.Customer || mongoose.model("Customer", schema);
