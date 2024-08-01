const Transaction = require("../models/TransactionModel"); // Adjust the path if needed
const User = require("../models/UserSchema"); // Adjust the path if needed
const moment = require("moment");
const fs = require('fs');
const { generateTransactionPDF } = require("../Utils/pdfGeneraort");
const path = require('path');
const addTransactionController = async (req, res) => {
  try {
    const {
      title,
      amount,
      description,
      date,
      category,
      userId,
      transactionType,
    } = req.body;

    if (!title || !amount || !description || !date || !category || !transactionType) {
      return res.status(408).json({
        success: false,
        messages: "Please Fill all fields",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    let newTransaction = await Transaction.create({
      title: title,
      amount: amount,
      category: category,
      description: description,
      date: date,
      user: userId,
      transactionType: transactionType,
    });

    user.transactions.push(newTransaction);

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Transaction Added Successfully",
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      messages: err.message,
    });
  }
};

const getAllTransactionController = async (req, res) => {
  try {
    const { userId, type, frequency, startDate, endDate } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const query = {
      user: userId,
    };

    if (type !== 'all') {
      query.transactionType = type;
    }

    if (frequency !== 'custom') {
      query.date = {
        $gt: moment().subtract(Number(frequency), "days").toDate(),
      };
    } else if (startDate && endDate) {
      query.date = {
        $gte: moment(startDate).toDate(),
        $lte: moment(endDate).toDate(),
      };
    }

    const transactions = await Transaction.find(query);

    return res.status(200).json({
      success: true,
      transactions: transactions,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      messages: err.message,
    });
  }
};

const deleteTransactionController = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const userId = req.body.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const transactionElement = await Transaction.findByIdAndDelete(transactionId);

    if (!transactionElement) {
      return res.status(400).json({
        success: false,
        message: "Transaction not found",
      });
    }

    const transactionArr = user.transactions.filter(
      (transaction) => transaction._id.toString() !== transactionId
    );

    user.transactions = transactionArr;

    await user.save();

    return res.status(200).json({
      success: true,
      message: `Transaction successfully deleted`,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      messages: err.message,
    });
  }
};

const updateTransactionController = async (req, res) => {
  try {
    const transactionId = req.params.id;

    const { title, amount, description, date, category, transactionType } = req.body;

    const transactionElement = await Transaction.findById(transactionId);

    if (!transactionElement) {
      return res.status(400).json({
        success: false,
        message: "Transaction not found",
      });
    }

    if (title) transactionElement.title = title;
    if (description) transactionElement.description = description;
    if (amount) transactionElement.amount = amount;
    if (category) transactionElement.category = category;
    if (transactionType) transactionElement.transactionType = transactionType;
    if (date) transactionElement.date = date;

    await transactionElement.save();

    return res.status(200).json({
      success: true,
      message: `Transaction Updated Successfully`,
      transaction: transactionElement,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      messages: err.message,
    });
  }
};

const generateReportController = async (req, res) => {
  try {
    const { userId, startDate, endDate } = req.query;
    console.log(userId, startDate, endDate);

    const user = await User.findById(userId);
    console.log(user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    

    const query = { user: userId };

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const transactions = await Transaction.find(query);
    console.log(transactions);

    if (transactions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No transactions found",
      });
    }

    const reportsDir = path.join(__dirname, '..', 'reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }

    const filePath = path.join(reportsDir, 'transactions_report.pdf');

    await generateTransactionPDF(transactions, filePath);

    res.download(filePath, 'transactions_report.pdf', (err) => {
      if (err) {
        console.error("Error sending file:", err);
        res.status(500).json({ success: false, message: "Error generating PDF" });
      }
    });
  } catch (err) {
    console.error("Server error:", err); // Added logging for server-side errors
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


module.exports = {
  addTransactionController,
  getAllTransactionController,
  deleteTransactionController,
  updateTransactionController,
  generateReportController 

};
