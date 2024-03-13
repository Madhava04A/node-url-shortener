const shortid = require("shortid");
const Url = require("../models/url");

exports.handleShortUrlGenerator = async (req, res, next) => {
  if (!req.body.url) {
    res.status(400).json({
      status: "fail",
      message: "no url sent in request body",
    });
  }

  const shortId = shortid();

  let newUrl;
  if (req.body.url.includes("http")) {
    newUrl = req.body.url;
  } else {
    newUrl = `https://${req.body.url}`;
  }
  await Url.create({
    shortUrl: shortId,
    originalUrl: newUrl,
    timeStamp: [],
  });

  res.status(201).render("home", {
    shortId,
  });
};

exports.handleRedirectUrl = async (req, res, next) => {
  const shortUrl = req.params.shortUrl;
  const redirectUrl = await Url.findOneAndUpdate(
    { shortUrl },
    {
      $push: {
        visitHistory: {
          timeStamp: Date.now(),
        },
      },
    }
  );

  res.redirect(redirectUrl.originalUrl);
};

exports.handleUrlAnalytics = async (req, res, next) => {
  const shortUrl = req.params.shortUrl;
  const url = await Url.findOne({ shortUrl });

  if (!url) {
    res.status(404).json({
      status: "fail",
      message: "short url you provided is not found/invalid",
    });
  }

  res.status(200).json({
    status: "success",
    totalClicks: url.visitHistory.length,
    analytics: url.visitHistory,
  });
};
