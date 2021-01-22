var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const isAuth = require("./middleware/isAuth");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const graphQLSchema = require("./graphql/schema/index");
const graphQLResolver = require("./graphql/resolvers/index");

app.use(isAuth);

app.use(
  "/api/graphql",
  graphqlHTTP({
    schema: graphQLSchema,
    rootValue: graphQLResolver,
    graphiql: true,
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
