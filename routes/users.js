const express = require("express");
const router = express.Router();

router.post('/users', function(req, res) {
    console.log(req)
    res.send('done')
});

module.exports = router;