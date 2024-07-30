
const express = require('express');
const { addLedge, readLedge } = require('../Controller/ledgeController');
const ledgeRouter = express.Router();
ledgeRouter.post('/add', addLedge);
ledgeRouter.get('/read', readLedge)
module.exports = ledgeRouter;