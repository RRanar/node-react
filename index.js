const express = require("express");
const config = require("config");
const mongoConnect = require("./helpers/mongoHelper");
const authRouter = require("./routes/auth.route");

const app = express();

const PORT = config.get("port") || 8000;

mongoConnect();

app.use(express.json({ extended: true }));

app.use("/api/auth", authRouter);


app.listen(
    PORT,
     () => console.log(`"App has been started on port ${PORT} ..."`)
);