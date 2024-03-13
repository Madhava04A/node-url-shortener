const express = require("express");
const urlcontroller = require("../controllers/urlhandler");

const router = express.Router();

router.post("/", urlcontroller.handleShortUrlGenerator);
router.get("/:shortUrl", urlcontroller.handleRedirectUrl);
router.get("/analytics/:shortUrl", urlcontroller.handleUrlAnalytics);

module.exports = router;
