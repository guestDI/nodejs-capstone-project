const addUser = (req, res) => {
    console.log(req.body.username)

    res.sendStatus(200);
  }

const getUsers = (req, res) => {
    console.log(req.body.username)

    res.status(200).send([{
        id: '1',
        username: 'dzmitry'
    }]);
}

module.exports = {
    addUser,
    getUsers
}  