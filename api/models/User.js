const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    run: { type: String, required: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    region: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    birthday: { type: Date, required: true },
    gender: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

//validate if password is correct or not
userSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

// hash password while registering:
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

module.exports = mongoose.model("User", userSchema);
