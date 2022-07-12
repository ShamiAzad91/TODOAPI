var express = require('express');
const { getTodos, getUserAndTodos } = require('./controller');
var router = express.Router();


router.get("/todos", getTodos)
router.get("/user/:id", getUserAndTodos)

module.exports = router;
