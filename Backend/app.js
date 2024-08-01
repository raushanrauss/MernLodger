const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const transactionRoutes = require('./Routers/Transactions'); // Adjust path if needed
const userRoutes = require('./Routers/userRouter'); // Adjust path if needed
const path = require('path');
const connectDB = require('./DB/Database');
const pdfRouter = require('./Routers/pdfRouter');

dotenv.config({ path: './config/config.env' });

const app = express();
const port = process.env.PORT || 8000;





// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

// Router
app.use('/api/v1', transactionRoutes);
app.use('/api/auth', userRoutes);
app.use('/pdf',pdfRouter)


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, async () => {
  try {
 await connectDB()
  }
  catch (error) {
    console.log(error);
  }
  
  console.log(`Server is listening on http://localhost:${port}`);
});
