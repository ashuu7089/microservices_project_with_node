import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';
const app = express();
// import mainRouter from "./routers/mainRouter.js"

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : false }))
// app.use(mainRouter)
app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on PORT ${process.env.PORT}`);
})