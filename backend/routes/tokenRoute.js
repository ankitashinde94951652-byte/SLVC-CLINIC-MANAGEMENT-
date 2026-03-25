const express = require('express');
const router = express.Router();
const { getLiveTokens } = require('../controllers/tokenController');

router.get('/live', getLiveTokens);

module.exports = router;