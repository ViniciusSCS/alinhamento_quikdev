const express = require("express");
const router = express.Router();
const PeopleController = require("../src/app/controllers/PeopleController");
const models = require("../src/app/models/index");

const controller = new PeopleController(models.people);

router.get("/", controller.index.bind(controller));
router.post("/", controller.store.bind(controller));
router.put("/:id", controller.update.bind(controller));
router.delete("/:id", controller.delete.bind(controller));

module.exports = router;
