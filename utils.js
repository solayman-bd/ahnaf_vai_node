const mongoose = require("mongoose");
const mongooseConnection = async () => {
  try {
    const result = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (result) {
      console.log("Database connection established");
    }
  } catch (err) {
    console.log("Error", err);
  }
};
const responseGenerator = (
  responseBody,
  responseStatus,
  responseDescription
) => {
  return {
    responseBody: responseBody,
    responseStatus: responseStatus,
    responseDescription: responseDescription,
    responseTimestamp: new Date().toISOString(),
  };
};
module.exports = { mongooseConnection, responseGenerator };
