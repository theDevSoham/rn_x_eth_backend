const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 8030;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res) => {
	res.send('Hello world');
});

app.listen(port, () => {
	console.log('Server running on port ' + port + '...');
});