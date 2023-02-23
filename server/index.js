import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from 'cors';
import foodRoutes from "./routes/fooditem.js";
import CartRoutes from "./routes/cart.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import path from 'path';
import multer from 'multer';
import Foods from './models/fooditems.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';


const app = express();
app.use(bodyParser.json());
mongoose.set("strictQuery", false);
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api/food", foodRoutes);
app.use("/api/cart", CartRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users",userRoutes);

// app.get("/", function (req, res) {
//   res.json("server is running ");
// });

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO , {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    const db = mongoose.connection;
    // console.log(db)
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function () {
      console.log("Connected successfully to database");
    })
 
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set("view engine", "ejs");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  }
});


const upload = multer({ storage });
app.post('/', upload.single('image'), (req, res, next) => {
  const obj = {
    foodName: req.body.name,
    foodID: req.body.id,
    foodType: req.body.foodtype,
    foodPrice: req.body.price,
    foodUrl: {
      data: fs.readFileSync(path.join(__dirname, 'uploads', req.file.filename)),
      contentType: 'image/png'
    }
  };
  
  Foods.create(obj, (err, item) => {
    if (err) {
      console.log(err);
      res.status(500).send('An error occurred', err);
    } else {
      res.redirect('/');
    }
  });
});

app.get('/', (req, res) => {
  Foods.find({}, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).send('An error occurred', err);
    } else {
      res.render('imagesPage', { items });
    }
  });
});

// var displayName;
// var credits;
// var dynamicDisplay;
// var userName;
// var password;
// var customerId;
// var address;

// app.post("/", async function (req, res) {
//   userName = req.body.userName;
//   password = req.body.password;

//   const filter = {
//     "Contact No": {
//       "": password,
//     },
//     "Email Id": userName,
//   };
//   const client = await MongoClient.connect(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   const coll = client.db(dbName).collection("User");
//   const cursor = coll.find(filter);
//   const result = await cursor.toArray();
//   console.log(await result);
//   await client.close();
//   if (result.length > 0) {
//     dynamicDisplay = result[0];
//     res.redirect("/welcome");
//   } else {
//     res.redirect("/");
//   }
// });

// app.get("/welcome", function (req, res) {
//   console.log("here it  was ", dynamicDisplay);
//   if(dynamicDisplay===undefined||null){
//     dynamicDisplay = "Login"
//   }
//   res.render("index.ejs", { dynamicDisplay });
// });

// app.get("/cart", function (req, res) {
//   res.render("cart.ejs", { dynamicDisplay });
// });
// app.get("/account", function (req, res) {
//   res.render("account.ejs", { dynamicDisplay });
// });

// app.get("/orderPlaced", function (req, res) {
//   res.render("orderPlaced.ejs");
//   connection.query(
//     "select * from hi_db where email = ? and contact = ?",
//     [userName, password],
//     function (error, results, fields) {
//       dynamicDisplay = results[0];
//     }
//   );
// });

// app.get("/redirect", function (req, res) {
//   connection.query(
//     "select * from hi_db where email = ? and contact = ?",
//     [userName, password],
//     function (error, results, fields) {
//       dynamicDisplay = results[0];
//     }
//   );
//   res.render("index.ejs", { dynamicDisplay });
// });

// app.post("/address", (request, response) => {
//   address = JSON.stringify(request.body);

//   console.log(address);
//   response.send({ success: true });
//   // console.log(typeof(JSON.stringify(data)));
//   // console.log(JSON.stringify(data));
//   const sql = "UPDATE hi_db SET address = ? WHERE email = ?";
//   const querydata = [address, userName];
//   connection.query(sql, querydata, (error, results) => {
//     if (error) {
//       console.error(error);
//       return;
//     }

//     console.log(`${results.affectedRows} row(s) updated.`);
//   });
// });

// app.post("/cartItems", (req, res) => {
//   cartItems = JSON.stringify(req.body);
//   console.log(cartItems);
//   res.send({ success: true });
// });

// app.get("/addressData", (request, response) => {
//   console.log(dynamicDisplay.address);

//   response.json(dynamicDisplay.address);
// });

// app.post("/checkout", (request, response) => {
//   console.log(request.body);
//   var pid = request.body.jsonpid;
//   var total = request.body.total;
//   console.log({ pid, total });
//   // pid = JSON.stringify(pid);

//   console.log(typeof total);
//   response.send({ success: true });

//   // const sql1 = `INSERT INTO order (customerId, productId, amount) VALUES ( ${customerId}, '${pid}', '${total}')`;
//   // const sql1 = `INSERT INTO nodejs.order (customerId, productId, amount, address) VALUES (?, ?, ?, ?)`;

//   connection.query(
//     sql1,
//     [dynamicDisplay.cid, pid, total, dynamicDisplay.address],
//     (error, results, fields) => {
//       if (error) throw error;
//       console.log("Data inserted successfully");
//     }
//   );

//   dynamicDisplay.credits = dynamicDisplay.credits - total;
//   const sql2 = "UPDATE hi_db SET credits = ? WHERE cid = ?";
//   const sql2data = [dynamicDisplay.credits, dynamicDisplay.cid];
//   connection.query(sql2, sql2data, (error, results) => {
//     if (error) {
//       console.error(error);
//       return;
//     }
//     console.log(`${results.affectedRows} row(s) updated.`);
//   });

//   console.log(typeof JSON.stringify(data));
//   console.log(JSON.stringify(data));
//   const sql = "UPDATE hi_db SET address = ? WHERE email = ?";
//   const query = [data, userName];
//   connection.query(sql, query, (error, results) => {
//     if (error) {
//       console.error(error);
//       return;
//     }

//     console.log(`${results.affectedRows} row(s) updated.`);
//   });
// });

const port = process.env.port ||8000;

app.listen(port, function () {
  connect();
  console.log("Server is started.");

});