import express from 'express';
import dotenv from 'dotenv';
import errorHandler from './middlewares/error-handler.js';
import router from './routes/animes.js';
import routerStudio from './routes/studio.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/animes", router);
app.use("/studios", routerStudio);
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Listen on port ${PORT}`);
})

