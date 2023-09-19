const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const ApiError = require("./utlis/apiError");
const globalError = require("./middelwares/errorMiddelware");
const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoute");
const subcategoryRoute = require("./routes/subCategoryRoute");

dbConnection();
const app = express();
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode ${process.env.NODE_ENV}`);
}

app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", subcategoryRoute);

app.all("*", (req, res, next) => {
  //const err = new Error(`Can't find this route ${req.originalUrl}`)
  next(new ApiError(`Can't find this route ${req.originalUrl}`, 400));
});

//Global error handler middleware
app.use(globalError);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(` app listening on port ${PORT}`);
});
// handle rejection outside of express
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Errors ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down server ...`);

    process.exit(1);
  });
});
