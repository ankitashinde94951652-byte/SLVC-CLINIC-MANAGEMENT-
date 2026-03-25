const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware'); // Fakt protect
const { upload } = require('../config/cloudinary');

// Sagle routes fakt login (protect) var chaltil
router.get('/', protect, userController.getAllUsers);
router.get('/:id', protect, userController.getUserById);

// Postman madhe key 'profileImage' vapra
router.post('/', protect, upload.single('profileImage'), userController.createUser);
router.put('/:id', protect, upload.single('profileImage'), userController.updateUser);

router.delete('/:id', protect, userController.deleteUser);

module.exports = router;