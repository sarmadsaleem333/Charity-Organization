require('dotenv').config({ path: "../../.env" });
const express = require("express");
const router = express.Router();
const { validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_Secret = process.env.JWT_Secret;
const { con } = require("../db");
const fetchuser = require('../midlleware/fetchuser');
const date = new Date();



router.post("/apply_case", fetchuser,);




module.exports = router;
