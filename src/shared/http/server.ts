import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors'

import morgan from 'morgan';
import cors from 'cors';

import routes from './routes';
import "../../database";
import AppError from "../../errors/AppError";

require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(routes)

app.get('/', (req, res) => {
    return res.json({ message: "🚀🎉🤘🏾 Heeeeyy!!" });
})

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message
        })
    }

    console.log(err);

    return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error!'
    })

})

app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
})
