import express from "express";
import compression from "compression";  // compresses requests
import lusca from "lusca";
import path from "path";
import mongoose from "mongoose";
import { MONGODB_URI } from "./util/secrets";

const app = express();

const mongoUrl = MONGODB_URI;

mongoose.connect(mongoUrl ).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ 
    console.log("Mongodb is ready to use");
},
).catch(err => {
    console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
    // process.exit();
});

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

app.get("/", (req, res) => {
    res.send("App is running");
});

export default app;
