const Student = require('../models/student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Angularexpress';
const { validationResult } = require("express-validator");
const fetchuser = require('../middleware/fetchuser');

const createStudent = async (req, res) => {
    try {
        //if there are errors, return bad request
        const errors = validationResult(req);
        
        let success = false;
        if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
        }

        console.log('ad')

        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(req.body.password, salt);

        const user = new Student({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            password: hash
        });
        const isStudentInserted = await user.save();
        
        const data = {
            user: {
                id: isStudentInserted.id
            }
        }
        var authtoken = jwt.sign(data, JWT_SECRET, { expiresIn: 60*60 });
        res.status(201).json({authtoken, expiresIn: 60*60});
    } catch (err) {
        res.status(400).send(err);
    }
};

//using Promises
const getStudentLists = (req, res) => {
    const fetchStudentList = Student.find().select("name email phone address");
    fetchStudentList.then((result) => {
        res.status(200).send(result)
    })
    .catch((err) => res.status(400).send(err));
}

const getSingleStudentDetails = async (req, res) => {
    try {
        const result = await Student.findById({_id: req.params.id}).select('-password -__v');
        if (result) {
            res.status(200).send(result);
        } 
    } catch (error) {
        res.status(400).send(error);
    }
}

const updateStudent = async (req, res) => {
    try {
        const updateStudent = await Student.findByIdAndUpdate(
            {_id: req.params.id},
            {$set: 
                {
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    address: req.body.address
                }
            })
            .select('-password -__v');
            if (updateStudent && Object.keys(updateStudent).length !== 0) {
                res.status(200).send(updateStudent);
            }
    } catch(err) {
        res.status(400).send(err);
    }
};

const removeStudent = async (req, res) => {
    try {
        const isDeleteRecord = await Student.findByIdAndDelete({_id: req.params.id});
        if (isDeleteRecord && Object.keys(isDeleteRecord).length !==0 ) {
            res.status(200).send(isDeleteRecord);
        }
        res.status(400).send('Student is not deleted.')
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createStudent,
    getStudentLists,
    getSingleStudentDetails,
    updateStudent,
    removeStudent
}