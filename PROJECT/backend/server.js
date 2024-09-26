require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const csurf = require("csurf");
const helmet = require("helmet");

const customer_base = require("./routes/customer/customer_base");
const onlineshop_base = require("./routes/onlineshop/onlineshop_base");
const payment_base = require("./routes/payment/payment_base");
const inventory_base = require("./routes/inventory/inventory_base");

//express app
const app = express();

//middleware

// Define a list of allowed origins
const allowedOrigins = ['http://localhost:3000'];

// Configure CORS to only allow specified origins
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
// Use Helmet to secure your app
app.use(helmet());

app.use((req, res, next) => {
  const metadataIP = "169.254.169.254";
  if (req.ip === metadataIP) {
    res.status(403).send("Access to metadata is forbidden");
  } else {
    next();
  }
});

app.use(express.json()); //to add json to the 'req' Object

app.use((req, res, next) => {
  next();
});

const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(morgan("dev")); //to run frontend and backend concurrently
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

// CSRF protection middleware
const csrfProtection = csurf({ cookie: true });
app.use(csrfProtection);

// Add CSRF token to response
app.use((req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  next();
});

//routes
app.get("/api/keys/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});


// Manually set Content-Security-Policy header for all routes
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', 
    "default-src 'self'; script-src 'self' https://apis.google.com; style-src 'self' https://fonts.googleapis.com; img-src 'self' https://cdn.example.com; connect-src 'self' https://api.example.com; font-src 'self' https://fonts.gstatic.com; frame-src 'self' https://paypal.com; object-src 'none'; upgrade-insecure-requests; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; script-src-attr 'none'"
  );
  next();
});

// Serve static files and set Content-Security-Policy for static assets
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, path) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // res.setHeader('Content-Security-Policy', 
    //   "default-src 'self'; script-src 'self' https://apis.google.com; style-src 'self' https://fonts.googleapis.com; img-src 'self' https://cdn.example.com; connect-src 'self' https://api.example.com; font-src 'self' https://fonts.gstatic.com; frame-src 'self' https://paypal.com; object-src 'none'; upgrade-insecure-requests; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; script-src-attr 'none'"
    // );
  }
}));
customer_base(app);
inventory_base(app);
onlineshop_base(app);
payment_base(app);

//connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log(
        "Connected to db & listening for requests on port",
        process.env.PORT
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
