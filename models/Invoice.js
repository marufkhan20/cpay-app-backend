const { Schema, model } = require("mongoose");

const invoiceSchema = new Schema(
  {
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    date: String,
    amount: {
      type: Number,
      requried: true,
    },
    description: String,
    code: String,
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "rejected", "approved"],
    },
    createdDate: Number,
  },
  { timestamps: true }
);

const Invoice = model("Invoice", invoiceSchema);

module.exports = Invoice;
