const express = require('express');
const router = express.Router();

const {
createSurgery,
getAllSurgeries,
updateSurgery,
deleteSurgery
} = require('../controllers/surgeryController');


/* CREATE */

router.post('/create',createSurgery);


/* GET */

router.get('/',getAllSurgeries);


/* UPDATE */

router.put('/:id',updateSurgery);


/* DELETE */

router.delete('/:id',deleteSurgery);


module.exports = router;