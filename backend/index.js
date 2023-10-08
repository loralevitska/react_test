// eslint-disable-next-line @typescript-eslint/no-var-requires
/* eslint-disable */
const express = require('express');
// const RSSParser = require('rss-parser');
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

rule.second = 1;
// rule.minute = 5;

const feedUrls = ['https://www.freecodecamp.org/news/rss/', 'https://netflixtechblog.com/feed'];

// '* * * * * *' every second
// '*/5 * * * *' every 5 minute

// const scheduleJob = schedule.scheduleJob('* * * * * *', (request) => {
//   console.log('The answer to life, the universe, and everything!');
//
//   feedController.feedPuller(feedUrls[scheduleTimes]);
//   scheduleTimes += 1;
//
//   if (scheduleTimes >= 5) {
//     scheduleJob.cancel();
//   }
// });
