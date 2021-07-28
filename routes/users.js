const router = require('express').Router();

const { getUsers, createUser } = require('../controllers/users');


router.get('/', getUsers);

router.post('/', createUser);

/* router.get('/users/:id', getUserId);

router.post('/users', createUser); */

module.exports = router;
