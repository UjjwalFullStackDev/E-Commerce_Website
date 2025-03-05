import express from 'express';
import 'dotenv/config'
import connectDB from './src/config/db.js';
import morgan from 'morgan';
import authRoute from './src/routes/authRoute.js';



const app = express();
const port = process.env.PORT;

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoute)




app.listen(port, () => {
    console.log(`Server listining on http:localhost:${port}`)
    connectDB();
})