const router = require("express").Router();
const {
  createNewInvoiceController,
  generateInvoiceCodeController,
  updateInvoiceStatusController,
  getInvoiceByCodeController,
  getAllInvoicesBySenderAndReceiver,
} = require("../controllers/invoiceController");
const checkAuth = require("../middlewares/authMiddleware");

// get all invoices by receiver and sender
router.get("/", checkAuth, getAllInvoicesBySenderAndReceiver);

// get invoice by code
router.get("/:code", checkAuth, getInvoiceByCodeController);

// create new invoice
router.post("/", checkAuth, createNewInvoiceController);

// generate new invoice code
router.patch("/:id", checkAuth, generateInvoiceCodeController);

// update invoice status
router.patch("/update-status/:id", checkAuth, updateInvoiceStatusController);

module.exports = router;
