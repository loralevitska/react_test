// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');

require('./connectDB');

const app = express();

const cors = require('cors');

app.use(cors());
app.use(express.json());

const userRouter = require('./src/routes/user');

app.use('/api/v1/users', userRouter);
// eslint-disable-next-line no-console
app.listen(5005, () => console.log('Server is running'));
