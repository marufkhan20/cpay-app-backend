const Invoice = require("../models/Invoice");
const generateCode = require("../services/generateCode");
const User = require("../models/User");

// get all invoices by sender and receiver controller
const getAllInvoicesBySenderAndReceiver = async (req, res) => {
  try {
    const { _id } = req.user || {};

    const invoices = await Invoice.find({
      $or: [{ receiver: _id }, { sender: _id }],
    })
      .sort({ updatedAt: -1 })
      .populate("receiver");

    res.status(200).json(invoices);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred!!",
    });
  }
};

// get invoice by code controller
const getInvoiceByCodeController = async (req, res) => {
  try {
    const { code } = req.params || {};
    const invoice = await Invoice.findOne({ code }).populate([
      "receiver",
      "sender",
    ]);

    if (invoice?._id) {
      res.status(200).json(invoice);
    } else {
      res.status(200).json({ notFound: true });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred !!",
    });
  }
};

// get invoice by id controller
const getInvoiceByIdController = async (req, res) => {
  try {
    const { id } = req.params || {};
    const invoice = await Invoice.findById(id).populate(["receiver", "sender"]);
    res.status(200).json(invoice);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred!!",
    });
  }
};

// create new invoice controller
const createNewInvoiceController = async (req, res) => {
  try {
    const { receiver, date, amount, description } = req.body || {};
    const { _id } = req.user || {};

    // create new invoice
    const newInvoice = new Invoice({
      receiver,
      sender: _id,
      date,
      amount: Number(amount),
      description,
      createdDate: Date.now(),
    });

    await newInvoice.save();

    res.status(201).json(newInvoice);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred!!",
    });
  }
};

// generate invoice code controller
const generateInvoiceCodeController = async (req, res) => {
  try {
    const { id } = req.params || {};
    console.log("id");

    // generate random 8 character string
    const code = generateCode();

    const updatedInvoice = await Invoice.findByIdAndUpdate(
      id,
      {
        $set: { code },
      },
      { new: true }
    );

    res.status(200).json(updatedInvoice);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred!",
    });
  }
};

// update invoice status controller
const updateInvoiceStatusController = async (req, res) => {
  try {
    const { status } = req.body || {};
    const { id } = req.params || {};
    const { _id } = req.user || {};

    const updatedInvoice = await Invoice.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );

    // calculate discount amount
    const discountAmount =
      Number(updatedInvoice?.amount) -
      Number(updatedInvoice?.amount) * +Number("0." + updatedInvoice?.discount);

    // update user balance
    if (status === "accepted") {
      const user = await User.findById(_id);
      user.balance = user?.balance + Number(discountAmount);
      await user.save();
    }

    res.status(200).json(updatedInvoice);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error occurred!!",
    });
  }
};

module.exports = {
  getAllInvoicesBySenderAndReceiver,
  getInvoiceByCodeController,
  getInvoiceByIdController,
  createNewInvoiceController,
  generateInvoiceCodeController,
  updateInvoiceStatusController,
};
