const express = require("express");
const mongoose = require("mongoose");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
//const session = require("express-session");
const methodOverride = require("method-override");
const route = require("./router/client/index.route");
const routeAdmin = require("./router/admin/index.route");
const database = require("./config/database");
const MongoStore = require("connect-mongo");
const session = require("cookie-session");

const systemConfig = require("./config/systems");

require("dotenv").config();

const app = express();
const port = process.env.PORT;
app.use(methodOverride("_method"));
database.connect();

//cau hinh de su dung pug
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// Cấu hình session
app.use(
  session({
    // store: new MongoStore({
    //   mongooseConnection: mongoose.connection, // Kết nối MongoDB sử dụng Mongoose
    // }),
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

//flash
app.use(cookieParser("keyboard cat"));
//app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

//App local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

//public cac file
app.use(express.static(`${__dirname}/public`));
//middleware
app.use(express.urlencoded({ extended: true }));

//Routes
route(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
