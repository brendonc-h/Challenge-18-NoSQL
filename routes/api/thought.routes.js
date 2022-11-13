const router = require("express").Router();

const {
    getThought,
    getOneThought,
    createOneThought,
    updateOneThought,
    deleteThought,
    createOneReaction,
    deleteOneReaction,
} = require("../../controllers/thought.controller");

//thoughts api
router.route("/").get(getThought);
router.route("/").post(createOneThought);

//thoughtId api
router.route("/:thoughtId").get(getOneThought);
router.route("/:thoughtId").put(updateOneThought);
router.route("/:thoughtId").delete(deleteThought);

//reactions from thougthID

router.route("/:thoughtId/reactions").post(createOneReaction);
router.route("/:thoughtId/reactions/:reactionId").delete(deleteOneReaction);

module.exports = router;