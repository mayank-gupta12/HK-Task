const mongoose = require("mongoose")
mongoose.set('strictQuery', true);
const taskModel = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    taask: String,
    date: {
        type: Date,
        default:Date.now,
    }
})
const User = mongoose.model("user", taskModel);
module.exports = User;