const express = require('express');
const router = express.Router();
const { Wallet } = require("../models/Wallet");


router.post('/uploadTask', async (req, res) => {
    const {user_id, taskData} = req.body;
    const wallet = await Wallet.findOne({  });

});