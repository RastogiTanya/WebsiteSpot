import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Mongo db connected" + conn.connection.host);
  } catch (error) {
    console.log(`error is ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
