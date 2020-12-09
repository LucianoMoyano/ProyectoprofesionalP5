const express = require("express");
const router = express.Router();
const { getTests, postTest, putTest, getTestsDate} = require("../../controllers/tests");


router.put("/:id", putTest);

router.get("/", getTests);

router.get("/:userId/:skillId", getTestsDate);

router.post("/", postTest);


module.exports = router;

