const express = require('express')
const router = express.Router()
const authMiddleware = require('../src/app/middlewares/auth')
const ProfileController = require('../src/app/controllers/ProfileController')
const models = require('../src/app/models/')

const controller = new ProfileController(models.profile)

router.get('/', authMiddleware, controller.index.bind(controller))
router.post('/', authMiddleware, controller.store.bind(controller))

module.exports = router
