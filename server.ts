import express,{Application,Response,Request} from "express"
import mongoose from "mongoose"
import "./Datatabase/Db"
import cors from "cors"
import { MainApp } from "./MainApp"
const port:Number = 3400
const app: Application = express()
// app.use(express.json())
// app.use(cors)
// app.get('/api/v1', (req: Request, res: Response) => {
//     res.status(200).json({
//         message:"api is runnig"
//     })
// })
MainApp(app);
const server = app.listen(port, () => {
    console.log("server is listening for events on port ",port)
})


process.on("uncaughtException", (error: Error) => {
  console.log("stop here:uncaughtexception error");
  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("an unhandled rejection error", reason);
  server.close(() => {
    process.exit(1);
  });
});

