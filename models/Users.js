const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

    firstName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    phone: {
        type: Number,
        require: true,
    },
    password: {
        type: String,
        require: true
    },
    userType: {
        type: String,
        enum: ['client', 'admin'],
        default: 'client',
    },
    // x: {
    //     type: new mongoose.Schema({
    //         name: {
    //             type: String,
    //         },
    //         link: {
    //             type: String,
    //         }
    //     })
    // },
    // y: [
    //     {
    //         type: String,
    //     }
    // ],
    documents: [
        new mongoose.Schema({
            name: {
                type: String,
            },
            link: {
                type: String,
            }
        })
    ],
}, {
    timestamps: true
});
module.exports = mongoose.model('Users', UserSchema)