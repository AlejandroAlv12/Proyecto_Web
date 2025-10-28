const express = require('express');
const router = express.Router();
const { createLot, getLots } = require('../controllers/lots.controller');
const auth = require('../middlewares/auth.middleware');

router.get('/', getLots);
router.post('/', auth, createLot); // crear lote requiere auth

module.exports = router;
