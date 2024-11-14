const express = require('express');
const router = express.Router();
const userCtrl = require("../controllers/usersController");

router.get('/getUserAndTotalSingedCount/:tgId', userCtrl.getUserAndTotalSingedCount);
router.put('/updateUserSign/:tgId', userCtrl.updateUserSign)

// export the router module so that server.js file can use it
module.exports = router;