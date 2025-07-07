require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const spotsRouter = require('./routers/spots');
const path = require('path');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use('/spots', spotsRouter);
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
});