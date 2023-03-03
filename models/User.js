const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
    street: String,
    houseNumber: String,
    zipCode: Number,
    residence: String,
    balance: { type: Number, required: true },
    invoices: {
      type: [Schema.Types.ObjectId],
      ref: "Invoice",
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
