import express from 'express';
import Hello from "./hello.js"
import Lab5 from './lab5.js';
import cors from "cors";
import "dotenv/config";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import mongoose from "mongoose";
import UserRoutes from './users/routes.js';
import session from "express-session";

console.log(process.env.DB_CONNECTION_STRING);
const CONNECTION_STRING = 'mongodb+srv://shreyasb63:admin@kanbas.kf9yoku.mongodb.net/kanbas';
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(express.json());
app.use(
    cors({
        credentials: false,
        origin: '*'
    })
);

const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}
app.use(session(sessionOptions));


UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);