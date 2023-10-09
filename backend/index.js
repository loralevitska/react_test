/* eslint-disable */
const express = require('express');
const cors = require('cors');
const appRouter = require('./src/routes');
require('./connectDB');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1', appRouter);

app.listen(5005, () => console.log('Server is running'));

/* https://www.npmjs.com/package/node-schedule */
const schedule = require('node-schedule');
const feedController = require('./src/controllers/feed');

let scheduleTimes = 0;
const rule = new schedule.RecurrenceRule();

const feedUrls = ['https://www.freecodecamp.org/news/rss/', 'https://netflixtechblog.com/feed'];

const scheduleJob = schedule.scheduleJob('*/5 * * * *', (request) => {
  feedController.feedPuller(feedUrls[scheduleTimes]);
  scheduleTimes += 1;

  if (scheduleTimes >= 5) {
    scheduleJob.cancel();
  }
});
