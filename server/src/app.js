require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const winston = require('winston');
const expressWinston = require('express-winston');
const cookieParser = require('cookie-parser');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');
const responseTime = require('response-time');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
app.set('port', process.env.PORT || 4000);

app.use(responseTime());
app.use(credentials);
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieParser());

app.use('/api', require('./api/treatments'));
app.use('/api', require('./api/users'));
app.use('/api', require('./api/refresh'));

app.listen(app.get('port'), () => {
  console.log(`App listening on ${app.get('port')}`);
});
