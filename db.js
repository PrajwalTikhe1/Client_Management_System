const mongoose = require("mongoose");

const connectToMongo = async () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("MONGO DB Connected Successfully");
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = connectToMongo;
