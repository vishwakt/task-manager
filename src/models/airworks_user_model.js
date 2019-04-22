// const mongoose = require('mongoose')
// const validator = require('validator')
// const bcrypt = require('bcryptjs')
//
// //user_id (string, auto generated)
// // first_name (string, required)
// // last_name (string, required)
// // phone (number, required)
// // address {
// //     line1 (string, required),
// //     line2 (string, optional),
// //     state (string, required),
// //     country (string, required),
// //     zip (number, required)
// // }
// // email (string, required)
// // company (string, optional)
// // job_title  (string, optional)
// // role (string, optional)
// // date_created (date, required)
// // projects (array, string)
// // orders (array, string)
// // subcription_details(string, optional)
// // stripe_id(string, optional)
//
// const UserSchema = {
//     first_name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     last_name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error('Email is invalid')
//             }
//         }
//     },
//     phone_number: {
//
//
//     },
//     address: {
//
//     },
//     age: {
//         type: Number,
//         default: 0,
//         required: false,
//         validate(value) {
//             if (value < 0) {
//                 throw new Error('Age must be a positive number')
//             }
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         validate(value) {
//             if (value.length < 7) {
//                 throw new Error('Password must be more than 6 characters long')
//             }
//             if (value.toLowerCase().includes("password")) {
//                 throw new Error("Password cannot contain the word 'password'")
//             }
//         }
//     },
//     company: {
//
//     },
//     job_title: {
//
//     },
//     role: {
//
//     },
//     date_created: {
//
//     },
//     projects: {
//
//     },
//     orders: {
//
//     },
//     subscription_details: {
//
//     },
//     stripe_id: {
//
//     }
// }
//
// UserSchema.pre('save', async function next() {
//     const user = this
//
//     if (user.isModified('password')) {
//         user.password = await bcrypt.hash(user.password, 8)
//     }
// })
//
// const User = mongoose.model('User', UserSchema)
//
// module.exports = {
//     User
// }