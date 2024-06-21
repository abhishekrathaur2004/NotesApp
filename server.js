// Third-Party module/package
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";

// defined module
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import verifyUser from "./middleware/authMiddleware.js";
import noteRoutes from "./routes/notesRoutes.js";
const app = express();

const __dirname = path.resolve();

// set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


app.use(cookieParser());
// allowing request from cross origin
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

dotenv.config();
connectDB();

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/notes", verifyUser, noteRoutes);
// app.use("/api/v1/notes", noteRoutes);


app.get('/', (req,res)=>{
  res.redirect('/api/v1/auth/login');
})
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
