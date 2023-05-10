const express = require('express');
const { sendEther } = require('./functions/sendEth');
require('dotenv').config();
const port = process.env.PORT || 8030;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res) => {
	res.send('Hello world');
});

app.post('/send', (req, res) => {
	const { senderKey, to, amount } = req.body;
	if(!senderKey || !to || !amount) {
		return res.status(400).json({message: 'error', error: 'Missing parameters'});
	}

	sendEther(senderKey, to, amount)
	.then(result => {
		return res.status(200).json({message: 'success', hash: result});
	})
	.catch(err => {
		return res.status(500).json({message: 'error', error: err});
	});
});

app.listen(port, () => {
	console.log('Server running on port ' + port + '...');
});