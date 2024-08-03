const Transaction = require("../models/TransactionModel"); // Adjust the path if needed
const User = require("../models/UserSchema"); // Adjust the path if needed
const moment = require("moment");
const fs = require('fs');
const { generateTransactionPDF } = require("../Utils/pdfGeneraort");
const path = require('path');
const puppeteer = require('puppeteer');
const chrome = require('chrome-aws-lambda');
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
  const { htmlContent } = req.body;

  if (!htmlContent) {
    return res.status(400).json({ error: 'HTML content is required' });
  }

  let browser;
  try {
    console.log("Inside try block");
    const options = {
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-web-security',
        '--hide-scrollbars'
      ],
      defaultViewport: chrome.defaultViewport,
      executablePath: process.env.CHROME_EXECUTABLE_PATH || await chrome.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    };

    browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({ format: 'A4' });

    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
  } catch (err) {
    // console.error('Error generating PDF:', err.message);
    console.log(err)
    res.status(500).json({ error: 'Error generating PDF' });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

module.exports = {
  generateReportController
};






module.exports = {
  addTransactionController,
  getAllTransactionController,
  deleteTransactionController,
  updateTransactionController,
  generateReportController 

};
