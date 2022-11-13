const router = require("express").Router();

const {
    getUsers,
    getOneUser,
    createOneUser,
    updateOneUser,
    deleteOneUser,
    createOneFriend,
    deleteOneFriend,

} = require("../../controllers/user.controller");

//user api
router.route("/").get(getUsers);
router.route("/").post(createOneUser);

router.route("/:userId").get(getOneUser);
router.route("/;userId").put(updateOneUser);
router.route("/:userId").delete(deleteOneUser);


router.route("/:userId/friends").post(createOneFriend);
router.route("/:userId/friends/:friendId").delete(deleteOneFriend);

module.exports = router;