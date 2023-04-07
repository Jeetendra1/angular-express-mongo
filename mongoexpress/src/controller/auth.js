const Student = require('../models/student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require("express-validator");
const JWT_SECRET = 'Angularexpress'; 

const userLogin = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(401).json({success: false, error: errors.array()});
        }
        const {email, password} = req.body;
        let findStudent = await Student.findOne({email});
        
        if (!findStudent) {
            return res.status(400).json({error: 'Please try to login with correct email.'});
        }
        const passowrdCompare = await bcrypt.compare(password, findStudent.password);
        if (!passowrdCompare) {
            return res.status(400).json({error: 'Please try to login with correct email or password.'});
        }

        const payload = {
            user: {
                id: findStudent.id
            }
        };

        const authtoken = jwt.sign(payload, JWT_SECRET, { expiresIn: 60*60 });
        res.status(200).json({authtoken, expiresIn: 60*60})
    } catch (error) {
        res.status(404).json(error);
    }
}

module.exports = {
    userLogin
}