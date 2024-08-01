const express = require('express');
const pdfController = require('../controllers/pdfController');
const pdfRouter = express.Router();
pdfRouter.post('/pdfGenerate', pdfController);
module.exports = pdfRouter;
//