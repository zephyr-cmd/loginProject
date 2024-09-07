const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    phoneNumber: {
      type: Number,
      unique: true,
      trim: true,
      required: true,
    },
    SalesLead: {
      type: Boolean,
      default: false,
    },
    patientFirstName: {
      type: String,
      default: "",
    },
    patientLastName: {
      type: String,
      default: "",
    },
    DoctorName: {
      type: Array,
    },
    Age: {
      type: Number,
    },
    Gender: {
      type: String,
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

export default mongoose.models.FreeOpinion ||
  mongoose.model("FreeOpinion", schema);
