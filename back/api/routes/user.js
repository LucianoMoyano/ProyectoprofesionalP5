const express = require("express");
const router = express.Router();
const {getUsers, getUser, postUser, postSkill, getUserSkills } = require("../../controllers/user");

router.get("/:id", getUser);

router.post("/:id/skill", postSkill);


router.get("/:id/skill", getUserSkills)

router.get("/", getUsers);

router.post("/", postUser);


module.exports = router;