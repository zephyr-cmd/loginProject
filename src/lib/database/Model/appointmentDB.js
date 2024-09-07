const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    appointmentId: String,
    name: String,
    phoneNumber: String,
    appointmentDate: Date,
    requestFor: { type: String, default: "" },
    doctorName: String,
    amount: { type: Number },
    amountPaid: { type: Boolean, default: false },
    isPaymentOnline: { type: Boolean, default: false },
    isClientBooked: { type: Boolean, default: false },
    age: { type: Number },
    gender: { type: String },
    weight: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.models.AppointmentBook ||
  mongoose.model("AppointmentBook", schema);
