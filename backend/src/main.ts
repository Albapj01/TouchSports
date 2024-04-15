/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import Router from 'express-promise-router';
import mongoose from 'mongoose';


dotenv.config();
const app = express();
const router = Router();

app.use(cors())
app.use(router)

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to backend!' });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);


router.get('/api/status', async (req, res) => {
  res.status(200).send({message: 'OK'})
})
