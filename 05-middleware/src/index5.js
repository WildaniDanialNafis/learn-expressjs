import express from 'express';
const app = express();

import cookieParser from "cookie-parser";
app.use(cookieParser());

import helmet from "helmet";
app.use(helmet());

app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000");
})