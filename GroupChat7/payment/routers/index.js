const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");
const errHandler = require("../middlewares/errorHandler");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.post("/register", Controller.register);
router.post("/login", Controller.login);

router.use(authentication);

router.get("/payment", Controller.payment);
router.patch("/upgrade", Controller.upgrade);

router.use(errHandler);
module.exports = router;
