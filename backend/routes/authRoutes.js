// const express = require('express');
// const router = express.Router();
// const { registerUser, loginUser, uploadProfilePic, updateUser } = require('../controllers/authController');

// router.post('/register', uploadProfilePic, registerUser);
// router.post('/login', loginUser);

// router.put('/user/:id', updateUser);


// module.exports = router;


const express = require('express');
const { registerUser, loginUser, updateUser, updateProfilePic } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/user/:id', updateUser);
router.put('/user/:id/profile-pic', updateProfilePic);

module.exports = router;
