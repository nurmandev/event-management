const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Init Middleware
app.use(express.json());

app.get("/", (req, res) => {
  console.log("Hello Calendar App");
  res.send("Hello Calendar App");
});
app.use("/api/users", require("./routes/authRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/invitations", require("./routes/inviteRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));

// Swagger Documentation
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
