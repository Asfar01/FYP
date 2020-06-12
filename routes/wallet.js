var express = require("express");
var router = express.Router();
const { User } = require("../models/User");
const { Auth } = require("../models/Auth");
const { Wallet } = require("../models/Wallet");
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const bcrypt = require('bcrypt');
const { checkBenchmark, checkWalletLimit, welcomeBonusPoints } = require('../middleware/walletMiddlewares');
const nodemailer = require("nodemailer");
const _ = require('lodash');

router.get('/user/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const walletList = await Wallet.find({ user_id: id, flag: true });
		let _walletList = [];

		for(let i = 0; i < walletList.length; i++){
			let wallet = walletList[i];
			wallet._doc = _.omit(wallet._doc, 'privateKey');
			_walletList.push(wallet);
		}

		return res.status(200).send(_walletList);
	} catch (e) {
		return res.status(500).send(e.message);
	}
});

router.post('/createNewWallet', [checkBenchmark, checkWalletLimit, async (req, res, next) => {
	try {
		const { username } = req.body;
		const auth = await Auth.findOne({ username, flag: true });
		if (!auth) return res.status(404).send("User not found.");
		const userId = auth.user_id;
		const user = await User.findById(userId);
		if (!user) return res.status(404).send("User not found.");
		const userEmail = user.email;

		const keys = ec.genKeyPair();
		const publicKey = keys.getPublic('hex');
		const privateKey = keys.getPrivate('hex');

		const salt = await bcrypt.genSalt(10);
		hashedKey = await bcrypt.hash(privateKey, salt);

		wallet = new Wallet({ user_id: userId, publicKey: publicKey, privateKey: hashedKey });
		await wallet.save();

		// create reusable transporter object using the default SMTP transport
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'fa16-bcs-267@cuilahore.edu.pk',
				pass: 'jajaja01'
			}
		});
		const mailOptions = {
			from: 'fa16-bcs-267@cuilahore.edu.pk',
			to: userEmail,
			subject: 'Wallet Details',
			attachments: [
				{
					filename: 'KEY.txt',
					content: new Buffer(privateKey, 'utf-8')
				}
			],
			text: 'PFA your wallets private key. You need to download the file and always keep the private key to yourself and never misplace or forget it otherwise your access to wallet will be lost.'
		};

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log('Email sent: ' + info.response);
			}
		});
		res.locals.createdWallet = wallet;
		next();
		// return res.status(201).send(wallet);

	} catch (e) {
		return res.status(500).send(e.message);
	}
}, welcomeBonusPoints]);

router.post('/authenticateWallet', async (req, res) => {
	const { publicKey, privateKey } = req.body;

	const wallet = await Wallet.findOne({ publicKey });
	if (!wallet) return res.status(404).send("Invalid public key.");

	const validKey = await bcrypt.compare(privateKey, wallet.privateKey);
	if (!validKey) return res.status(400).send('Invalid Private key.');
	console.log(wallet.balance);
	return res.status(200).send((wallet.balance).toString());

});

router.delete('/deleteWallet', async (req, res) => {
	try {
		const { privateKey, _id } = req.body;
		let wallet = await Wallet.findOne({_id});
		if(!wallet) return res.status(404).send({ err: { message: "Wallet not Found", code: "ERR_WNF" } });

		const validKey = await bcrypt.compare(privateKey, wallet.privateKey);
		if (!validKey) return res.status(400).send({ err: { message: "Invalid Wallet Key", code: "ERR_IWK" } });

		wallet = await Wallet.findOneAndUpdate({_id, flag: true}, { flag: false }, {new: true});
		return res.status(202).send("Wallet Deleted");
	} catch (e) {
		return res.status(500).send({ err: { message: e.message, code: "ERR_SR" } });
	}
});

module.exports = router;
