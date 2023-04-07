const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const StudentController = require("../controller/studentController");
const AuthController = require("../controller/auth");
const fetchuser = require('../middleware/fetchuser');

//Create student
router.post(
  "/students",
  [
    body("name", "Enter valid name").isLength({ min: 3 }),
    body("email", "Enter valid email").isEmail(),
    body("password", "Enter valid password").isLength({ min: 5 }),
  ],
  StudentController.createStudent
);
router.get("/students", fetchuser, StudentController.getStudentLists);
router.get("/students/:id", StudentController.getSingleStudentDetails);
router.patch("/students/update/:id", StudentController.updateStudent);
router.delete("/students/delete/:id", StudentController.removeStudent);

router.post(
  "/login",
  [
    body("email", "Enter valid email").isEmail(),
    body("password", "Enter valid passowrd").isLength({ min: 5 }),
  ],
  AuthController.userLogin
);

module.exports = router;
