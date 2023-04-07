const mongoose = require('mongoose');
const validator = require('validator');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: [true, "Email id already present."],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invailid email.')
            }
        }
    },
    phone: {
        type: Number,
        min: 10,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const Student = new mongoose.model('Student', studentSchema);

module.exports = Student;