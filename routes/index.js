const express = require('express')
const router = express.Router()
const people = require('../src/app/controllers/PeopleController')

router.get('/', people.index)
router.post('/', people.store)
router.put('/:id', people.update)
router.delete('/:id', people.delete)

module.exports = router
