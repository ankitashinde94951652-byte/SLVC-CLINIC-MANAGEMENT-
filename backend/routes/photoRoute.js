const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');
const upload = require('../middleware/multerConfig'); // तुझ्या मल्ट्config चा पाथ

// ✅ हा बदल कर: upload.fields वापरणे
router.post('/upload', 
    upload.fields([
        { name: 'before', maxCount: 1 }, 
        { name: 'after', maxCount: 1 }
    ]), 
    photoController.uploadPhoto
);

module.exports = router;