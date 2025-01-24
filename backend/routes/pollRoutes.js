const express = require("express");
const PollController = require("../controllers/pollController");

const router = express.Router();

router.post("/", PollController.createPoll);
router.get("/:id", PollController.getPollResults);
router.post("/:id/vote", PollController.votePoll);

module.exports = router;
