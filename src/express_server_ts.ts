import express, { type Application, type Request, type Response } from "express";

const app:Application = express();
const port = 5000;

//   middleware
app.use(express.json());

// root route

app.get ("/",(req:Request,res:Response)=>{
    res.status(200).json({
    success: true,
    message: "This is root route"
});



})


app.listen(port,()=>{
    console.log(`This server is running in port:${port}`);
})