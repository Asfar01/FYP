const { Auth } = require('../models/Auth');
const { User } = require('../models/User');
const { Wallet } = require('../models/Wallet');
const _ = require('lodash');

const checkBenchmark = async (req, res, next) => {
	try {
		const { username } = req.body;
		console.log(username);
		const auth = await Auth.findOne({ username, flag: true });
		if(!auth) return res.status(404).send({ err: "No user Found"}); 
		
		const user = await User.findById(auth.user_id);
		if(!user) return res.status(404).send({ err: "No user Found"});
		
		if (!!user.benchmark.length) {
			next();
		} else {
			return res.status(403).send({ err: "Please add a benchmark first" });
		}
	}catch (e){
		return res.status(500).send({err: e.message});
	}
};

const checkWalletLimit = async (req, res, next) => {
	try {
		const { username } = req.body;
		const auth = await Auth.findOne({ username });
		if(!auth) return res.status(404).send({ err: "No user Found"});

		const numberOfWallets = await Wallet.countDocuments({ user_id: auth.user_id, flag: true });
		
		if(numberOfWallets >= 5){
			return res.status(403).send({ err: { message: "Wallet limit exceeded", code: "ERR_WLE" }});
		}

		next();
		
	}catch(e) {
		return res.status(500).send({err: e.message});
	}
};

const welcomeBonusPoints = async (req, res, next) => {
	try {
		const { username } = req.body;
		const auth = await Auth.findOne({ username, flag: true });
		if(!auth) return res.status(404).send({ err: "No user Found"});

		const wallets = await Wallet.find({user_id: auth.user_id});
		if(wallets.length === 1){
			let wallet = await Wallet.findByIdAndUpdate(wallets[0]._id, { balance: 100 }, { new: true });
			wallet._doc = _.omit(wallet._doc, 'privateKey');
			return res.status(201).send(wallet);
		}else{
			let wallet = res.locals.createdWallet;
			wallet._doc = _.omit(wallet._doc, 'privateKey');
			return res.status(201).send(wallet);
		}
	}catch(e) {
		return res.status(500).send({err: e.message});
	}
};


exports.checkBenchmark = checkBenchmark;
exports.checkWalletLimit = checkWalletLimit; 
exports.welcomeBonusPoints = welcomeBonusPoints;