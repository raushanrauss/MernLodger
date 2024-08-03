const express = require('express');
const {
    addTransactionController,
    deleteTransactionController,
    getAllTransactionController,
    updateTransactionController,
    generateReportController
} = require('../controllers/transactionController'); // Adjust the path if needed

const router = express.Router();

router.route('/addTransaction').post(addTransactionController);

router.route('/getTransaction').post(getAllTransactionController);

router.route('/deleteTransaction/:id').post(deleteTransactionController);

router.route('/updateTransaction/:id').put(updateTransactionController);



module.exports = router;
