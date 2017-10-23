var express = require("express");
const fs = require("fs");
var path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");
const requestHandler = require("./requesthandler.js");
var app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;
const keys = require("./keys");
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
// app.use(requestHandler);
// app.use(cookieParser());

//==================
// API ROUTES
//==================
const mongoose = require("mongoose");
const Books = require("./models/books");
mongoose.Promise = global.Promise;

const mongodb = keys.mongodb || process.env.MONGO_DB;
mongoose
  .connect(mongodb, {
    useMongoClient: true
  })
  .then(() => {
    console.log("Good To go");
  })
  .catch(() => {
    console.log("Error connecting mongodb");
  });
// mongoose
//   .connect("mongodb://localhost:27017/bookStore", { useMongoClient: true })
//   .then(() => {
//     console.log("Good To go");
//   })
//   .catch(() => {
//     console.log("Error connecting mongodb");
//   });

//===================
//sesson setup
//==================
const db = mongoose.connection;
db.on("error", console.error.bind(console, "#MongoDB- connection error: "));

app.use(
  session({
    secret: "fasdfasdfasdf",
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 2 * 60 * 60 * 1000 },
    store: new MongoStore({ mongooseConnection: db, ttl: 2 * 24 * 60 * 60 })
  })
);
app.get("/api/cart", (req, res) => {
  if (typeof req.session.cart !== undefined) {
    // console.log("session.cart: ", req.session.cart);
    res.json(req.session.cart);
  } else {
    res.json([]);
  }
});
app.post("/api/cart", (req, res) => {
  var cart = req.body;
  req.session.cart = cart;
  req.session.save(err => {
    if (err) {
      console.log("error saving in session");
    }
    console.log(req.session.cart);
    res.json(req.session.cart);
  });
});

app.get("/api/images", (req, res) => {
  const imgFolder = path.join(__dirname, "..", "public", "images");
  const filesArr = [];

  fs.readdir(imgFolder, function(err, files) {
    if (err) {
      console.log("error reading file from the directory");
    } else {
      console.log(files);
      files.forEach(file => {
        filesArr.push({ name: file });
      });

      res.json(filesArr);
    }
  });
  // res.send("Yo");
});

app.post("/api/books", (req, res) => {
  const book = req.body;
  console.log(book);
  Books.create(req.body)
    .then(books => {
      res.json(books);
    })
    .catch(error => {
      console.log("error posting books");
      // throw error;
    });
});

app.get("/api/books", (req, res) => {
  Books.find({})
    .then(books => {
      res.json(books);
    })
    .catch(error => {
      console.log("errro getting books");
    });
});
app.put("/api/books/:_id", (req, res) => {
  Books.findByIdAndUpdate(req.params._id, req.body, { new: true })
    .then(book => {
      res.json(book);
    })
    .catch(error => {
      console.log("error: updating books");
    });
});

app.delete("/api/books/:_id", (req, res) => {
  Books.findByIdAndRemove(req.params._id)
    .then(book => {
      console.log("deleted");
      res.json(book);
    })
    .catch(error => {
      console.log("error deleting");
      // throw error;
    });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html")
    );
  });
}

app.listen(PORT, e => {
  if (e) {
    console.log(e);
  } else {
    console.log("listening at 5000");
  }
});
