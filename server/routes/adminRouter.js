const express = require('express');
const adminController = require("../controllers/adminController");
const router = express.Router();

router.post('/employee/create', adminController.createEmployee);

/* Get employees listing. */
router.post('/employees', adminController.showEmployees);

module.exports = router;
