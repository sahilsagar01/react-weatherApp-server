const router = require("express").Router();
const { getCard, createCard, deleteCard, showCard } = require("../controller/cardControler");


router.get("/" , getCard);
router.post("/post", createCard);
router.delete("/delete/:id", deleteCard);
router.post("/show", showCard);

module.exports = router;