const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('app', { title: 'Список дел' });
});

module.exports = router;