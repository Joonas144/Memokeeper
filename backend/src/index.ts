import express, { NextFunction } from 'express'

import * as firebase from './services/firebase.js'
import boardRouter from './routes/boardRoutes.js';

/* == Init == */
const app = express();
const PORT = process.env.PORT || 3000;


/* == Middleware == */
app.use(express.json());

app.all('/api/v1', (req, res, next) => {
  console.log("api was called @"+req.url + " on " + Date.now())
})


/* == Routes == */
app.use('/api/v1', boardRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
