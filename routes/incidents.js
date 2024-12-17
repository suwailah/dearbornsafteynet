const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all incidents
router.get('/', (req, res) => {
    db.query('SELECT * FROM incidents', (err, results) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(results);
    });
});

module.exports = router;
