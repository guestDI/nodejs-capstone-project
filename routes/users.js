const express = require("express");
const router = express.Router();

const { addUser, getUsers } = require("../controllers/users");

router.post('/users', addUser);
router.get('/users', getUsers);

router.get('/users/:userId/logs', function(req, res) {
    console.log(req.query)
    console.log(req.params.userId)
    res.send('done')
});

module.exports = router;