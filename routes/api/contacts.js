const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/contacts-controllers");
const { validateBody } = require("../../middleware");
const schema = require("../../schemas/contactSchema");

router.get("/", ctrl.getAll);
router.get("/:contactId", ctrl.getById);
router.post("/", validateBody(schema.contactSchema), ctrl.add);
router.delete("/:contactId", ctrl.deleteById);
router.put("/:contactId", validateBody(schema.contactSchema), ctrl.updateById);

module.exports = router;
