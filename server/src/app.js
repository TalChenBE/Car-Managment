const express = require('express');
const bodyParser = require('body-parser');

const winston = require('winston');
const expressWinston = require('express-winston');
const responseTime = require('response-time');

require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const store = new session.MemoryStore();
const secret = process.env.SESSION_SECRET;

const apiRouter = require('./api/router');

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(
  session({
    secret,
    resave: false,
    saveUninitialized: true,
    store,
  })
);

app.use(responseTime());
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.json(),
    statusLevels: true,
    meta: false,
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    expressFormat: true,
    ignoreRoute() {
      return false;
    },
  })
);
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

app.use('/api', apiRouter);

app.listen(app.get('port'), () => {
  console.log(`App listening on ${app.get('port')}`);
});
