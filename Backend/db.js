const mongoose = require("mongoose");

async function connectDB() {
  try {
    const res = mongoose.connect(
      "mongodb+srv://vishalborle71:Vishal%40231@cluster0.1n45m.mongodb.net/paytm"
    );
    if (res.ok) {
      console.log("Mongodb connected");
    }
  } catch (err) {
    console.log(err);
  }
}
connectDB();

const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    minLength: 6,
    type: String,
    required: true,
  },
});

const accountSchema = new Schema({
  userId : {
    type : ObjectId,
    ref : 'user',
    required : true
  },
  balance : {
    type : Number,
    required : true
  }
})
const userModel = mongoose.model("user", userSchema);
const accountModel = mongoose.model("account", accountSchema);


module.exports = {
  userModel,
  accountModel
};
