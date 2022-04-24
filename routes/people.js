const express = require("express");
const router = express.Router();
const authMiddleware = require("../src/app/middlewares/auth");
const PeopleController = require("../src/app/controllers/PeopleController");
const models = require("../src/app/models/");

const controller = new PeopleController(models.people);

router.post("/", controller.store.bind(controller));
router.post("/login", controller.login.bind(controller));
router.delete("/:id", controller.delete.bind(controller));

router.get("/", authMiddleware, controller.index.bind(controller));
router.get("/me", authMiddleware, controller.me.bind(controller));
router.put("/:id", authMiddleware, controller.update.bind(controller));
router.delete("/:id", authMiddleware, controller.delete.bind(controller));

module.exports = router;
