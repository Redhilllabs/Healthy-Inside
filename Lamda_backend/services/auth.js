


const signin = async (req, res, next) => {
    try {
      const userName = req.body.userName;
      const password = req.body.password;
  
      const filter = {
        contact: password,
        email: userName,
      };
    //   const client = await MongoClient.connect(url, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   });
      const coll = client.db(dbName).collection("users");
      const cursor = coll.find(filter);
      const result = await cursor.toArray();
      await client.close();
  
      if (result.length > 0) {
        return res.json({ status: "ok", user: result });
      } else {
        return res.json({ status: "error", user: null });
      }
    } catch (err) {
      next(err);
    }
  };
  module.exports.signin = signin ;