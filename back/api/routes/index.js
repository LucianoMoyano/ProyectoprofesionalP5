const express = require("express");
const router = express.Router();

const userRoutes = require("./user");
const questionRoutes = require("./questions");
const testRoutes = require("./tests");
const answerRoutes = require("./answers");
const skillRoutes = require("./skills");
const userAnswersRoutes = require("./userAnswers");

router.use("/users", userRoutes);
router.use("/questions", questionRoutes);
router.use("/tests", testRoutes);
router.use("/answers", answerRoutes);
router.use("/skills", skillRoutes);
router.use("/userAnswers", userAnswersRoutes);


module.exports = router;
