require('dotenv').config({ path: "../../.env" });
const express = require("express");
const router = express.Router();
const { validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_Secret = process.env.JWT_Secret;
const { con } = require("../db");
const fetchserver = require('../midlleware/fetchserver');



module.exports = router;