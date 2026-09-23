import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoute from './routes/user.js';
import companyRoute from './routes/company.js';
import jobRoute from './routes/job.js';
import applicationRoute from './routes/application.js';
import helmet from "helmet";
import compression from "compression";


dotenv.config({});


const app = express();

app.set("trust proxy", 1);

//  middleware

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());
app.use(helmet());
app.use(compression());

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});