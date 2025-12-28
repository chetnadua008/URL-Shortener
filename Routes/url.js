const express = require('express')
const urlRouter = express.Router();
const {handlerShortIDGenerate,handlerOriginalUrl,handlerAnalysis}  = require('../Controllers/url')

urlRouter.post("/",handlerShortIDGenerate );
urlRouter.get("/",handlerOriginalUrl);
urlRouter.get("/analytics",handlerAnalysis);
module.exports = urlRouter;