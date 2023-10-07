// eslint-disable-next-line @typescript-eslint/no-var-requires
/* eslint-disable */
const express = require('express');
const RSSParser = require('rss-parser');
const cors = require('cors');
const userRouter = require('./src/routes/user');
require('./connectDB');

// const feedUrl = 'https://netflixtechblog.com/feed';
// const parser = new RSSParser();
// const articles = []
// const parse = async url => {
//   const feed = await parser.parseURL(url);
//
//   feed.items.forEach(item => {
//     articles.push({ item })
//     // console.log(`${item.title}\n${item.link}\n\n`)
//   })
//
//   console.log(feed.title);
// };
//
// parse(feedUrl);

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1', userRouter);

app.listen(5005, () => console.log('Server is running'));
