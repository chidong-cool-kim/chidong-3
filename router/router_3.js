const mongoose = require("mongoose")

const LoginSchema = new mongoose.Schema(
    {
        name: {
            type : String,
            required : true
        },

        classnum: {
            type : String,
            required : true
        },

        number: {
            type : String,
            required : true
        },

        password: {
            type : String,
            required : true
        }
    }
)

const Login = mongoose.model("Login", LoginSchema)

module.exports = Login